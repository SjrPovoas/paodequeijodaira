import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email, orderId, status, trackingCode, txHash } = req.body;

  // Link que leva o usuário direto para a página de rastreio seguro
  const rastreioUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/pedidos`;

  try {
    const data = await resend.emails.send({
      from: 'Pão de Queijo da Irá <onboarding@resend.dev>', 
      to: [email],
      reply_to: 'paodequeijodaira@gmail.com',
      subject: `📦 Pedido #${orderId.slice(0, 5).toUpperCase()}: ${status}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #f0f0f0; border-radius: 40px; padding: 40px; background-color: white; color: #1a1a1a;">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: #fff5ed; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 20px auto; line-height: 60px; font-size: 30px;">✨</div>
            <h1 style="font-weight: 900; text-transform: uppercase; font-size: 22px; letter-spacing: -1px; margin: 0; color: #000;">
              ${status}
            </h1>
            <p style="font-size: 10px; font-weight: bold; color: #ea580c; text-transform: uppercase; letter-spacing: 2px; margin-top: 5px;">Lifestyle & Web3 Ecosystem</p>
          </div>

          <div style="background: #fafafa; border-radius: 24px; padding: 25px; text-align: center; border: 1px solid #f5f5f5;">
            <p style="margin: 0; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #999;">Número do Pedido para Rastreio</p>
            <p style="font-size: 24px; font-weight: 900; color: #000; margin: 10px 0;">#${orderId.toUpperCase()}</p>
            <p style="margin: 0; font-size: 11px; color: #666;">Guarde este número. Você precisará dele e do seu CPF para rastrear o pacote em nosso site.</p>
          </div>

          <div style="margin: 30px 0; text-align: center;">
            <p style="font-size: 14px; color: #444; line-height: 1.6;">
              Seu pedido está avançando em nosso fluxo logístico. Clique no botão abaixo para acessar o portal de rastreio seguro.
            </p>
            
            <a href="${rastreioUrl}" style="display: inline-block; background: #000; color: white; padding: 18px 35px; text-decoration: none; font-weight: bold; font-size: 11px; text-transform: uppercase; border-radius: 20px; letter-spacing: 1px; margin-top: 20px;">
              Acessar Rastreio Seguro
            </a>
          </div>

          ${trackingCode ? `
            <div style="border-top: 1px solid #f0f0f0; padding-top: 30px; text-align: center;">
              <p style="font-size: 10px; font-weight: 900; text-transform: uppercase; color: #ea580c; margin-bottom: 5px;">Objeto Postado</p>
              <p style="font-size: 16px; font-weight: bold; color: #000;">Código: ${trackingCode}</p>
            </div>
          ` : ''}

          ${txHash ? `
            <div style="margin-top: 20px; padding: 15px; border-radius: 15px; background: #f3f0ff; border: 1px solid #e5dbff; text-align: center;">
              <p style="font-size: 9px; color: #8247E5; font-weight: 900; text-transform: uppercase; margin: 0;">Verified on Polygon (POL)</p>
              <p style="font-size: 9px; color: #8247E5; font-family: monospace; margin: 5px 0 0 0;">${txHash.slice(0, 30)}...</p>
            </div>
          ` : ''}

          <div style="margin-top: 40px; text-align: center; border-top: 1px solid #f5f5f5; padding-top: 20px;">
            <p style="font-size: 9px; font-weight: bold; text-transform: uppercase; color: #ccc; letter-spacing: 2px;">
              @ Loja Lifestyle e Acessórios | Pão de Queijo da Irá
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
