// pages/api/checkout-mp.js
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configure com seu Access Token do painel de desenvolvedor do Mercado Pago
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Método não permitido' });

  const { itens, total, cpf, endereco } = req.body;

  try {
    const preference = new Preference(client);
    
    // Criando a preferência de venda
    const response = await preference.create({
      body: {
        items: itens.map(item => ({
          title: item.nome,
          unit_price: Number(item.preco),
          quantity: Number(item.quantidade),
          currency_id: 'BRL'
        })),
        payer: {
          identification: { type: 'CPF', number: cpf }
        },
        // Onde o cliente cai após pagar
        back_urls: {
          success: "https://paodequeijodaira.vercel.app/sucesso",
          failure: "https://paodequeijodaira.vercel.app/erro",
        },
        auto_return: "approved",
      }
    });

    // Retorna o link (init_point) para o frontend
    res.status(200).json({ id: response.id, init_point: response.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar pagamento" });
  }
}
