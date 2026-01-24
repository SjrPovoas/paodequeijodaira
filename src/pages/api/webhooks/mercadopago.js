import { createClient } from '@supabase/supabase-js';

// DICA: Para Webhooks, use a SERVICE_ROLE_KEY se possível, para evitar bloqueios de RLS (Políticas de Segurança)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  // Mercado Pago pode enviar via query ou body dependendo da versão, mas o padrão é POST
  if (req.method !== 'POST') return res.status(200).send('OK');

  try {
    // O MP envia o ID do recurso de formas diferentes. Tentamos pegar de todas.
    const topic = req.body.topic || req.body.type;
    const resourceId = req.body.data?.id || req.body.resource?.split('/').pop();

    if (topic === 'payment' || req.body.action?.includes('payment')) {
      
      // 1. Consultar o status real no Mercado Pago
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${resourceId}`, {
        headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
      });
      
      if (!mpRes.ok) throw new Error('Erro ao consultar Mercado Pago');
      
      const paymentData = await mpRes.json();

      // 2. Extrair o ID do pedido que enviamos no external_reference
      const pedidoIdReferencia = paymentData.external_reference;

      if (paymentData.status === 'approved' && pedidoIdReferencia) {
        
        // 3. Atualizar no Supabase usando o ID (Mais preciso que e-mail)
        const { error } = await supabase
          .from('pedidos')
          .update({ 
            status: 'pago',
            metodo_pagamento: paymentData.payment_method_id, // Opcional: salva se foi pix ou card
            // Você pode salvar o ID do pagamento do MP para referência futura
            id_pagamento_mp: String(resourceId) 
          })
          .eq('id', pedidoIdReferencia)
          .eq('status', 'pendente');

        if (error) {
          console.error("Erro Supabase Update:", error.message);
        } else {
          console.log(`Sucesso: Pedido #${pedidoIdReferencia} marcado como PAGO.`);
        }
      }
    }

    // SEMPRE retorne 200 rápido para o MP
    return res.status(200).json({ received: true });

  } catch (err) {
    console.error("Erro Crítico Webhook:", err.message);
    // Retornamos 200 mesmo no erro para o MP parar de tentar se for um erro de código nosso
    return res.status(200).send('OK');
  }
}