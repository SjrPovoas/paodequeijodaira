import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configuração do Cliente com o Token das Variáveis de Ambiente
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

export default async function handler(req, res) {
  // 1. Bloqueia qualquer método que não seja POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { itens, email, frete, cpf, pedidoId, nome } = req.body;

    // 2. Validação básica de entrada
    if (!itens || !email || !nome) {
      return res.status(400).json({ error: "Dados insuficientes para gerar o pagamento." });
    }

    // 3. Formatação dos Itens para o Padrão Mercado Pago
    const itemsMP = itens.map(item => ({
      id: String(item.id || 'prod'),
      title: `${item.nome}${item.tamanho ? ' (Tam: ' + item.tamanho + ')' : ''}`,
      unit_price: Number(item.preco),
      quantity: Number(item.quantidade || 1),
      currency_id: 'BRL'
    }));

    // 4. Adiciona o Frete como um item extra, se houver valor
    if (frete && Number(frete) > 0) {
      itemsMP.push({
        id: 'custo-frete',
        title: 'Taxa de Entrega / Frete',
        unit_price: Number(frete),
        quantity: 1,
        currency_id: 'BRL'
      });
    }

    // 5. Tratamento de Nome (MP exige Nome e Sobrenome separados)
    const nomePartes = nome.trim().split(' ');
    const firstName = nomePartes[0];
    const lastName = nomePartes.length > 1 ? nomePartes.slice(1).join(' ') : 'Cliente';

    const preference = new Preference(client);

    // 6. Construção da Preferência de Pagamento
    const preferenceData = {
      body: {
        items: itemsMP,
        payer: {
          email: email.toLowerCase().trim(),
          first_name: firstName,
          last_name: lastName,
        },
        external_reference: String(pedidoId || 'ref-pq'), 
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/sucesso`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/loja`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/pendente`,
        },
        auto_return: "approved",
        statement_descriptor: "PAO DE QUEIJO IRA", // Aparece na fatura do cartão
        payment_methods: {
          installments: 12, // Permite parcelamento em até 12x
        },
      }
    };

    // 7. Adiciona CPF apenas se for válido (11 dígitos) para evitar erro na API
    const cpfLimpo = cpf ? cpf.replace(/\D/g, '') : '';
    if (cpfLimpo.length === 11) {
      preferenceData.body.payer.identification = {
        type: 'CPF',
        number: cpfLimpo
      };
    }

    // 8. Cria a preferência no Mercado Pago
    const response = await preference.create(preferenceData);

    // 9. Retorna o link oficial de pagamento (init_point)
    return res.status(200).json({ init_point: response.init_point });

  } catch (error) {
    console.error("Erro detalhado Mercado Pago:", error);
    
    // Retorna erro em formato JSON para evitar o erro "Unexpected end of JSON" no front
    return res.status(500).json({ 
      error: "Erro ao gerar pagamento",
      details: error.message 
    });
  }
}
