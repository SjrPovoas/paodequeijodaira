export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { cep_destino, produtos } = req.body;

  try {
    const response = await fetch(`${process.env.MELHORENVIO_URL}/api/v2/me/shipment/calculate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MELHORENVIO_TOKEN}`,
        'User-Agent': 'PaoDeQueijoDaIra (sjrpovoas@gmail.com)'
      },
      body: JSON.stringify({
        from: { postal_code: "72940000" }, // Seu CEP (Cidade Ocidental)
        to: { postal_code: cep_destino },
        products: produtos.map(p => ({
            id: p.id,
            width: 20, height: 10, length: 20, weight: 0.5, // Dimensões padrão lifestyle
            insurance_value: p.preco,
            quantity: 1
        }))
      })
    });

    const data = await response.json();
    // Filtra apenas as transportadoras ativas e com preço
    const opcoesDisponiveis = data.filter(opt => !opt.error);
    
    res.status(200).json(opcoesDisponiveis);
  } catch (error) {
    res.status(500).json({ error: "Falha ao calcular frete" });
  }
}
