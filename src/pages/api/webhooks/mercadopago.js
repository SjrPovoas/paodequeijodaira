// src/pages/api/webhooks/mercadopago.js

import { createClient } from '@supabase/supabase-js';

// Usamos a Service Role Key para garantir que o sistema ignore o RLS e escreva no banco
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY 
);

export default async function handler(req, res) {
  // Mercado Pago envia notificações via POST. Respondemos 200 sempre para evitar loops de reenvio.
  if (req.method !== 'POST') return res.status(200).send('OK');

  try {
    // Captura o ID da transação enviado pelo Mercado Pago (pode vir no corpo ou na URL)
    const id = req.body.data?.id || req.query.id;
    const type = req.body.type || req.query.topic;

    // 1. Validamos se é uma notificação de pagamento legítima
    if (type === 'payment' || req.body.action?.includes('payment')) {
      
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
      });
      
      if (!mpRes.ok) return res.status(200).send('Erro na consulta MP');
      
      const paymentData = await mpRes.json();
      const pedidoId = paymentData.external_reference;

      // 2. Se o status for 'approved', damos baixa automática no pedido
      if (paymentData.status === 'approved' && pedidoId) {
        
        // Buscamos o pedido primeiro para recuperar os dados do cliente (como o e-mail)
        const { data: pedido } = await supabase
          .from('pedidos')
          .select('*')
          .eq('id', pedidoId)
          .single();

        if (pedido) {
          // ATUALIZAÇÃO ALINHADA COM AS TRAVAS (CONSTRAINTS) DA TABELA PEDIDOS
          const { error } = await supabase
            .from('pedidos')
            .update({ 
              status_pagamento: 'pago', // Ajustado para respeitar a constraint ('pago')
              status_pedido: 'processando', // Atualiza para 'processando' para você preparar o envio
              mercadopago_payment_id: String(id), // Guarda o ID do MP que definimos como UNIQUE
              pago_em: new Date().toISOString() // Salva o exato momento do pagamento
            })
            .eq('id', pedidoId);

          if (!error) {
            // 3. DISPARO AUTOMÁTICO DE E-MAIL DE CONFIRMAÇÃO (Utiliza a rota interna do Next.js)
            const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://paodequeijodaira.vercel.app";
            
            await fetch(`${siteUrl}/api/send-email`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: pedido.email,
                orderId: pedidoId,
                status: 'PAGAMENTO APROVADO',
                trackingCode: null // Ainda sem código de rastreio nesta etapa inicial
              })
            });
          } else {
            console.error("Erro ao atualizar pedido no Supabase via Webhook:", error.message);
          }
        }
      }
    }

    return res.status(200).json({ received: true });

  } catch (err) {
    console.error("Erro Crítico Webhook Mercado Pago:", err.message);
    return res.status(200).send('Internal Error');
  }
}