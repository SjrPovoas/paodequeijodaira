// api/subscribe.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { name, email, phone } = req.body;
    const apiKey = process.env.BREVO_API_KEY; 

    // TRATAMENTO DO TELEFONE: O Brevo exige formato internacional (Ex: 5511999998888)
    // Remove parênteses, espaços e traços
    let cleanPhone = phone.replace(/\D/g, '');
    
    // Se o usuário não digitou o 55 no início, nós adicionamos automaticamente
    if (cleanPhone.length >= 10 && !cleanPhone.startsWith('55')) {
        cleanPhone = '55' + cleanPhone;
    }

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
                attributes: { 
                    // Mudamos para FIRSTNAME que é o padrão do Brevo
                    FIRSTNAME: name, 
                    // SMS é o campo padrão para celular no Brevo
                    SMS: cleanPhone 
                },
                listIds: [5], // Sua lista ID 5
                updateEnabled: true // Se o e-mail já existir, ele apenas atualiza os dados
            })
        });

        const data = await response.json();

        if (!response.ok) {
            // Log detalhado para você ver no painel da Vercel em caso de erro
            console.error('Erro retornado pelo Brevo:', data);
            return res.status(response.status).json(data);
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Erro na requisição à API:', error);
        return res.status(500).json({ error: 'Erro interno ao processar cadastro' });
    }
}
