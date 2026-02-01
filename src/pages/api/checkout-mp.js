import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { itens, email, frete, cpf, pedidoId, nome } = req.body;

    if (!itens || !email || !nome) {
      return res.status(400).json({ error: "Dados insuficientes para gerar o pagamento." });
    }

    // 1. Formatação dos Itens
    const itemsMP = itens.map(item => ({
      id: String(item.id || 'prod'),
      title: `${item.nome}${item.tam ? ' (Tam: ' + item.tam + ')' : ''}`, // Ajustado para 'tam' que usamos no banco
      unit_price: Number(item.preco),
      quantity: Number(item.quantidade || 1),
      currency_id: 'BRL'
    }));

    // 2. Adiciona o Frete
    if (frete && Number(frete) > 0) {
      itemsMP.push({
        id: 'custo-frete',
        title: 'Taxa de Entrega / Frete',
        unit_price: Number(frete),
        quantity: 1,
        currency_id: 'BRL'
      });
    }

    // 3. Tratamento de Nome
    const nomePartes = nome.trim().split(' ');
    const firstName = nomePartes[0];
    const lastName = nomePartes.length > 1 ? nomePartes.slice(1).join(' ') : 'Cliente';

    const preference = new Preference(client);

    // 4. Construção da Preferência
    const preferenceData = {
      body: {
        items: itemsMP,
        payer: {
          email: email.toLowerCase().trim(),
          first_name: firstName,
          last_name: lastName,
        },
        // O external_reference é o nosso pedidoId do Supabase
        external_reference: String(pedidoId), 
        back_urls: {
          // ADICIONADO: ?payment_id ao final para o arquivo sucesso.js identificar que veio do MP
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/sucesso?pedido=${pedidoId}`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/loja`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/pendente`,
        },
        auto_return: "approved",
        statement_descriptor: "LOJA LIFESTYLE E ACESSORIOS | PAO DE QUEIJO DA IRA",
        payment_methods: {
          installments: 12,
        },
        // Isso garante que o MP envie os dados da transação de volta
        notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/mercadopago`,
      }
    };

    // 5. CPF (Somente se válido)
    const cpfLimpo = cpf ? cpf.replace(/\D/g, '') : '';
    if (cpfLimpo.length === 11) {
      preferenceData.body.payer.identification = {
        type: 'CPF',
        number: cpfLimpo
      };
    }

    const response = await preference.create(preferenceData);

    return res.status(200).json({ init_point: response.init_point });

  } catch (error) {
    console.error("Erro detalhado Mercado Pago:", error);
    return res.status(500).json({ 
      error: "Erro ao gerar pagamento",
      details: error.message 
    });
  }
}
