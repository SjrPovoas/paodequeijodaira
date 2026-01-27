/**
 * API de Logística - Integração Melhor Envio
 * Trata o cálculo (POST) e a geração de etiquetas (PUT)
 */
export default async function handler(req, res) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.MELHORENVIO_TOKEN}`,
    'User-Agent': 'PaoDeQueijoDaIra (sjrpovoas@gmail.com)'
  };

  // --- LÓGICA DE CÁLCULO DE FRETE (POST) ---
  if (req.method === 'POST') {
    const { cep_destino, produtos } = req.body;

    try {
      const response = await fetch(`${process.env.MELHORENVIO_URL}/api/v2/me/shipment/calculate`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          from: { postal_code: "72940000" }, // Origem: Cidade Ocidental
          to: { postal_code: cep_destino },
          products: produtos.map(p => ({
            id: p.id,
            width: 20, height: 10, length: 20, weight: 0.5,
            insurance_value: p.preco || 50, // Seguro baseado no preço ou valor mínimo
            quantity: 1
          }))
        })
      });

      const data = await response.json();
      
      // Filtra transportadoras que retornaram erro e ordena por preço
      const opcoesValidas = Array.isArray(data) 
        ? data.filter(opt => !opt.error).sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        : [];
      
      return res.status(200).json(opcoesValidas);
    } catch (error) {
      console.error("Erro Melhor Envio Calc:", error);
      return res.status(500).json({ error: "Erro ao calcular frete" });
    }
  }

  // --- LÓGICA DE COMPRA DE ETIQUETA (PUT) ---
  if (req.method === 'PUT') {
    const { service_id, pedido_id } = req.body;

    try {
      // 1. Adiciona ao carrinho do Melhor Envio
      // Nota: Em uma implementação real, você enviaria os dados completos do remetente/destinatário aqui
      const cartResponse = await fetch(`${process.env.MELHORENVIO_URL}/api/v2/me/cart`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          service: service_id,
          agency: 1, // Exigido para algumas transportadoras
          from: { name: "Pão de Queijo da Irá", postal_code: "72940000" },
          to: { name: "Cliente Irá Digital", postal_code: "01001000" }, // Exemplo, deve vir do seu banco
          products: [{ name: "Acessório Lifestyle", quantity: 1, unit_value: 50 }],
          volumes: [{ height: 10, width: 20, length: 20, weight: 0.5 }]
        })
      });

      const cartData = await cartResponse.json();

      if (cartData.id) {
        // 2. Efetua o checkout do carrinho (pagamento com saldo do Melhor Envio)
        const checkoutResponse = await fetch(`${process.env.MELHORENVIO_URL}/api/v2/me/shipment/checkout`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ orders: [cartData.id] })
        });

        if (checkoutResponse.ok) {
          return res.status(200).json({ success: true, message: "Etiqueta comprada!" });
        }
      }

      throw new Error("Falha ao processar checkout da etiqueta");
    } catch (error) {
      console.error("Erro Melhor Envio Compra:", error);
      return res.status(500).json({ error: "Erro ao gerar etiqueta" });
    }
  }

  // Caso receba GET ou outros métodos
  return res.status(405).json({ message: 'Método não permitido' });
}
