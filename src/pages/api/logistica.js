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
          from: { postal_code: "72940000" }, // Origem: Cidade Ocidental
          to: { postal_code: cep_destino },
          products: produtos.map(p => ({
            id: p.id,
            width: 20, height: 10, length: 20, weight: 0.5,
            insurance_value: p.preco || 50,
            quantity: 1
          }))
        })
      });
      const data = await response.json();
      const opcoesValidas = Array.isArray(data) ? data.filter(opt => !opt.error) : [];
      return res.status(200).json(opcoesValidas);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao calcular frete" });
    }
  }

  // --- 2. GERAÇÃO DE ETIQUETA (PUT) ---
  if (req.method === 'PUT') {
    const { service_id, pedido_id } = req.body;

    try {
      // BUSCA DADOS REAIS DO PEDIDO NO SUPABASE 
      const { data: pedido, error: dbError } = await supabase
        .from('pedidos')
        .select('*')
        .eq('id', pedido_id)
        .single();

      if (dbError || !pedido) throw new Error("Pedido não encontrado");

      // ENVIA PARA O CARRINHO DO MELHOR ENVIO
      const cartResponse = await fetch(`${process.env.MELHORENVIO_URL}/api/v2/me/cart`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          service: service_id,
          agency: 1, 
          from: {
            name: "Pão de Queijo da Irá",
            email: "contato@paodequeijodaira.com",
            document: "SUO_CNPJ_OU_CPF",
            company_document: "SEU_CNPJ",
            address: "Rua Exemplo",
            number: "123",
            district: "Centro",
            city: "Cidade Ocidental",
            state_abbr: "GO",
            postal_code: "72940000"
          },
          to: {
            name: pedido.cliente_nome,
            email: pedido.cliente_email,
            document: pedido.cliente_cpf, // Necessário para etiquetas brasileiras 
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
        // EFETUA O PAGAMENTO (CHECKOUT) DA ETIQUETA
        await fetch(`${process.env.MELHORENVIO_URL}/api/v2/me/shipment/checkout`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ orders: [cartData.id] })
        });

        // ATUALIZA O STATUS NO SUPABASE 
        await supabase
          .from('pedidos')
          .update({ status: 'Etiqueta Gerada', etiqueta_id: cartData.id })
          .eq('id', pedido_id);

        return res.status(200).json({ success: true });
      }
      throw new Error("Falha no carrinho");
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).send('Method not allowed');
}
