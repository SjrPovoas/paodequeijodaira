import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.MELHORENVIO_TOKEN}`,
    'User-Agent': 'PaoDeQueijoDaIra (sjrpovoas@gmail.com)'
  };

  // --- 1. CÁLCULO DE FRETE (POST) ---
  if (req.method === 'POST') {
    const { cep_destino, produtos } = req.body;
    try {
      const response = await fetch(`${process.env.MELHORENVIO_URL}/api/v2/me/shipment/calculate`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          from: { postal_code: "72940000" },
          to: { postal_code: cep_destino },
          products: produtos.map(p => ({
            id: p.id, width: 20, height: 10, length: 20, weight: 0.5,
            insurance_value: p.preco || 50, quantity: 1
          }))
        })
      });
      const data = await response.json();
      return res.status(200).json(Array.isArray(data) ? data.filter(opt => !opt.error) : []);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao calcular" });
    }
  }

  // --- 2. GERAÇÃO DE ETIQUETA E RASTREIO (PUT) ---
  if (req.method === 'PUT') {
    const { service_id, pedido_id } = req.body;

    try {
      // Busca dados do cliente no Supabase
      const { data: pedido } = await supabase.from('pedidos').select('*').eq('id', pedido_id).single();
      if (!pedido) throw new Error("Pedido não encontrado");

      // Passo A: Adiciona ao carrinho do Melhor Envio
      const cartResponse = await fetch(`${process.env.MELHORENVIO_URL}/api/v2/me/cart`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          service: service_id,
          agency: 1,
          from: { name: "Pão de Queijo da Irá", postal_code: "72940000" }, // Complete com seus dados fixos
          to: {
            name: pedido.cliente_nome,
            email: pedido.cliente_email,
            document: pedido.cliente_cpf,
            address: pedido.cliente_endereco,
            number: pedido.cliente_numero,
            district: pedido.cliente_bairro,
            city: pedido.cliente_cidade,
            state_abbr: pedido.cliente_uf,
            postal_code: pedido.cliente_cep
          },
          products: [{ name: "Lifestyle Kit", quantity: 1, unit_value: pedido.total_brl }],
          volumes: [{ height: 10, width: 20, length: 20, weight: 0.5 }]
        })
      });
      const cartData = await cartResponse.json();

      if (cartData.id) {
        // Passo B: Checkout (Pagamento da Etiqueta)
        await fetch(`${process.env.MELHORENVIO_URL}/api/v2/me/shipment/checkout`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ orders: [cartData.id] })
        });

        // Passo C: Gerar a etiqueta e obter código de rastreio (tracking)
        // O Melhor Envio pode demorar alguns segundos, aqui solicitamos o rastreio gerado
        const trackResponse = await fetch(`${process.env.MELHORENVIO_URL}/api/v2/me/shipment/tracking`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ orders: [cartData.id] })
        });
        const trackData = await trackResponse.json();
        const trackingCode = trackData[cartData.id]?.tracking || "EM PROCESSAMENTO";

        // Passo D: Atualiza Supabase com o código de rastreio
        await supabase
          .from('pedidos')
          .update({ 
            status: 'Enviado', 
            rastreio_codigo: trackingCode,
            etiqueta_id: cartData.id 
          })
          .eq('id', pedido_id);

        // Passo E: Dispara o e-mail de notificação automático
        await fetch(`${process.env.NEXT_PUBLIC_URL}/api/send-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: pedido.cliente_email,
            orderId: pedido_id,
            status: 'PRODUTO ENVIADO',
            trackingCode: trackingCode,
            txHash: pedido.transacao_hash // Se for Web3, envia a hash também
          })
        });

        return res.status(200).json({ success: true, tracking: trackingCode });
      }
      throw new Error("Erro ao gerar carrinho");
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).send('Method not allowed');
}
