import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    // 1. Removida a exigência estrita de CPF aqui, pois validaremos abaixo
    const { itens, email, frete, cpf, pedidoId, nome } = req.body;

    if (!itens || !email || !pedidoId) {
      return res.status(400).json({ error: "Dados insuficientes (Itens, Email ou PedidoID faltando)." });
    }

    const emailLimpo = email.toLowerCase().trim();
    // Tratamento para o CPF não quebrar se vier vazio
    const cpfLimpo = cpf ? cpf.replace(/\D/g, '') : '';

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

    // 2. Separar Nome e Sobrenome para o MP (Exigência da API deles)
    const nomePartes = nome ? nome.trim().split(' ') : ["Cliente", "Irá"];
    const firstName = nomePartes[0];
    const lastName = nomePartes.length > 1 ? nomePartes.slice(1).join(' ') : 'Lifestyle';

    const preferenceData = {
      body: {
        items: itemsMP,
        payer: {
          email: emailLimpo,
          first_name: firstName,
          last_name: lastName,
        },
        external_reference: String(pedidoId), 
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/sucesso`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/loja`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/pendente`,
        },
        auto_return: "approved",
        statement_descriptor: "PAO DE QUEIJO IRA",
        payment_methods: {
          installments: 12,
        },
        // Opcional: só descomente se o webhook estiver pronto e em HTTPS
        // notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/mercadopago`,
      }
    };

    // 3. Só adiciona CPF se ele existir (Evita erro em pagamentos que não pedem CPF)
    if (cpfLimpo) {
      preferenceData.body.payer.identification = {
        type: 'CPF',
        number: cpfLimpo
      };
    }

    const response = await preference.create(preferenceData);

    return res.status(200).json({ init_point: response.init_point });

  } catch (error) {
    console.error("Erro detalhado MP:", error);
    return res.status(500).json({ 
      error: "Erro ao gerar pagamento",
      details: error.message 
    });
  }
}
