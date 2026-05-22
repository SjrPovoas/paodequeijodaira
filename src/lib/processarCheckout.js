// src/lib/processarCheckout.js

import { supabase } from './supabaseClient';

// 1. Função que registra o pedido bruto no Supabase (Serve para MP e Cripto)
export const criarPedidoNoSupabase = async ({
  dados, cpf, carrinho, totalGeral, frete, metodo, hash_transacao_crypto, carteira_blockchain_cliente, status_pagamento, pago_em }) => {
  const cpfLimpo = cpf ? cpf.replace(/\D/g, '') : '';
  const telefoneLimpo = dados.telefone ? dados.telefone.replace(/\D/g, '') : '';

  // Validações básicas de segurança no servidor/função
  if (!dados.nome_completo || !dados.email || !dados.cep || !dados.telefone) {
    throw new Error("Por favor, preencha Nome, E-mail, Telefone e CEP para a entrega.");
  }
  if (metodo === 'mercado_pago' && cpfLimpo.length !== 11) {
    throw new Error("O CPF é obrigatório e deve conter 11 dígitos para o Mercado Pago.");
  }
  if (carrinho.length === 0) {
    throw new Error("Seu carrinho está vazio.");
  }

  const dadosPedido = {
    nome_completo: dados.nome_completo || '',
    email: dados.email ? dados.email.toLowerCase().trim() : '',
    telefone: dados.telefone || '',
    cpf: metodo === 'cripto' ? '00000000000' : cpfLimpo,
    cep: dados.cep ? dados.cep.replace(/\D/g, '') : '',
    endereco_rua: dados.endereco_rua || '',
    endereco_numero: dados.endereco_numero || '',
    endereco_complemento: dados.endereco_complemento || '',
    cidade_estado: dados.cidade_estado || '',
    metodo_pagamento: metodo,
    valor_total_brl: Number(totalGeral) || 0,
    valor_frete: Number(frete) || 0,
    itens: carrinho,

    // 🟢 Mapeamento dinâmico para o Supabase
    status_pagamento: status_pagamento || 'aguardando',
    pago_em: pago_em || null,
    hash_transacao_crypto: hash_transacao_crypto || null,
    carteira_blockchain_cliente: carteira_blockchain_cliente || null,

    status_pedido: 'recebido'
  };

  const { data: pedido, error: errSupa } = await supabase
    .from('pedidos')
    .insert([dadosPedido])
    .select()
    .single();

  if (errSupa) {
    console.error("Erro Supabase:", errSupa);
    throw new Error("Erro ao registrar no banco: " + errSupa.message);
  }

  return pedido;
};

// 2. Função que dispara a API do Mercado Pago e gera o link
export const gerarLinkMercadoPago = async ({ pedidoId, carrinho, frete, dados, cpf }) => {
  const res = await fetch('/api/checkout-mp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      itens: carrinho,
      frete: Number(frete) || 0,
      pedidoId: pedidoId,
      email: dados.email.trim(),
      nome: dados.nome_completo,
      cpf: cpf.replace(/\D/g, '')
    })
  });

  const data = await res.json();

  if (!data.init_point) {
    throw new Error(data.error || "Erro ao gerar link de pagamento do Mercado Pago.");
  }

  return data.init_point;
};