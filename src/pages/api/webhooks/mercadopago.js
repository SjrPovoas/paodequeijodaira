// src/pages/api/webhooks/mercadopago.js

import { MercadoPagoConfig, Payment } from 'mercadopago';
import { supabase } from '../../../lib/supabaseClient';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // O Mercado Pago envia o ID do pagamento no corpo ou na query
  const { id, type } = req.body;
  const paymentId = id || req.query['data.id'];

  if (type === 'payment' || req.query.topic === 'payment') {
    try {
      const payment = new Payment(client);
      const data = await payment.get({ id: paymentId });

      // Se o pagamento foi aprovado
      if (data.status === 'approved') {
        const pedidoId = data.metadata.id_referencia; // O ID que enviamos no checkout-mp.js

        // Atualiza o status no Supabase automaticamente
        const { error } = await supabase
          .from('pedidos')
          .update({ status: 'Preparando' })
          .eq('id', pedidoId);

        if (error) console.error("Erro ao atualizar Supabase:", error);
      }

      res.status(200).send('OK');
    } catch (error) {
      console.error("Erro no Webhook:", error);
      res.status(500).end();
    }
  } else {
    res.status(200).send('Evento ignorado');
  }
}