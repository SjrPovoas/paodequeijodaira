import { createClient } from '@supabase/supabase-js';

// Usamos a Service Role para garantir permissão de escrita automática
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // O Melhor Envio envia notificações via POST
  if (req.method !== 'POST') {
    return res.status(200).send('OK'); // Sempre retorne 200 para evitar bloqueios
  }

  try {
    const { status, resource_id } = req.body;

    // 1. Verificamos se o status recebido é de "entregue" (delivered)
    // O Melhor Envio utiliza 'delivered' para pacotes que chegaram ao destino
    if (status === 'delivered') {
      
      // 2. Buscamos o pedido no Supabase através do ID da etiqueta
      const { data: pedido, error: dbError } = await supabase
        .from('pedidos')
        .select('*')
        .eq('etiqueta_id', resource_id)
        .single();

      if (pedido && !dbError) {
        // 3. Atualizamos o status do pedido para "Entregue"
        await supabase
          .from('pedidos')
          .update({ 
            status_pagamento: 'Entregue', // Atualiza o status para visualização no Admin
            entregue_em: new Date().toISOString() 
          })
          .eq('id', pedido.id);

        // 4. DISPARO DE E-MAIL DE PÓS-VENDA (Opcional)
        // Você pode avisar o cliente que o produto chegou e pedir um feedback
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: pedido.email,
            orderId: pedido.id,
            status: 'PRODUTO ENTREGUE',
            trackingCode: pedido.rastreio_codigo
          })
        });
      }
    }

    // O Melhor Envio exige resposta 200 para confirmar o recebimento do webhook
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Erro Webhook Melhor Envio:", error.message);
    return res.status(200).send('OK com erro interno');
  }
}
