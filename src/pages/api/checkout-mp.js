import { MercadoPagoConfig, Preference } from 'mercadopago';

// 1. Configuração do Cliente com seu Token de Produção (APP_USR-...)
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { itens, email, frete } = req.body;

    // 2. Garantir que o email esteja limpo para servir de referência no Webhook
    const emailLimpo = email.toLowerCase().trim();

    // 3. Mapeamento dos itens
    const itemsMP = itens.map(item => ({
      id: String(item.id),
      title: item.nome,
      unit_price: Number(item.preco),
      quantity: Number(item.quantidade),
      currency_id: 'BRL'
    }));

    // 4. Adiciona o frete como item se houver valor
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

    // 5. Criação da Preferência
    const response = await preference.create({
      body: {
        items: itemsMP,
        payer: {
          email: emailLimpo
        },
        // ESTA LINHA É A CHAVE PARA O WEBHOOK FUNCIONAR:
        external_reference: emailLimpo, 
        
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/sucesso`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/erro`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/pendente`,
        },
        auto_return: "approved",
        
        // URL que você confirmou que funcionou no teste do Mercado Pago
        notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/mercadopago`,
      }
    });

    // 6. Retorna o link para o frontend
    res.status(200).json({ init_point: response.init_point });

  } catch (error) {
    console.error("Erro ao gerar link MP:", error);
    res.status(500).json({ 
      error: "Erro ao gerar link de pagamento", 
      details: error.message 
    });
  }
}