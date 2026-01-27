import { Resend } from 'resend';

// Inicializa o Resend com a sua API KEY do arquivo .env
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Garante que apenas requisições POST sejam aceitas
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email, orderId, status, trackingCode, txHash } = req.body;

  // Lógica para definir o link de rastreio (Melhor Envio ou Checkout do Site)
  const trackingLink = trackingCode 
    ? `https://www.melhorenvio.com.br/rastreio/${trackingCode}`
    : `${process.env.NEXT_PUBLIC_URL}/pedidos?id=${orderId}`;

  try {
    const data = await resend.emails.send({
      from: 'Pão de Queijo da Irá <contato@paodequeijodaira.com>', // Deve ser um domínio verificado no Resend
      to: [email],
      subject: `📦 Pedido #${orderId.slice(0, 5)}: ${status}`,
      html: `
        <div style="font-family: 'Helvetica', sans-serif; max-width: 600px; margin: auto; border: 6px solid black; padding: 40px; background-color: white;">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="font-style: italic; font-weight: 900; text-transform: uppercase; font-size: 32px; letter-spacing: -2px; line-height: 1;">
              ${status}
            </h1>
          </div>

          <p style="font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Olá,</p>
          <p style="font-size: 14px; color: #333;">O status do seu pedido na <strong>Irá Digital</strong> foi atualizado com sucesso.</p>

          ${trackingCode ? `
            <div style="background: #000; color: #fff; padding: 30px; margin: 30px 0; text-align: center;">
              <p style="margin: 0 0 10px 0; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; color: #ea580c;">Logística Ativada</p>
              <p style="font-size: 24px; font-weight: 900; letter-spacing: 4px; margin-bottom: 20px;">${trackingCode}</p>
              <a href="${trackingLink}" style="background: #ea580c; color: white; padding: 12px 24px; text-decoration: none; font-weight: 900; font-size: 10px; text-transform: uppercase; border-radius: 0px;">
                Rastrear Objeto
              </a>
            </div>
          ` : `
            <div style="border: 2px solid #eee; padding: 20px; margin: 30px 0; text-align: center;">
              <p style="font-size: 12px; font-weight: bold;">ID DO PEDIDO: #${orderId}</p>
            </div>
          `}

          ${txHash ? `
            <div style="margin-top: 20px; padding: 10px; border-left: 4px solid #8247E5; background: #f3f0ff;">
              <p style="font-size: 10px; color: #8247E5; font-weight: bold; margin: 0;">VERIFICADO NA POLYGON (POL)</p>
              <p style="font-size: 9px; color: #8247E5; word-break: break-all; margin: 5px 0 0 0;">TX: ${txHash}</p>
            </div>
          ` : ''}

          <div style="margin-top: 50px; border-top: 1px solid #eee; pt: 20px; text-align: center;">
            <p style="font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #999;">
              Pão de Queijo da Irá © 2026 - Lifestyle & Web3 Ecosystem
            </p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error("Erro no Resend:", error);
    return res.status(500).json({ error: error.message });
  }
}
