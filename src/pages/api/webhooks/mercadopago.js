import { createClient } from '@supabase/supabase-js';

// Usamos a Service Role Key para garantir que o sistema tenha permissão de escrita
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY 
);

export default async function handler(req, res) {
  // Mercado Pago envia notificações via POST. Respondemos 200 sempre para evitar loops.
  if (req.method !== 'POST') return res.status(200).send('OK');

  try {
    const id = req.body.data?.id || req.query.id;
    const type = req.body.type || req.query.topic;

    // 1. Validamos se é uma notificação de pagamento
    if (type === 'payment' || req.body.action?.includes('payment')) {
      
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
      });
      
      if (!mpRes.ok) return res.status(200).send('Erro na consulta MP');
      
      const paymentData = await mpRes.json();
      const pedidoId = paymentData.external_reference;

      // 2. Se o status for 'approved', damos baixa no pedido
      if (paymentData.status === 'approved' && pedidoId) {
        
        // Buscamos o pedido primeiro para ter os dados de e-mail
        const { data: pedido } = await supabase
          .from('pedidos')
          .select('*')
          .eq('id', pedidoId)
          .single();

        if (pedido) {
          // Atualizamos o status para 'Pago via MP' (conforme seu filtro no Admin)
          const { error } = await supabase
            .from('pedidos')
            .update({ 
              status_pagamento: 'Pago via MP', 
              metodo_pagamento: `Mercado Pago (${paymentData.payment_method_id})`
            })
            .eq('id', pedidoId);

          if (!error) {
            // 3. DISPARO AUTOMÁTICO DE E-MAIL DE CONFIRMAÇÃO
            await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-email`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: pedido.email,
                orderId: pedidoId,
                status: 'PAGAMENTO APROVADO',
                trackingCode: null // Ainda não tem rastreio nesta etapa
              })
            });
          }
        }
      }
    }

    return res.status(200).json({ received: true });

  } catch (err) {
    console.error("Erro Crítico Webhook:", err.message);
    return res.status(200).send('Internal Error');
  }
}
