import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  // Mercado Pago envia notificações via POST
  if (req.method !== 'POST') return res.status(200).send('OK');

  try {
    const { type, data } = req.body;

    // Só processamos se o tipo for pagamento
    if (type === 'payment') {
      const paymentId = data.id;

      // 1. Consultar o status real no Mercado Pago para evitar fraudes
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
      });
      
      const paymentData = await mpRes.json();

      // 2. Se o pagamento foi aprovado
      if (paymentData.status === 'approved') {
        // Pegamos o email que salvamos no external_reference (em letras minúsculas)
        const emailReferencia = paymentData.external_reference.toLowerCase().trim();

        const { error } = await supabase
          .from('pedidos')
          .update({ status: 'pago' })
          .eq('email', emailReferencia)
          .eq('status', 'pendente'); // Só atualiza se ainda estiver pendente

        if (error) {
          console.error("Erro Supabase:", error.message);
        } else {
          console.log(`Sucesso: Pedido de ${emailReferencia} marcado como PAGO.`);
        }
      }
    }

    // SEMPRE retorne 200 para o Mercado Pago não ficar reenviando a mesma notificação
    return res.status(200).send('OK');

  } catch (err) {
    console.error("Erro Crítico Webhook:", err);
    return res.status(200).send('OK');
  }
}