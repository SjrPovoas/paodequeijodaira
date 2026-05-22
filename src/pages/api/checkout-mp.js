// src/pages/api/checkout-mp.js

import { MercadoPagoConfig, Preference } from 'mercadopago';

// Inicializa o Mercado Pago com o seu Access Token seguro do ambiente
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || 'SEU_ACCESS_TOKEN_AQUI' 
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { pedidoId, itens, frete, nome, email, cpf } = req.body;

    // 1. MAPEIA O SEU CARRINHO PARA O PADRÃO EXIGIDO PELO MERCADO PAGO
    const itemsFormatados = itens.map((item) => {
      // Garante que o preço unitário seja extraído corretamente
      const precoUnitario = Number(item.preco || item.price || 0);
      
      return {
        id: String(item.id || Math.random()),
        title: item.nome || item.title || "Produto da Loja",
        quantity: Number(item.quantidade || item.quantity || 1),
        unit_price: precoUnitario,
        currency_id: 'BRL',
      };
    });

    // 2. ADICIONA O FRETE COMO UM ITEM INDEPENDENTE NO CHECKOUT
    if (frete && Number(frete) > 0) {
      itemsFormatados.push({
        id: 'frete-entrega',
        title: 'Taxa de Entrega / Frete',
        quantity: 1,
        unit_price: Number(frete),
        currency_id: 'BRL',
      });
    }

    // 3. CONFIGURA A PREFERÊNCIA DE COMPRA
    const preference = new Preference(client);
    const resultado = await preference.create({
      body: {
        items: itemsFormatados,
        payer: {
          name: nome,
          email: email,
          identification: {
            type: 'CPF',
            number: cpf ? cpf.replace(/\D/g, '') : '', // Remove pontos e traços do CPF
          },
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/loja?etapa=sucesso&pedido=${pedidoId}`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/loja?etapa=falha`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/loja?etapa=pendente`,
        },
        auto_return: 'approved',
        external_reference: String(pedidoId),
      },
    });

    // 4. RETORNA O LINK DE REDIRECIONAMENTO CORRETO
    return res.status(200).json({ init_point: resultado.init_point });

  } catch (error) {
    console.error('❌ Erro na API do Mercado Pago:', error);
    return res.status(500).json({ 
      error: 'Erro ao criar a preferência de pagamento.', 
      details: error.message 
    });
  }
}