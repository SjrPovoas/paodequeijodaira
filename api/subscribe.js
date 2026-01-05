// api/subscribe.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { name, email, phone } = req.body;
    const apiKey = process.env.BREVO_API_KEY; // Puxa do arquivo .env ou da Vercel

    try {
        const response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': apiKey,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                attributes: { NOME: name, SMS: phone, WHATSAPP: phone },
                listIds: [5], // ID da sua lista no Brevo
                updateEnabled: true
            })
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar no Brevo' });
    }
}
