import { Resend } from 'resend';

// Inicializa o Resend com a sua API KEY
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email, orderId, status, trackingCode, txHash } = req.body;

  // Lógica para o link de rastreio
  const trackingLink = trackingCode 
    ? `https://www.melhorenvio.com.br/rastreio/${trackingCode}`
    : `https://paodequeijodaira.vercel.app/sucesso?pedido=${orderId}`;

  try {
    const data = await resend.emails.send({
      // IMPORTANTE: Como não tem domínio próprio, use o onboarding do Resend
      from: 'Pão de Queijo da Irá <onboarding@resend.dev>', 
      to: [email],
      reply_to: 'paodequeijodaira@gmail.com', // O cliente responde para o seu Gmail
      subject: `📦 Pedido #${orderId.slice(0, 5)}: ${status}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #f0f0f0; border-radius: 40px; padding: 40px; background-color: white; color: #1a1a1a;">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: #fff5ed; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 20px auto; line-height: 60px; font-size: 30px;">🎉</div>
            <h1 style="font-weight: 900; text-transform: uppercase; font-size: 24px; letter-spacing: -1px; margin: 0; color: #000;">
              ${status}
            </h1>
            <p style="font-size: 11px; font-weight: bold; color: #ea580c; text-transform: uppercase; letter-spacing: 2px; margin-top: 5px;">Lifestyle & Web3</p>
          </div>

          <p style="font-size: 14px; color: #666; text-align: center; line-height: 1.6;">
            Olá! O status do seu pedido na <strong>Pão de Queijo da Irá</strong> foi atualizado. Estamos cuidando de cada detalhe.
          </p>

          ${trackingCode ? `
            <div style="background: #fafafa; border-radius: 30px; padding: 30px; margin: 30px 0; text-align: center; border: 1px solid #f0f0f0;">
              <p style="margin: 0 0 10px 0; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #999;">Código de Rastreio</p>
              <p style="font-size: 28px; font-weight: 900; letter-spacing: 2px; margin: 0 0 20px 0; color: #000;">${trackingCode}</p>
              <a href="${trackingLink}" style="display: inline-block; background: #000; color: white; padding: 15px 30px; text-decoration: none; font-weight: bold; font-size: 11px; text-transform: uppercase; border-radius: 20px; letter-spacing: 1px;">
                Rastrear meu Pedido
              </a>
            </div>
          ` : `
            <div style="background: #fff; border: 1px dashed #ddd; border-radius: 20px; padding: 20px; margin: 30px 0; text-align: center;">
              <p style="font-size: 11px; font-weight: bold; color: #999; margin: 0;">ID DO PEDIDO: #${orderId}</p>
            </div>
          `}

          ${txHash ? `
            <div style="margin-top: 20px; padding: 20px; border-radius: 20px; background: #f3f0ff; border: 1px solid #e5dbff; text-align: center;">
              <p style="font-size: 10px; color: #8247E5; font-weight: 900; text-transform: uppercase; margin: 0 0 5px 0;">Verificado na Rede Polygon</p>
              <p style="font-size: 10px; color: #8247E5; font-family: monospace; word-break: break-all; margin: 0;">TX: ${txHash.slice(0, 20)}...</p>
            </div>
          ` : ''}

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #f5f5f5; text-align: center;">
            <p style="font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #ccc;">
              Pão de Queijo da Irá Digital
            </p>
            <p style="font-size: 10px; color: #ddd; margin-top: 5px;">
              Enviado via https://paodequeijodaira.vercel.app
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
