// src/pages/api/webhooks/mercadopago.js

import { createClient } from '@supabase/supabase-js';

// Configuração do cliente Supabase interna para a API
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { type, data } = req.body;

    // O Mercado Pago envia vários avisos, o que nos importa é o 'payment'
    if (type === 'payment') {
      const paymentId = data.id;

      // 1. Consultar o status do pagamento no Mercado Pago
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      });

      const paymentData = await response.json();

      // 2. Se o status for 'approved', atualizamos o Supabase
      if (paymentData.status === 'approved') {
        const emailCliente = paymentData.payer.email;
        const valorPago = paymentData.transaction_amount;

        const { error } = await supabase
          .from('pedidos')
          .update({ status: 'pago' })
          .eq('email', emailCliente)
          .eq('status', 'pendente'); // Garante que só atualiza o correto

        if (error) throw error;
        
        console.log(`Pedido de ${emailCliente} aprovado e atualizado!`);
      }
    }

    // O Mercado Pago exige um retorno 200 ou 201 para parar de enviar o aviso
    return res.status(200).send('OK');
  } catch (error) {
    console.error('Erro no Webhook:', error);
    return res.status(500).json({ error: error.message });
  }
}