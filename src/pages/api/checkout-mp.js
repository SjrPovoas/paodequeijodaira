import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { itens, total, email, endereco } = req.body;

  try {
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: itens, // [{ title: 'Camiseta', quantity: 1, unit_price: 150 }]
        payer: { email: email },
        back_urls: {
          success: "https://paodequeijodaira.vercel.app/sucesso",
        },
        auto_return: "approved",
      }
    });

    res.status(200).json({ id: result.id, init_point: result.init_point });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
