import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { itens, email, frete, cpf, pedidoId, firstName, lastName } = req.body;

    if (!itens || !email || !cpf || !pedidoId) {
      return res.status(400).json({ error: "Dados insuficientes." });
    }

    const emailLimpo = email.toLowerCase().trim();
    const cpfLimpo = cpf.replace(/\D/g, '');

    const itemsMP = itens.map(item => ({
      id: String(item.id),
      title: `${item.nome}${item.tamanho ? ' (Tam: ' + item.tamanho + ')' : ''}`,
      unit_price: Number(item.preco),
      quantity: Number(item.quantidade),
      currency_id: 'BRL'
    }));

    if (frete && Number(frete) > 0) {
      itemsMP.push({
        id: 'custo-frete',
        title: 'Taxa de Entrega / Frete',
        unit_price: Number(frete),
        quantity: 1,
        currency_id: 'BRL'
      });
    }

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: itemsMP,
        payer: {
          email: emailLimpo,
          identification: {
            type: 'CPF',
            number: cpfLimpo
          },
          // Nomes vindos do frontend já tratados
          first_name: firstName || "Cliente",
          last_name: lastName || "Ira Lifestyle"
        },
        external_reference: String(pedidoId), 
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/sucesso`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/erro`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/pendente`,
        },
        auto_return: "approved",
        // Nome que aparece na fatura do cartão (Max 16 caracteres)
        statement_descriptor: "PAO DE QUEIJO IRA",
        payment_methods: {
          installments: 12,
        },
        // Importante: A URL deve ser HTTPS e pública para funcionar
        notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/mercadopago`,
      }
    });

    res.status(200).json({ init_point: response.init_point });

  } catch (error) {
    console.error("Erro MP:", error.cause?.description || error.message);
    res.status(500).json({ 
      error: "Erro ao gerar pagamento",
      details: error.cause?.description || error.message 
    });
  }
}