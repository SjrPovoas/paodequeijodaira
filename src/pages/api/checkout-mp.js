import { MercadoPagoConfig, Preference } from 'mercadopago';

// 1. Configuração do Cliente
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    // Recebendo dados adicionais do frontend (como o CPF)
    const { itens, email, frete, cpf } = req.body;

    if (!itens || !email) {
      return res.status(400).json({ error: "Dados insuficientes para o checkout." });
    }

    const emailLimpo = email.toLowerCase().trim();

    // 2. Mapeamento dos itens com preços formatados (garantindo 2 casas decimais)
    const itemsMP = itens.map(item => ({
      id: String(item.id),
      title: item.nome,
      unit_price: parseFloat(Number(item.preco).toFixed(2)),
      quantity: Number(item.quantidade),
      currency_id: 'BRL'
    }));

    // 3. Adiciona o frete como item
    if (frete && Number(frete) > 0) {
      itemsMP.push({
        id: 'custo-frete',
        title: 'Taxa de Entrega / Frete',
        unit_price: parseFloat(Number(frete).toFixed(2)),
        quantity: 1,
        currency_id: 'BRL'
      });
    }

    const preference = new Preference(client);

    // 4. Criação da Preferência com Dados Completos
    const response = await preference.create({
      body: {
        items: itemsMP,
        payer: {
          email: emailLimpo,
          identification: {
            type: 'CPF',
            number: cpf ? cpf.replace(/\D/g, '') : '' // Remove pontos e traços do CPF
          }
        },
        // Referência externa para o Webhook
        external_reference: emailLimpo, 
        
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/sucesso`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/erro`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/pendente`,
        },
        auto_return: "approved",
        
        // Configurações de pagamento para forçar a liberação dos métodos
        payment_methods: {
          installments: 12, // Permite parcelamento
        },

        notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/mercadopago`,
      }
    });

    // Retorna o link para o frontend
    res.status(200).json({ init_point: response.init_point });

  } catch (error) {
    console.error("Erro ao gerar link MP:", error);
    res.status(500).json({ 
      error: "Erro ao gerar link de pagamento", 
      details: error.message 
    });
  }
}