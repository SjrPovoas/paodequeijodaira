import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  // Configuração de Headers para o Melhor Envio
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.MELHORENVIO_TOKEN}`,
    'User-Agent': 'PaoDeQueijoDaIra (sjrpovoas@gmail.com)'
  };

  // --- 1. CÁLCULO DE FRETE (POST) ---
  // Chamado no Checkout para mostrar opções de Sedex/PAC ao cliente
  if (req.method === 'POST') {
    const { cep_destino, produtos } = req.body;
    try {
      const response = await fetch(`${process.env.MELHORENVIO_URL}/api/v2/me/shipment/calculate`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          from: { postal_code: "72940000" }, // CEP de Origem (Goiás)
          to: { postal_code: cep_destino.replace(/\D/g, "") }, // Limpa o CEP
          products: produtos.map(p => ({
            id: p.id || 'item', 
            width: 20, height: 10, length: 20, weight: 0.5,
            insurance_value: p.preco || 50, 
            quantity: 1
          }))
        })
      });
      const data = await response.json();
      // Retorna apenas opções válidas (sem erro)
      return res.status(200).json(Array.isArray(data) ? data.filter(opt => !opt.error) : []);
    } catch (error) {
      return res.status(500).json({ error: "Erro na calculadora de frete" });
    }
  }

  // --- 2. GERAÇÃO DE ETIQUETA E RASTREIO (PUT) ---
  // Chamado pelo Painel Admin quando você clica em "Enviar Ordem"
  if (req.method === 'PUT') {
    const { service_id, pedido_id } = req.body;

    try {
      // 1. Busca os dados reais do pedido no Supabase
      const { data: pedido, error: dbError } = await supabase
        .from('pedidos')
        .select('*')
        .eq('id', pedido_id)
        .single();

      if (dbError || !pedido) throw new Error("Pedido não localizado.");

      // 2. Adiciona o envio ao carrinho do Melhor Envio
      const cartResponse = await fetch(`${process.env.MELHORENVIO_URL}/api/v2/me/cart`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          service: service_id,
          agency: 1, 
          from: { 
            name: "Pão de Queijo da Irá", 
            postal_code: "72940000"
          }, 
          to: {
            name: pedido.nome,
            email: pedido.email,
            document: pedido.cpf ? pedido.cpf.replace(/\D/g, "") : "",
            address: pedido.endereco,
            number: "SN", // Ajuste se tiver coluna de número
            complement: pedido.complemento || "",
            postal_code: pedido.cep.replace(/\D/g, "")
          },
          products: [{ 
            name: "Lifestyle Kit", 
            quantity: 1, 
            unit_value: pedido.total_geral 
          }],
          volumes: [{ height: 10, width: 20, length: 20, weight: 0.5 }]
        })
      });

      const cartData = await cartResponse.json();
      if (!cartData.id) throw new Error(cartData.message || "Falha ao criar etiqueta.");

      // 3. Efetua o Checkout (Pagamento da etiqueta usando seu saldo)
      await fetch(`${process.env.MELHORENVIO_URL}/api/v2/me/shipment/checkout`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ orders: [cartData.id] })
      });

      // 4. Obtém o código de rastreio gerado
      const trackResponse = await fetch(`${process.env.MELHORENVIO_URL}/api/v2/me/shipment/tracking`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ orders: [cartData.id] })
      });
      const trackData = await trackResponse.json();
      const trackingCode = trackData[cartData.id]?.tracking || "EM PROCESSAMENTO";

      // 5. Atualiza o banco com o status final e o código para o cliente ver
      await supabase
        .from('pedidos')
        .update({ 
          status_pagamento: 'Enviado', 
          rastreio_codigo: trackingCode,
          etiqueta_id: cartData.id 
        })
        .eq('id', pedido_id);

      // 6. Notifica o cliente (Chama sua API de e-mail)
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: pedido.email,
          orderId: pedido_id,
          status: 'PRODUTO ENVIADO',
          trackingCode: trackingCode
        })
      });

      return res.status(200).json({ success: true, tracking: trackingCode });

    } catch (error) {
      console.error("Erro Logística:", error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).send('Método não permitido');
}
