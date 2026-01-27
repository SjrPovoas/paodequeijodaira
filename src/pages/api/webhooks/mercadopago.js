import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Recomendado para bypass de RLS
);

export default async function handler(req, res) {
  // Mercado Pago exige resposta 200/201 para não reenviar a mesma notificação repetidamente
  if (req.method !== 'POST') return res.status(200).send('OK');

  try {
    // Captura o ID do pagamento de forma robusta
    const id = req.body.data?.id || req.query.id;
    const type = req.body.type || req.query.topic;

    // Só processamos se o tipo for pagamento
    if (type === 'payment' || req.body.action?.startsWith('payment')) {
      
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
      });
      
      if (!mpRes.ok) return res.status(200).send('Erro na consulta MP');
      
      const paymentData = await mpRes.json();
      const pedidoId = paymentData.external_reference;

      // Se o pagamento foi aprovado, atualizamos o banco
      if (paymentData.status === 'approved' && pedidoId) {
        
        const { error } = await supabase
          .from('pedidos')
          .update({ 
            status: 'Pago', // Ajustado para bater com o status da sua Loja.js
            metodo_pagamento: paymentData.payment_method_id,
            pago_em: new Date().toISOString()
          })
          .eq('id', pedidoId);

        if (error) {
          console.error("Erro ao atualizar pedido:", error.message);
          return res.status(200).send('Erro DB'); 
        }
      }
    }

    return res.status(200).json({ received: true });

  } catch (err) {
    console.error("Erro Crítico Webhook:", err.message);
    return res.status(200).send('Internal Error');
  }
}
