import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Apenas POST é permitido' });
  }

  try {
    const { pedidoId, clienteEmail, motivo, descricao } = req.body;

    const data = await resend.emails.send({
      from: 'Loja Lifestyle do Pão de Queijo da Irá <onboarding@resend.dev>',
      to: [process.env.ADMIN_EMAIL_RESEND],
      subject: `🚨 TROCA: Pedido #${pedidoId?.slice(0, 8)}`,
      html: `
        <div style="font-family: sans-serif; border: 4px solid black; padding: 20px;">
          <h2 style="text-transform: uppercase;">Nova Solicitação de Troca</h2>
          <p><strong>Pedido:</strong> ${pedidoId}</p>
          <p><strong>Cliente:</strong> ${clienteEmail}</p>
          <p><strong>Motivo:</strong> ${motivo}</p>
          <p><strong>Descrição:</strong> ${descricao}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}