// src/pages/loja.js

"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import BotaoPagamentoWeb3 from '../components/BotaoPagamentoWeb3';
import Frete from '../components/Frete'; // Importação do componente desacoplado
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { isAddress } from 'viem';
import { criarPedidoNoSupabase, gerarLinkMercadoPago } from '../lib/processarCheckout';

const produtos = [
  { id: 1, nome: 'T-Shirt Logo Pão de Queijo da Irá (Masc)', preco: 110, img: '/imagens/camiseta1.png', category: 'vestuario' },
  { id: 2, nome: 'T-Shirt Logo Pão de Queijo da Irá (Fem)', preco: 110, img: '/imagens/camiseta2.png', category: 'vestuario' },
  { id: 3, nome: 'Avental de Lona Pão de Queijo da Irá', preco: 85, img: '/imagens/avental.png', category: 'acessorios' },
  { id: 4, nome: 'Caneca Cerâmica Fosca do Pão de Queijo da Irá', preco: 50, img: '/imagens/caneca.png', category: 'acessorios' },
  { id: 5, nome: 'Caneta Promocional Exclusiva do Pão de Queijo da Irá', preco: 1, img: '/imagens/caneta-promocional-exclusiva.png', category: 'acessorios' }
];

export default function Loja() {
  const LINK_LISTA_ESPERA = "https://43782b7b.sibforms.com/serve/MUIFAC4AxTEnI80RImF7seW5i2MRkz5EqdqtMse22-stmvG7jsOqdFhZ6mmpfwRA-2skU_c3GJF8YXD6k-K_kNE6_gFeWIFbCIxIEWpknHGH8m6tdQMhTuqNG7-e_tsEQRBC4-pjosH0TVoqcW1UonSiJnd2E378zedWIJRs_Dhj9R9v8_VCpmg9Kebo_wFD_WsvLIPqwRBVBCNh8w==";
  const VALOR_FRETE_GRATIS = 500;
  const WHATSAPP_NUMBER = "5561982777196";

  // --- 1. ESTADOS DE INTERFACE E DADOS ---
  const [carrinho, setCarrinho] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [pedidoId, setPedidoId] = useState(null);

  // Controle de Navegação do Checkout
  const [etapaCheckout, setEtapaCheckout] = useState('carrinho');
  const [metodoSelecionado, setMetodoSelecionado] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cpf, setCpf] = useState('');

  // Sincronização do scroll da página
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- 2. ESTADO DOS DADOS DO FORMULÁRIO (SINCRONIZADO COM O BANCO) ---
  const [dados, setDados] = useState({
    nome_completo: '',
    email: '',
    telefone: '',
    cep: '',
    endereco_rua: '',
    endereco_numero: '',
    endereco_complemento: '',
    cidade_estado: '',
    carteira_blockchain_cliente: ''
  });

  const [frete, setFrete] = useState(null);

  // --- 3. CÁLCULOS OTIMIZADOS (useMemo) ---
  const subtotal = useMemo(() => {
    if (!Array.isArray(carrinho)) return 0;
    return carrinho.reduce((acc, item) => {
      const preco = Number(item?.preco) || 0;
      const qtd = Number(item?.quantidade) || 1;
      return acc + (preco * qtd);
    }, 0);
  }, [carrinho]);

  const totalGeral = subtotal + (Number(frete) || 0);

  // --- 4. PERSISTÊNCIA E HIDRATAÇÃO ---
  useEffect(() => {
    setIsMounted(true);
    const salvo = localStorage.getItem('carrinho_ira');
    if (salvo) {
      try {
        const parsed = JSON.parse(salvo);
        if (Array.isArray(parsed)) setCarrinho(parsed);
      } catch (e) {
        console.error("Erro ao recuperar cache do carrinho", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('carrinho_ira', JSON.stringify(carrinho));
    }
  }, [carrinho, isMounted]);

  // --- 5. RECEBIMENTO DA CALLBACK DE FRETE MODULAR ---
  const handleFreteCalculado = (dadosFrete) => {
    setFrete(dadosFrete.frete);
    setDados(prev => ({
      ...prev,
      cep: dadosFrete.cep,
      endereco_rua: dadosFrete.endereco_rua || '',
      cidade_estado: dadosFrete.cidade_state || dadosFrete.cidade_estado || ''
    }));
  };

  // --- 6. GESTÃO DO CARRINHO ---
  const add = (p, tam = null) => {
    if (p.category === 'vestuario' && !tam) {
      alert('⚠️ Por favor, selecione um tamanho');
      return;
    }

    // ✨ REVISADO: Normaliza o valor para evitar conflito entre null e undefined nos produtos sem tamanho
    const tamanhoDefinido = tam || 'Único';

    setCarrinho(prev => {
      // Procura na lista considerando o padrão 'Único' para o que não for vestuário
      const existe = prev.find(i => i.id === p.id && (i.tamanho === tamanhoDefinido || (!i.tamanho && tamanhoDefinido === 'Único')));

      if (existe) {
        return prev.map(i =>
          i.id === p.id && (i.tamanho === tamanhoDefinido || (!i.tamanho && tamanhoDefinido === 'Único'))
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        );
      }

      return [...prev, { ...p, tamanho: tamanhoDefinido, quantidade: 1 }];
    });

    setEtapaCheckout('carrinho');
    setModalAberto(true);
  };

  const aumentarQuantidade = (index) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.map((item, idx) =>
        idx === index
          ? { ...item, quantidade: Number(item.quantidade || 1) + 1 }
          : item
      )
    );
  };

  const diminuirQuantidade = (index) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.map((item, idx) => {
        if (idx === index) {
          const qtdAtual = Number(item.quantidade || 1);
          return { ...item, quantidade: qtdAtual > 1 ? qtdAtual - 1 : 1 };
        }
        return item;
      })
    );
  };

  // Remove o item completamente do carrinho
  const remover = (index) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.filter((_, idx) => idx !== index)
    );
  };

// ========================================================
  // --- 7. FUNÇÃO AUXILIAR E CENTRALIZADA DE REGISTRO ---
  // ========================================================

  /**
   * 🟢 FUNÇÃO AUXILIAR: Grava os dados diretamente na tabela 'pedidos' do Supabase
   * Utiliza .select().single() para garantir o retorno imediato do ID gerado.
   */
  const criarPedidoNoSupabase = async (dadosInjetados) => {
    try {
      console.log("Iniciando inserção na tabela 'pedidos' do Supabase...", dadosInjetados);

      const cargaSupabase = {
        nome_completo: dadosInjetados.dados?.nome || dadosInjetados.dados?.nome_completo,
        email: dadosInjetados.dados?.email,
        telefone: dadosInjetados.dados?.telefone,
        cpf: dadosInjetados.cpf?.replace(/\D/g, ''),
        endereco_rua: dadosInjetados.dados?.rua || dadosInjetados.dados?.endereco_rua,
        endereco_numero: dadosInjetados.dados?.numero || dadosInjetados.dados?.endereco_numero,
        cidade_estado: dadosInjetados.dados?.cidade_estado,
        cep: dadosInjetados.dados?.cep,
        endereco_complemento: dadosInjetados.dados?.complemento || dadosInjetados.dados?.endereco_complemento || null,
        itens: dadosInjetados.carrinho, // Tipo JSONB
        valor_frete: dadosInjetados.frete,
        valor_total_brl: dadosInjetados.totalGeral, // Referência histórica em R$
        status_pedido: 'recebido',
        metodo_pagamento: dadosInjetados.metodo,
        status_pagamento: dadosInjetados.status_pagamento || 'aguardando',
        hash_transacao_crypto: dadosInjetados.hash_transacao_crypto || null,
        carteira_blockchain_cliente: dadosInjetados.carteira_blockchain_cliente || null,
        pago_em: dadosInjetados.pago_em || null,
        // Grava a quantidade exata de POL se o pagamento for cripto
        valor_total_pol: dadosInjetados.valor_total_pol ? Number(dadosInjetados.valor_total_pol) : null,
      };
      console.log("DEBUG: Valor POL sendo enviado:", dadosInjetados.valor_total_pol);
      console.log("DEBUG: Objeto completo da carga:", JSON.stringify(cargaSupabase, null, 2));
      // Chamada oficial ao cliente do Supabase
      const { data, error } = await supabase
        .from('pedidos')
        .insert([cargaSupabase])
        .select() // 🔥 Força o Supabase a devolver os dados gravados
        .single(); // 🔥 Garante o retorno como um objeto único (data.id)

      if (error) {
        console.error("❌ Erro interno retornado pelo Supabase:", error);
        throw error;
      }

      console.log("🚀 Registro salvo com sucesso no Supabase! Dados retornados:", data);
      return data;

    } catch (error) {
      console.error("❌ Falha crítica dentro de criarPedidoNoSupabase:", error);
      throw error;
    }
  };

  /**
   * 🖥️ FUNÇÃO CENTRALIZADA: Gerencia o fluxo completo de checkout (Cripto ou Mercado Pago)
   */
  const processarPedidoFinal = async (metodoOverride = null, txHash = null, carteiraCliente = null, valorPol = null) => {
    const metodoAtual = metodoOverride || metodoSelecionado;
    setLoading(true);

    try {
      // 1. Executa a gravação inicial ou final chamando a nossa função auxiliar
      const pedido = await criarPedidoNoSupabase({
        dados,
        cpf,
        carrinho,
        totalGeral,
        frete,
        metodo: metodoAtual,
        hash_transacao_crypto: txHash,
        carteira_blockchain_cliente: carteiraCliente,
        status_pagamento: txHash ? 'pago' : 'aguardando',
        pago_em: txHash ? new Date().toISOString() : null,
        // Envia o valor calculado de POL convertido para float numérico
        valor_total_pol: metodoAtual === 'cripto' && valorPol ? parseFloat(valorPol) : null
      });

      // Validação crucial de integridade de dados
      if (!pedido || !pedido.id) {
        throw new Error("Não foi possível gerar o número do pedido no banco de dados. O retorno veio vazio.");
      }

      // =====================================
      // 🟢 LÓGICA DE FLUXO PARA WEB3 (CRIPTO)
      // =====================================
      if (metodoAtual === 'cripto') {
        // Só limpa o estado global e o cache local se a transação blockchain já tiver a hash de sucesso
        if (txHash) {
          setCarrinho([]);
          if (typeof window !== 'undefined') localStorage.removeItem('carrinho_ira');
          setEtapaCheckout('sucesso');
        }

        // Retorna o objeto completo estruturado para o BotaoPagamentoWeb3 ler o ID corretamente
        return pedido;
      }

      // =====================================
      // 🟠 LÓGICA DE FLUXO PARA MERCADO PAGO
      // =====================================
      const resposta = await fetch('/api/checkout-mp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pedidoId: pedido.id,
          itens: carrinho,
          frete: frete,
          nome: dados.nome_completo || dados.nome,
          email: dados.email,
          cpf: cpf
        }),
      });

      const dadosDoPagamento = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dadosDoPagamento.details || dadosDoPagamento.error || 'Erro ao gerar o portal do Mercado Pago.');
      }

      // Redireciona o cliente externamente para o checkout seguro do Mercado Pago
      if (dadosDoPagamento.init_point) {
        window.location.href = dadosDoPagamento.init_point;
        return null;
      } else {
        throw new Error('O servidor do Mercado Pago não retornou o link de redirecionamento (init_point).');
      }

    } catch (err) {
      console.error("❌ Erro no Processamento Geral do Checkout:", err);
      alert(err.message || "Erro inesperado ao processar o checkout.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Função auxiliar para limpezas de interface e estados globais pós-pago
  const finalizarPedido = (txHash) => {
    console.log("Finalizando interface após pagamento cripto com sucesso:", txHash);
    setCarrinho([]);
    if (typeof window !== 'undefined') localStorage.removeItem('carrinho_ira');
    setEtapaCheckout('sucesso');
  };

  // --- 8. REGRAS DE VALIDAÇÃO MESTRE (useMemo) ---
  const cpfLimpoValidacao = useMemo(() => cpf ? cpf.replace(/\D/g, '') : '', [cpf]);

  const isCarteiraWeb3Valida = useMemo(() => {
    if (!dados.carteira_blockchain_cliente) return true;
    return isAddress(dados.carteira_blockchain_cliente);
  }, [dados.carteira_blockchain_cliente]);

  const camposPreenchidosValidacao = useMemo(() => {
    return !!(
      dados.cep?.length >= 8 &&
      dados.nome_completo?.trim() &&
      dados.email?.trim() &&
      dados.telefone?.trim() &&
      frete !== null &&
      frete !== undefined
    );
  }, [dados.cep, dados.nome_completo, dados.email, dados.telefone, frete]);

  const podeProsseguir = useMemo(() => {
    const baseValida = carrinho.length > 0 && camposPreenchidosValidacao && isCarteiraWeb3Valida;

    if (metodoSelecionado === 'mercado_pago') return baseValida && cpfLimpoValidacao.length === 11;
    if (metodoSelecionado === 'cripto') return baseValida && !!dados.carteira_blockchain_cliente && isAddress(dados.carteira_blockchain_cliente);

    return baseValida;
  }, [carrinho.length, camposPreenchidosValidacao, isCarteiraWeb3Valida, metodoSelecionado, cpfLimpoValidacao, dados.carteira_blockchain_cliente]);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-white font-sans text-black overflow-x-hidden flex flex-col">
      <Head>
        {/* SEO COMPLETO */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="title" content="Loja Lifestyle | Pão de Queijo da Irá" />
        <meta name="author" content="SjrPovoaS" />
        <meta name="description" content="Vendemos Camisetas, Canecas e Aventais do Pão de Queijo da Irá." />
        <meta name="Keywords" content="Loja Lifestyle e Acessórios, loja, camiseta, avental, caneca" />
        <meta name="skype_toolbar" content="skype_toolbar_parser_compatible" />
        <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
        <meta name="googlebot" content="index,follow" />
        <meta name="google-site-verification" content="rj9-yKQenuTL7WznZzLhnZhRRqalrW8B9ptmhuewFiA" />

        {/* Meta Tags para WhatsApp / Facebook (Open Graph) */}
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Loja Lifestyle e Acessórios | Pão de Queijo da Irá" />
        <meta property="og:description" content="Vendemos Camisetas, Canecas e Aventais do Pão de Queijo da Irá." />
        <meta property="og:site_name" content="Loja Lifestyle e Acessórios | Pão de Queijo da Irá" />
        {/*<meta property="og:image" content="https://paodequeijodaira.vercel.app/logo-paodequeijodaira.jpg" />*/}
        <meta property="og:image:secure_url" content="https://paodequeijodaira.vercel.app/logo-paodequeijodaira.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <title>Loja Lifestyle e Acessórios | Pão de Queijo da Irá</title>

        <link rel="canonical" href="https://paodequeijodaira.vercel.app/loja" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
      </Head>

      {/* BARRA DE ANÚNCIO TOPO */}
      <div className="bg-orange-600 text-white py-2 text-center text-[10px] font-black uppercase tracking-widest sticky top-0 z-[110]">
        • Entrega em todo Brasil • Frete Grátis acima de R$ 500,00 •
      </div>

      {/* HEADER PRINCIPAL */}
      <header className="border-b border-gray-100 py-4 px-6 sticky top-[28px] bg-white/95 backdrop-blur-md z-[100]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* LOGO */}
          <Link href="/" target="_blank"><img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto cursor-pointer" /></Link>
          {/* NAVEGAÇÃO DESKTOP */}
          <nav className="hidden md:flex space-x-6 text-[10px] font-bold uppercase tracking-widest items-center">
            <Link href="/loja#web3" className="hover:text-orange-600 transition-colors font-black uppercase text-[12px] flex items-center gap-2">LANÇAMENTO <i className="bi bi-gem text-[18px]"></i></Link>
            {/* BOTÃO WEB3 DESKTOP */}
            <div className="scale-90 origin-right">
              <ConnectButton.Custom>
                {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;
                  const isUnsupported = chain?.unsupported;

                  return (
                    <div {...(!ready && { 'aria-hidden': true, style: { opacity: 0, pointerEvents: 'none' } })}>
                      {!connected ? (
                        <button onClick={openConnectModal} className="hover:text-orange-600 transition-colors font-black uppercase text-[12px] flex items-center gap-2">
                          CONECTAR CARTEIRA <i className="bi bi-wallet2 text-xl"></i>
                        </button>
                      ) : isUnsupported ? (
                        <button onClick={openChainModal} className="bg-red-600 text-white px-4 py-2 rounded-full font-black uppercase text-[10px] animate-pulse">
                          Rede Errada <i className="bi bi-exclamation-triangle ml-1"></i>
                        </button>
                      ) : (
                        <button onClick={openAccountModal} className="border border-black px-4 py-2 rounded-full font-black uppercase text-[10px] flex items-center gap-2 hover:bg-black hover:text-white transition-all">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          {account.displayName}
                        </button>
                      )}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>

            {/* BOTÃO CARRINHO DESKTOP */}
            <button onClick={() => setModalAberto(true)} className="flex items-center gap-3 bg-[#3D2B1F] text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-colors group">
              <span className="text-[10px] font-black uppercase flex items-center gap-2">CARRINHO <i className="bi bi-cart3 text-[14px]"></i></span>
              <span className="text-xs font-bold border-l border-white/20 pl-3">{carrinho.length}</span>
            </button>
          </nav>
          {/* NAVEGAÇÃO MOBILE */}
          <div className="flex md:hidden items-center gap-4">
            <Link href="/loja#web3" className="flex flex-col items-center relative">
              <i className="bi bi-gem text-2xl"></i>
              <span className="text-[8px] font-black uppercase mt-0.4">Lançamento</span>
            </Link>
            {/* BOTÃO WEB3 MOBILE */}
            <ConnectButton.Custom>
              {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
                const ready = mounted;
                const connected = ready && account && chain;
                const isUnsupported = chain?.unsupported;

                return (
                  <div {...(!ready && { 'aria-hidden': true, style: { opacity: 0, pointerEvents: 'none' } })}>
                    <button
                      onClick={() => {
                        if (!connected) return openConnectModal();
                        if (isUnsupported) return openChainModal();
                        openAccountModal();
                      }}
                      className="flex flex-col items-center"
                    >
                      <i className={`bi ${!connected
                        ? 'bi-wallet2'
                        : isUnsupported
                          ? 'bi-exclamation-triangle-fill text-red-600'
                          : 'bi-person-check-fill text-green-600'
                        } text-xl`}></i>
                      <span className="text-[8px] font-black uppercase mt-1">
                        {isUnsupported ? 'Rede' : 'Carteira'}
                      </span>
                    </button>
                  </div>
                );
              }}
            </ConnectButton.Custom>

            <button onClick={() => setModalAberto(true)} className="flex flex-col items-center relative">
              <i className="bi bi-cart3 text-xl"></i>
              {carrinho.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {carrinho.length}
                </span>
              )}
              <span className="text-[8px] font-black uppercase mt-1">Carrinho</span>
            </button>

            <button onClick={() => setMenuMobileAberto(true)} className="flex flex-col items-center text-orange-600">
              <i className="bi bi-list text-2xl"></i>
              <span className="text-[8px] font-black uppercase mt-0.5">Menu</span>
            </button>
          </div>
        </div>
        {/* ESTRUTURA MENU MOBILE OVERLAY */}
        <div className={`fixed inset-0 z-[1000] bg-white md:hidden transition-all duration-500 ${menuMobileAberto ? 'visible' : 'invisible'}`}>
          <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${menuMobileAberto ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMenuMobileAberto(false)}></div>
          <nav className={`absolute top-0 right-0 w-[100%] h-screen bg-white transition-transform duration-500 ease-in-out shadow-2xl flex flex-col z-[1001] ${menuMobileAberto ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-end p-6">
              <button onClick={() => setMenuMobileAberto(false)} className="text-3xl text-orange-600 p-2"><i className="bi bi-x-lg"></i></button>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center space-y-8 text-center px-6">
              <Link href="/" onClick={() => setMenuMobileAberto(false)} className="text-2x1 font-black uppercase tracking-[0.4em] text-orange-600">COMPRAR PÃO DE QUEIJO</Link>
              <Link href="/loja" onClick={() => setMenuMobileAberto(false)} className="text-2xl font-black uppercase italic tracking-tighter border-b-4 border-orange-600">LOJA LIFESTYLE</Link>
              {/* NOVOS LINKS DE RASTREIO E SUPORTE */}
              <div className="pt-4 flex flex-col space-y-4">
                <Link href="/loja#web3" onClick={() => setMenuMobileAberto(false)} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:text-orange-600 transition-colors">
                  <i className="bi bi-gem text-lg"></i>Lançamento
                </Link>
                <Link href="/pedidos" onClick={() => setMenuMobileAberto(false)} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:text-orange-600 transition-colors">
                  <i className="bi bi-box-seam text-lg"></i>Rastrear Pedido
                </Link>
                <Link href="/suporte" onClick={() => setMenuMobileAberto(false)} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:text-orange-600 transition-colors">
                  <i className="bi bi-arrow-left-right text-lg"></i>Trocas & Devoluções
                </Link>
              </div>
              {/* REDES SOCIAIS */}
              <div className="flex justify-center items-center gap-6 pt-6">
                <Link href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-instagram"></i></Link>
                <Link href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-facebook"></i></Link>
                <Link href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-youtube"></i></Link>
              </div>
            </div>
            <div className="p-10 text-center border-t border-gray-50">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">© Pão de Queijo da Irá</p>
            </div>
          </nav>
        </div>
      </header>

      {/* 3. PRODUTOS GRID */}
      <main className="max-w-7xl mx-auto py-20 px-6 flex-grow">
        <div className="mb-20">
          <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">
            LIFESTYLE <br /><span className="text-orange-600">& ACESSÓRIOS</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 mt-2">Produtos exclusivos e oficiais da marca do Pão de Queijo da Irá</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-20">
          {produtos.map(p => (
            <div key={p.id} className="group">
              <div className="aspect-[4/5] bg-gray-50 mb-8 overflow-hidden rounded-[40px] border border-gray-100 relative">
                <img src={p.img} alt={p.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-6 right-6 bg-white px-4 py-2 rounded-full font-black text-xs shadow-sm">R$ {p.preco.toFixed(2)}</div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="font-black uppercase text-xl italic mb-1">{p.nome}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{p.category}</p>
                </div>
              </div>
              <div className="mt-6">
                {p.category === 'vestuario' ? (
                  <div className="flex gap-2">
                    {['P', 'M', 'G', 'GG'].map(s => (
                      <button key={s} onClick={() => add(p, s)} className="flex-1 py-3 border-2 border-black font-black hover:bg-black hover:text-white transition-all text-xs rounded-xl">{s}</button>
                    ))}
                  </div>
                ) : (
                  <button onClick={() => add(p)} className="w-full py-4 bg-black text-white font-black uppercase text-xs tracking-widest hover:bg-orange-600 transition-all rounded-xl">Adicionar ao Carrinho</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. SEÇÃO WEB3 (Genesis Pass) */}
      <section id="web3" className="py-24 px-6 md:px-12 bg-[#2D3134] text-white relative overflow-hidden">
        <div className="max-w-4xl relative z-10 mx-auto md:mx-0">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4 italic">
            IRÁ Digital <br /> <span className="outline-text" style={{ WebkitTextStroke: '1px white', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Genesis Pass</span>
          </h2>
          <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[12px] mb-12">
            (Genesis Pass): Os Benefícios na sua carteira digital.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
            <div className="space-y-8">
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Golden Discount</h4>
                <p className="text-gray-300 text-xs leading-relaxed">10% de desconto fixo em todos os itens da loja.</p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Ira's Secret Club</h4>
                <p className="text-gray-300 text-xs leading-relaxed">Acesso a um grupo fechado com receitas exclusivas.</p>
              </div>
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Physical Gift</h4>
                <p className="text-gray-300 text-xs leading-relaxed">Primeiro holder recebe kit físico exclusivo.</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-start">
            <Link href={LINK_LISTA_ESPERA} target="_blank" rel="noopener noreferrer" className="mt-16 inline-block bg-orange-600 text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-orange-500 transition-all shadow-xl">
              Entrar na Lista de Espera
            </Link>
          </div>
        </div>
        <div className="absolute top-1/2 right-[-5%] translate-y-[-50%] text-[25vw] font-black opacity-[0.05] select-none text-orange-500 pointer-events-none whitespace-nowrap hidden md:block">
          WEB3
        </div>
      </section>

      {/* 5. SEÇÃO DE CREDIBILIDADE (Fiel ao original) */}
      <section className="bg-white border-t border-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            <div className="flex flex-col items-center text-center space-y-3 group">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-green-50 transition-all">
                <i className="bi bi-google text-gray-400 group-hover:text-green-600 text-xl"></i>
              </div>
              <div>
                <h5 className="font-black uppercase text-[9px] tracking-[0.2em] mb-1">Google Safe Browsing</h5>
                <p className="text-[8px] text-gray-400 uppercase leading-tight px-4">Ambiente monitorado e livre de malwares</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 group">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-all">
                <i className="bi bi-shield-lock text-gray-400 group-hover:text-blue-600 text-xl"></i>
              </div>
              <div>
                <h5 className="font-black uppercase text-[9px] tracking-[0.2em] mb-1">Conexão Criptografada</h5>
                <p className="text-[8px] text-gray-400 uppercase leading-tight px-4">Dados protegidos via SSL 256-bits</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 group">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-purple-50 transition-all">
                <i className="bi bi-hexagon-fill text-gray-400 group-hover:text-[#8247E5] text-xl"></i>
              </div>
              <div>
                <h5 className="font-black uppercase text-[9px] tracking-[0.2em] mb-1">Polygon Ecosystem</h5>
                <p className="text-[8px] text-gray-400 uppercase leading-tight px-4">Pagamentos nativos em rede (POL)</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 group">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-orange-50 transition-all">
                <i className="bi bi-award text-gray-400 group-hover:text-orange-600 text-xl"></i>
              </div>
              <div>
                <h5 className="font-black uppercase text-[9px] tracking-[0.2em] mb-1">Curadoria Lifestyle</h5>
                <p className="text-[8px] text-gray-400 uppercase leading-tight px-4">Produtos exclusivos de tiragem limitada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MODAL DE CHECKOUT */}
      {modalAberto && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          {/* Backdrop (Fecha ao clicar fora) */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setModalAberto(false)}
          ></div>

          {/* Painel Lateral */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 overflow-y-auto flex flex-col animate-in slide-in-from-right duration-300">

            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter text-black">
                {etapaCheckout === 'carrinho' && (
                  <>Seu <span className="text-orange-600">Carrinho</span> 🛒</>
                )}
                {etapaCheckout === 'metodo' && (
                  <>Seu <span className="text-orange-600">Pagamento</span></>
                )}
                {etapaCheckout === 'dados' && (
                  <>Seu <span className="text-orange-600">Checkout</span></>
                )}
                {/* 🟢 Título adicionado para a etapa de sucesso */}
                {etapaCheckout === 'sucesso' && (
                  <>Pedido <span className="text-orange-600">Confirmado!</span> 🎉</>
                )}
              </h2>

              <button
                onClick={() => setModalAberto(false)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                aria-label="Fechar modal"
              >
                <i className="bi bi-x-lg text-xl"></i>
              </button>
            </div>

            {/* 🟢 CONTEÚDO DA TELA DE SUCESSO */}
            {etapaCheckout === 'sucesso' && (
              <div className="flex flex-col items-center justify-center text-center space-y-6 my-auto py-8">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-4xl text-green-500 animate-bounce">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-black text-black uppercase tracking-tight">
                    Muito obrigado pelo seu pedido!
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    Sua transação Web3 foi confirmada com sucesso na rede. Nosso sistema já está preparando tudo com muito carinho.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 w-full border border-gray-100 text-left">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Status do Pedido:</span>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md uppercase tracking-wider">
                    Pago via Cripto (POL)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setModalAberto(false);       // 🟢 Usa a sua função nativa para fechar o modal
                    setEtapaCheckout('carrinho'); // 🟢 Reseta o estado para a próxima vez que abrir
                  }}
                  className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase text-xs tracking-wider transition-all hover:bg-orange-600"
                >
                  Fechar e Continuar Navegando
                </button>
              </div>
            )}

            {/* ETAPA 1: CARRINHO (LISTAGEM DE ITENS) */}
            {etapaCheckout === 'carrinho' && (
              <div className="flex-grow flex flex-col">
                <div className="flex-grow space-y-6 overflow-y-auto pr-2">
                  {carrinho.length === 0 ? (
                    <div className="text-center py-20 opacity-30">
                      <i className="bi bi-cart-x text-6xl"></i>
                      <p className="mt-4 font-bold uppercase text-xs">Seu carrinho está vazio</p>
                    </div>
                  ) : (
                    carrinho.map((item, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.img}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            alt={item.nome}
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <p className="font-black text-[11px] uppercase leading-tight">{item.nome}</p>
                            <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase italic mb-2">
                              Tamanho: {item.tamanho || 'Único'}
                            </p>

                            {/* SELETOR DE QUANTIDADE (MAIS E MENOS) */}
                            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg w-fit px-1 py-0.5">
                              <button
                                type="button"
                                onClick={() => diminuirQuantidade(i)}
                                className="w-6 h-6 rounded-md hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors text-xs font-bold"
                              >
                                <i className="bi bi-dash"></i>
                              </button>

                              <span className="text-[11px] font-black text-black px-1 min-w-[12px] text-center">
                                {item.quantidade}
                              </span>

                              <button
                                type="button"
                                onClick={() => aumentarQuantidade(i)}
                                className="w-6 h-6 rounded-md hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors text-xs font-bold"
                              >
                                <i className="bi bi-plus"></i>
                              </button>
                            </div>
                          </div>

                          <div className="flex justify-between items-end">
                            <p className="text-orange-600 font-black text-sm">
                              R$ {(Number(item.preco || 0) * Number(item.quantidade || 1)).toFixed(2)}
                            </p>
                            <button
                              type="button"
                              onClick={() => remover(i)}
                              className="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                            >
                              <i className="bi bi-trash3 text-sm"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* BLOCO INFERIOR: RESUMO, FRETE E BOTÃO DE CONCLUIR */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                  {/* Componente de Frete nativo da aplicação */}
                  <Frete
                    subtotal={subtotal}
                    valorFreteGratis={VALOR_FRETE_GRATIS}
                    onFreteCalculado={handleFreteCalculado}
                    cepInicial={dados.cep}
                    totalGeral={totalGeral}
                    frete={frete}
                    loadingLoja={loading}
                  />

                  {/* Bloco de endereço automático gerado pelo CEP */}
                  {dados.cidade_estado && (
                    <div className="w-full bg-orange-50 border border-orange-100 rounded-xl p-4 text-[10px] font-bold uppercase text-orange-800 flex items-center gap-2 mt-2">
                      <i className="bi bi-geo-alt-fill text-orange-600 text-sm"></i>
                      <div>
                        <span className="text-gray-400 block text-[8px] tracking-widest">Destino do Pedido</span>
                        {dados.cidade_estado}
                      </div>
                    </div>
                  )}

                  {/* Botão para avançar de etapa */}
                  <button
                    type="button"
                    disabled={carrinho.length === 0 || !dados.cep || frete === null || frete === undefined || loading}
                    onClick={() => setEtapaCheckout('metodo')}
                    className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-orange-600 transition-all flex items-center justify-center gap-3 disabled:opacity-20 shadow-xl shadow-black/10 mt-4"
                  >
                    {loading ? (
                      <i className="bi bi-arrow-repeat animate-spin text-lg"></i>
                    ) : (
                      `Prosseguir para Pagamento`
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 2: ESCOHA DO MÉTODO */}
            {etapaCheckout === 'metodo' && (
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => { setMetodoSelecionado('mercado_pago'); setEtapaCheckout('dados'); }}
                  className="w-full p-8 border-2 border-gray-100 rounded-[30px] hover:border-orange-600 hover:bg-orange-50 transition-all flex justify-between items-center group text-left"
                >
                  <div>
                    <p className="font-black uppercase text-sm italic group-hover:text-orange-600">Cartão ou PIX</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">Via Mercado Pago</p>
                  </div>
                  <i className="bi bi-lightning-charge-fill text-2xl text-orange-600 group-hover:scale-110 transition-transform"></i>
                </button>

                <button
                  onClick={() => { setMetodoSelecionado('cripto'); setEtapaCheckout('dados'); }}
                  className="w-full p-8 border-2 border-gray-100 rounded-[30px] hover:border-orange-600 hover:bg-orange-50 transition-all flex justify-between items-center group text-left"
                >
                  <div>
                    <p className="font-black uppercase text-sm italic group-hover:text-orange-600">Pagar com Cripto</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">Rede Polygon (POL)</p>
                  </div>
                  <i className="bi bi-hexagon-fill text-2xl text-orange-600 group-hover:scale-110 transition-transform"></i>
                </button>

                <button
                  onClick={() => setEtapaCheckout('carrinho')}
                  className="mt-4 text-[10px] font-black uppercase text-gray-400 hover:text-black transition-colors text-center"
                >
                  ← Voltar ao Carrinho
                </button>
              </div>
            )}

            {/* ETAPA 3: DADOS DE ENVIO, CARTEIRA WEB3 E PAGAMENTO FINAL */}
            {etapaCheckout === 'dados' && (
              <div className="flex-grow flex flex-col justify-between">
                <div className="space-y-5 overflow-y-auto pr-1 flex-grow max-h-[75vh]">

                  {/* Nome Completo */}
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Nome Completo</label>
                    <input
                      type="text"
                      placeholder="DIGITE SEU NOME"
                      className="w-full bg-gray-50 border-none rounded-xl p-2 font-bold text-xs focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                      value={dados.nome_completo || ''}
                      onChange={e => setDados(prev => ({ ...prev, nome_completo: e.target.value }))}
                    />
                  </div>

                  {/* E-mail */}
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">E-mail para Notificações</label>
                    <input
                      type="email"
                      placeholder="SEU@EMAIL.COM"
                      className="w-full bg-gray-50 border-none rounded-xl p-2 font-bold text-xs focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                      value={dados.email || ''}
                      onChange={e => setDados(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  {/* CPF Condicional para Mercado Pago */}
                  {metodoSelecionado === 'mercado_pago' && (
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">CPF (Requerido para PIX/Cartão)</label>
                      <input
                        type="text"
                        placeholder="000.000.000-00"
                        maxLength={14}
                        className="w-full bg-gray-50 border-none rounded-xl p-2 font-bold text-xs focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                        value={cpf || ''}
                        onChange={e => setCpf(e.target.value)}
                      />
                    </div>
                  )}

                  {/* Bloco de Endereço Manual Complementar */}
                  <div className="border-t border-gray-100 pt-4 mt-2 space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Rua / Logradouro</label>
                        <input
                          type="text"
                          placeholder="Rua..."
                          className="w-full bg-gray-50 border-none rounded-xl p-2 font-bold text-xs focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                          value={dados.endereco_rua || ''}
                          onChange={e => setDados(prev => ({ ...prev, endereco_rua: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Número</label>
                        <input
                          type="text"
                          placeholder="Nº"
                          className="w-full bg-gray-50 border-none rounded-xl p-2 font-bold text-xs focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                          value={dados.endereco_numero || ''}
                          onChange={e => setDados(prev => ({ ...prev, endereco_numero: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Complemento / Referência</label>
                      <input
                        type="text"
                        placeholder="Apt, Bloco, Casa..."
                        className="w-full bg-gray-50 border-none rounded-xl p-2 font-bold text-xs focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                        value={dados.endereco_complemento || ''}
                        onChange={e => setDados(prev => ({ ...prev, endereco_complemento: e.target.value }))}
                      />
                    </div>
                    <div className="mt-3">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Telefone / WhatsApp</label>
                      <input
                        type="text"
                        placeholder="Telefone / WhatsApp"
                        value={dados.telefone || ''}
                        onChange={(e) => setDados({ ...dados, telefone: e.target.value })}
                        className="w-full bg-gray-50 border-none rounded-xl p-2 font-bold text-xs focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* BLOCO WEB3 COM VALIDAÇÃO EM TEMPO REAL */}
                  <div className="mt-4 border-2 border-dashed border-orange-200 p-5 rounded-2xl bg-orange-50/50">
                    <p className="text-[10px] font-black uppercase text-orange-600 mb-2 italic">
                      Retire sua recompensa Web3 (NFT que gera desconto)
                    </p>

                    <input
                      type="text"
                      placeholder="CARTEIRA POLYGON (0x...)"
                      value={dados.carteira_blockchain_cliente || ''}
                      onChange={(e) => setDados(prev => ({ ...prev, carteira_blockchain_cliente: e.target.value }))}
                      // Mudamos aqui: agora ele usa a constante 'isCarteiraWeb3Valida' que criamos com o 'useMemo'
                      className={`w-full border-2 p-4 rounded-xl font-mono text-[9px] outline-none transition-all ${dados.carteira_blockchain_cliente && !isCarteiraWeb3Valida
                        ? 'border-red-500 bg-red-50 text-red-600'
                        : 'border-orange-200 bg-white focus:border-orange-600'
                        }`}
                    />

                    {/* Ajustado para seguir o useMemo do viem */}
                    {dados.carteira_blockchain_cliente && !isCarteiraWeb3Valida && (
                      <p className="text-[10px] font-black text-red-500 mt-1 uppercase animate-pulse italic">
                        Endereço de carteira Inválido!
                      </p>
                    )}

                    {/* Ajuste de layout no link do Saiba Mais */}
                    <button
                      type="button"
                      onClick={() => window.open('/faq-web3', '_blank')}
                      className="text-[10px] font-black text-orange-600 uppercase mt-3 flex items-center gap-1.5 hover:underline transition-all text-left"
                    >
                      <i className="bi bi-question-circle text-sm"></i>
                      <span>Saiba Mais sobre a Recompensa</span>
                    </button>
                  </div>
                </div>

                {/* RESUMO DE VALORES E BOTÕES DE PAGAMENTO */}
                <div className="pt-4 border-t border-gray-100 bg-white sticky bottom-0 mt-auto">
                  <div className="bg-gray-50 rounded-2xl p-4 space-y-1 mb-4">
                    <div className="flex justify-between items-end pt-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Total Geral:</span>
                      <span className="text-2xl font-black text-black">R$ {totalGeral.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Renderização Condicional do Botão */}
                  {metodoSelecionado === 'mercado_pago' ? (
                    <button
                      type="button"
                      onClick={() => processarPedidoFinal('mercado_pago')}
                      disabled={loading || !podeProsseguir}
                      className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase text-xs tracking-wider disabled:opacity-50 transition-all hover:bg-orange-600"
                    >
                      {loading ? "Processando..." : "Finalizar e Ir para o Mercado Pago"}
                    </button>
                  ) : (
                    <BotaoPagamentoWeb3
                      total={totalGeral}
                      frete={frete}
                      carrinho={carrinho}
                      dados={dados}
                      cpf={cpf}
                      disabled={!podeProsseguir || loading}
                      // 🟢 Adicionamos o terceiro parâmetro 'valorPol' vindo do componente Web3
                      criarPedidoNoSupabase={async (txHash, carteira, valorPol) => {
                        console.log("Iniciando gravação do pedido cripto com valor POL:", valorPol);
                        return await processarPedidoFinal('cripto', txHash, carteira, valorPol);
                      }}
                      onSuccess={finalizarPedido}
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => setEtapaCheckout('metodo')}
                    className="w-full text-center text-[10px] font-black uppercase text-gray-400 hover:text-black mt-3 transition-colors"
                  >
                    ← Mudar Forma de Pagamento
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:justify-between mb-16">

            {/* COLUNA 1: LOGO E REDES SOCIAIS */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <Link href="/">
                <img src="/logo-paodequeijodaira.jpg" className="h-20 cursor-pointer" alt="Logo" />
              </Link>
              <div className="flex gap-4">
                <Link href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-instagram"></i></Link>
                <Link href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-facebook"></i></Link>
                <Link href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-youtube"></i></Link>
              </div>
            </div>

            {/* COLUNA 2: AJUDA & SUPORTE */}
            <div className="text-center md:text-left space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Ajuda & Suporte</h4>
              <div className="space-y-4">
                <Link href="/pedidos" className="text-orange-500 flex items-center justify-center md:justify-start gap-2 group">
                  <i className="bi bi-box-seam text-orange-600 text-lg"></i>
                  <p className="text-xs font-bold tracking-widest group-hover:text-orange-600 transition-colors pt-1">Rastrear Pedido</p>
                </Link>
                <Link href="/suporte" className="flex items-center justify-center md:justify-start gap-2 group">
                  <i className="bi bi-arrow-left-right text-orange-600 text-lg"></i>
                  <p className="text-xs font-bold tracking-widest group-hover:text-orange-600 transition-colors pt-1">Trocas e Devoluções</p>
                </Link>
                <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="flex items-center justify-center md:justify-start gap-3 group">
                  <i className="bi bi-whatsapp text-orange-600 text-lg"></i>
                  <p className="text-xs font-bold tracking-widest group-hover:text-orange-600 transition-colors pt-1">Fale Conosco</p>
                </Link>
              </div>
            </div>

            {/* COLUNA 3: FUNCIONAMENTO & LOCALIZAÇÃO */}
            <div className="text-center md:text-left space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Funcionamento & Retirada</h4>
              <div className="flex items-start justify-center md:justify-start gap-3">
                <i className="bi bi-clock text-orange-600 text-lg"></i>
                <p className="text-sm text-gray-600 leading-tight">Seg a Sáb: 08:00 às 18:00<br />Dom: 08:00 às 12:00</p>
              </div>
              <div className="pt-2">
                <Link href="https://maps.google.com" target="_blank" className="flex items-start justify-center md:justify-start gap-3 group">
                  <i className="bi bi-geo-alt text-orange-600 text-lg mt-0.5"></i>
                  <p className="text-sm text-gray-600 leading-relaxed text-left">
                    Quadra 4 Lote 26 Condomínio Flores do Cerrado II. Recreio Mossoró - Cidade Ocidental-GO</p>
                </Link>
              </div>
            </div>

            {/* COLUNA 4: INSTITUCIONAL & DIREITOS */}
            <div className="text-center md:text-right space-y-4 flex flex-col items-center md:items-end">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Institucional</h4>
              <h3 className="text-[14px] text-base font-black pt-3 uppercase mb-1 italic tracking-tighter whitespace-nowrap">Pão de Queijo da Irá</h3>
              <div className="flex flex-row items-center justify-center md:justify-end gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">
                <Link href="/termos" className="hover:text-black flex items-center gap-1 transition-colors group">
                  Termos de Uso <i className="bi bi-file-text group-hover:text-orange-600"></i>
                </Link>
                <span className="text-gray-200">|</span>
                <Link href="/privacidade" className="hover:text-black flex items-center gap-1 transition-colors group">
                  Privacidade <i className="bi bi-shield-check group-hover:text-orange-600"></i>
                </Link>
              </div>
              <p className="text-[9px] pt-2 font-bold text-gray-300 uppercase tracking-widest whitespace-nowrap">© 2026 - Todos os direitos reservados.</p>
            </div>
          </div>

          {/* ASSINATURA */}
          <div className="pt-8 border-t border-gray-50 text-center">
            <a href="https://sjrpovoas.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300 hover:text-orange-600 transition-all">Desenvolvido por SjrPovoaS</a>
          </div>
        </div>
      </footer>

      {/* BOTÃO VOLTAR AO TOPO */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 z-[90] bg-orange-600 text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:bg-black hover:scale-110 active:scale-90 animate-bounce">
          <i className="bi bi-arrow-up"></i>
        </button>
      )}

      <style jsx global>
        {`
          @keyframes slide-right { 
            from { transform: translateX(100%); } 
            to { transform: translateX(0); } 
          }
          .animate-slide-right { animation: slide-right 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        `}
      </style>

    </div>
  );
}