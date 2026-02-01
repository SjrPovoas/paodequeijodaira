"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import BotaoPagamentoWeb3 from '../components/BotaoPagamentoWeb3';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { isAddress } from 'viem';

// --- DEFINIÇÃO DO CATÁLOGO DE PRODUTOS ---
export const produtos = [
    { id: 1, nome: 'T-Shirt Logo Pão de Queijo da Irá (Masc)', preco: 110, img: '/nfts/camiseta1.png', category: 'vestuario' },
    { id: 2, nome: 'T-Shirt Logo Pão de Queijo da Irá (Fem)', preco: 110, img: '/nfts/camiseta2.png', category: 'vestuario' },
    { id: 3, nome: 'Avental de Lona Pão de Queijo da Irá', preco: 85, img: '/nfts/avental.png', category: 'acessorios' },
    { id: 4, nome: 'Caneca Cerâmica Fosca do Pão de Queijo da Irá', preco: 42, img: '/nfts/caneca.png', category: 'acessorios' },
];

export default function Loja() {
  // --- CONFIGURAÇÕES E CONSTANTES ---
  const LINK_LISTA_ESPERA = "https://43782b7b.sibforms.com/serve/MUIFAC4AxTEnI80RImF7seW5i2MRkz5EqdqtMse22-stmvG7jsOqdFhZ6mmpfwRA-2skU_c3GJF8YXD6k-K_kNE6_gFeWIFbCIxIEWpknHGH8m6tdQMhTuqNG7-e_tsEQRBC4-pjosH0TVoqcW1UonSiJnd2E378zedWIJRs_Dhj9R9v8_VCpmg9Kebo_wFD_WsvLIPqwRBVBCNh8w==";
  const VALOR_FRETE_GRATIS = 500;
  const WHATSAPP_NUMBER = "5561982777196";

  // --- 1. ESTADOS DE INTERFACE E DADOS ---
  const [carrinho, setCarrinho] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Essencial para evitar erro de hidratação
  // --- ESTADO ADICIONAL PARA O MENU MOBILE (Necessário para o JSX abaixo) ---
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const [etapaCheckout, setEtapaCheckout] = useState('carrinho'); 
  const [metodoSelecionado, setMetodoSelecionado] = useState(null); 
  const [showScrollTop, setShowScrollTop] = useState(false);
  // Estado unificado para dados do cliente
  const [dados, setDados] = useState({ 
    nome: '', email: '', cpf: '', cep: '', endereco: '', complemento: '', carteira_blockchain: '' });  
  const [frete, setFrete] = useState(0);

  // --- 2. CÁLCULOS OTIMIZADOS ---
  const subtotal = useMemo(() => {
    if (!Array.isArray(carrinho)) return 0;
    return carrinho.reduce((acc, item) => acc + (Number(item?.preco || 0) * Number(item?.quantidade || 1)), 0);
  }, [carrinho]);

  const totalGeral = subtotal + frete;

  // --- 3. PERSISTÊNCIA (LIFECYCLE) ---
  useEffect(() => {
    setIsMounted(true);
    const salvo = localStorage.getItem('carrinho_ira');
    if (salvo) {
      try {
        const parsed = JSON.parse(salvo);
        if (Array.isArray(parsed)) setCarrinho(parsed);
      } catch (e) { 
        console.error("Erro ao carregar carrinho:", e); 
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('carrinho_ira', JSON.stringify(carrinho));
    }
  }, [carrinho, isMounted]);

  // Monitor de Scroll para botão "Voltar ao Topo"
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    // --- 4. VALIDAÇÃO DE CARTEIRA CRIPTO ---
    // Ou usando Regex se preferir não importar nada extra:
    const validarEnderecoCrypto = (endereco) => {
    if (!endereco) return false;
    // Verifica se começa com 0x e tem 42 caracteres hexadecimais
    const regexHex = /^0x[a-fA-F0-9]{40}$/;
    return regexHex.test(endereco);
  };

   // --- 5. LÓGICA DE CEP E FRETE ---
    const handleCEP = async (v) => {
    const cepLimpo = v.replace(/\D/g, '').substring(0, 8);
    setDados(prev => ({ ...prev, cep: cepLimpo }));
    
    if (cepLimpo.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const json = await res.json();
        
        if (json && !json.erro) {
          const endFormatado = `${json.logradouro}, ${json.bairro} - ${json.localidade}/${json.uf}`;
          
          setDados(prev => ({ ...prev, endereco: endFormatado }));
          
          const regiao = cepLimpo.substring(0, 2);
          const freteBase = ["70", "71", "72", "73"].includes(regiao) ? 25 : 50;
          
          // Lógica de Frete Grátis (500 Reais)
          setFrete(subtotal >= VALOR_FRETE_GRATIS ? 0 : freteBase);
        } else {
          alert("❌ CEP não encontrado.");
          setDados(prev => ({ ...prev, endereco: '' }));
          setFrete(0);
        }
      } catch (e) { 
        console.error("Erro ao buscar CEP:", e); 
      }
    }
  };
      
  // --- 6. GESTÃO DO CARRINHO ---
  const add = (p, tam = null) => {
    if (p.category === 'vestuario' && !tam) {
      alert('⚠️ Por favor, selecione um tamanho antes de adicionar.');
      return;
    }
    setCarrinho(prev => {
      const existe = prev.find(i => i.id === p.id && i.tamanho === tam);
      if (existe) {
        return prev.map(i => i.id === p.id && i.tamanho === tam ? { ...i, quantidade: i.quantidade + 1 } : i);
      }
      return [...prev, { ...p, tamanho: tam, quantidade: 1 }];
    });
    setEtapaCheckout('carrinho');
    setModalAberto(true);
  };

   const remover = (idx) => setCarrinho(prev => prev.filter((_, i) => i !== idx));
    
   // --- 7. INTEGRAÇÃO SUPABASE E MERCADO PAGO ---
   const processarPedidoFinal = async () => {
    if (!dados.nome || !dados.email || !dados.endereco) {
      alert("⚠️ Preencha os dados de contato e entrega.");
      return;
    }

    setLoading(true);
    try {
      const valorFrete = parseFloat(frete) || 0;
      const subtotal = carrinho.reduce((acc, item) => acc + item.preco, 0);
      const valorTotal = subtotal + valorFrete;

      const { data: pedidoSalvo, error: errorSupabase } = await supabase
        .from('pedidos')
        .insert([{
          nome: dados.nome,
          email: dados.email,
          cep: dados.cep,
          endereco: dados.endereco,
          complemento: dados.complemento,
          itens: carrinho,
          total_geral: valorTotal,
          valor_frete: valorFrete,
          metodo_pagamento: metodoSelecionado,
          status_pagamento: 'Aguardando Pagamento'
        }])
        .select();

      if (errorSupabase) throw errorSupabase;

      const novoPedidoId = pedidoSalvo[0].id;

      if (metodoSelecionado === 'mp') {
        const response = await fetch('/api/checkout-mp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pedidoId: novoPedidoId,
            itens: carrinho,
            frete: valorFrete,
            total: valorTotal,
            email: dados.email
          }),
        });
        const resData = await response.json();
        if (resData.init_point) window.location.href = resData.init_point;
      } else {
        // ESSENCIAL: Salva o ID e pula para a Etapa 4 (Blockchain)
        setDados(prev => ({ ...prev, pedidoId: novoPedidoId }));
        setEtapaCheckout('pagamento_blockchain');
      }
    } catch (err) {
      console.error(err);
      alert("Erro: " + err.message);
    } finally {
      setLoading(false);
    }
  };
    
  // Proteção de Hidratação
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
          <Link href="/">
            <img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto cursor-pointer" />
          </Link>

          {/* NAVEGAÇÃO DESKTOP */}
          <nav className="hidden md:flex space-x-6 text-[10px] font-bold uppercase tracking-widest items-center">
            <Link href="/loja#web3" className="hover:text-orange-600 transition-colors font-black uppercase text-[12px] flex items-center gap-2">
              LANÇAMENTO <i className="bi bi-gem text-[18px]"></i>
            </Link>

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
                      <i className={`bi ${
                        !connected 
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

        {/* MENU MOBILE OVERLAY */}
        <div className={`fixed inset-0 z-[1000] bg-white md:hidden transition-all duration-500 ${menuMobileAberto ? 'visible' : 'invisible'}`}>
          <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${menuMobileAberto ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMenuMobileAberto(false)}></div>
          <nav className={`absolute top-0 right-0 w-[100%] h-screen bg-white transition-transform duration-500 ease-in-out shadow-2xl flex flex-col z-[1001] ${menuMobileAberto ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-end p-6">
              <button onClick={() => setMenuMobileAberto(false)} className="text-3xl text-orange-600 p-2"><i className="bi bi-x-lg"></i></button>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center space-y-8 text-center px-6">
              <Link href="/" onClick={() => setMenuMobileAberto(false)} className="text-2x1 font-black uppercase tracking-[0.4em] text-orange-600">COMPRAR PÃO DE QUEIJO</Link>
              <Link href="/loja" onClick={() => setMenuMobileAberto(false)} className="text-2xl font-black uppercase italic tracking-tighter border-b-4 border-orange-600">LOJA LIFESTYLE</Link>
              
              <div className="pt-4 flex flex-col space-y-4">
                <Link href="/loja#web3" onClick={() => setMenuMobileAberto(false)} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                  <i className="bi bi-gem text-lg"></i>Lançamento
                </Link>
                <Link href="/pedidos" onClick={() => setMenuMobileAberto(false)} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                  <i className="bi bi-box-seam text-lg"></i>Rastrear Pedido
                </Link>
                <Link href="/suporte" onClick={() => setMenuMobileAberto(false)} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                  <i className="bi bi-arrow-left-right text-lg"></i>Trocas & Devoluções
                </Link>
              </div>

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

      {/* 5. SEÇÃO DE CREDIBILIDADE */}
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

      {/* 6. MODAL DE CHECKOUT PREMIUM SOFT - REVISADO E INTEGRADO */}
      {modalAberto && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          {/* Backdrop com desfoque */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500" onClick={() => setModalAberto(false)}></div>        
          {/* Container do Modal */}
          <div className="relative w-full max-w-md bg-white h-[96vh] my-[2vh] mr-[1vw] rounded-[40px] shadow-2xl p-8 overflow-hidden flex flex-col animate-in slide-in-from-right duration-500 ease-out">          
            {/* Cabeçalho Dinâmico */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                  {etapaCheckout === 'carrinho' && 'Seu Carrinho'}
                  {etapaCheckout === 'metodo' && 'Pagamento'}
                  {etapaCheckout === 'dados' && 'Finalização'}
                  {etapaCheckout === 'pagamento_blockchain' && 'Web3 Checkout'}
                </h2>
                <div className="h-1 w-8 bg-orange-500 rounded-full mt-1"></div>
              </div>
              <button onClick={() => setModalAberto(false)} className="w-12 h-12 rounded-2xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all group">
                <i className="bi bi-x-lg text-gray-400 group-hover:text-black transition-colors"></i>
              </button>
            </div>

            {/* ETAPA 1: CARRINHO */}
            {etapaCheckout === 'carrinho' && (
              <div className="flex-grow flex flex-col h-full overflow-hidden">
                <div className="flex-grow space-y-5 overflow-y-auto pr-2 custom-scrollbar">
                  {carrinho.length === 0 ? (
                    <div className="text-center py-24">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="bi bi-cart-x text-3xl text-gray-200"></i>
                      </div>
                      <p className="font-bold text-gray-400 text-xs uppercase tracking-widest">Seu carrinho está vazio</p>
                    </div>
                  ) : (
                    carrinho.map((item, i) => (
                      <div key={i} className="flex gap-4 p-3 rounded-3xl hover:bg-gray-50 transition-colors">
                        <div className="w-24 h-28 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                          <img src={item.img} className="w-full h-full object-cover" alt={item.nome} />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <p className="font-bold text-sm text-gray-900 leading-tight">{item.nome}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-[10px] font-bold text-gray-500 rounded-lg uppercase">Tam: {item.tamanho || 'Único'}</span>
                          </div>
                          <div className="flex justify-between items-end">
                            <p className="text-orange-600 font-black text-lg">R$ {item.preco.toFixed(2)}</p>
                            <button onClick={() => remover(i)} className="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><i className="bi bi-trash3 text-sm"></i></button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-6 p-6 bg-gray-50 rounded-[32px]">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Simular Frete</label>
                  <div className="relative mb-3">
                    <input type="text" placeholder="00000-000" className="w-full bg-white border-none rounded-2xl p-4 font-bold text-sm shadow-sm outline-none" value={dados.cep} onChange={e => handleCEP(e.target.value)} />
                    <i className="bi bi-geo-alt absolute right-4 top-4 text-gray-300"></i>
                  </div>
                  {dados.endereco && (
                    <div className="mb-4 p-4 bg-orange-100/50 rounded-2xl border border-orange-200">
                      <p className="text-[11px] font-bold text-orange-900 leading-tight">{dados.endereco}</p>
                    </div>
                  )}
                  <div className="flex justify-between text-[11px] font-bold text-orange-600 uppercase mb-4 px-1">
                    <span>Frete:</span>
                    <span>{frete === 0 ? 'GRÁTIS' : `R$ ${frete.toFixed(2)}`}</span>
                  </div>
                  <button disabled={carrinho.length === 0 || !dados.endereco} onClick={() => setEtapaCheckout('metodo')} className="w-full bg-black text-white py-5 rounded-[22px] font-black uppercase text-xs tracking-widest hover:bg-orange-600 disabled:opacity-20 transition-all">
                    Confirmar Itens
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 2: MÉTODO DE PAGAMENTO */}
            {etapaCheckout === 'metodo' && (
              <div className="flex-grow flex flex-col justify-center space-y-4">
                <button onClick={() => { setMetodoSelecionado('mp'); setEtapaCheckout('dados'); }} className="w-full p-8 bg-gray-50 rounded-[32px] border-2 border-transparent hover:border-orange-500 flex justify-between items-center transition-all">
                  <div className="text-left"><p className="font-black text-gray-900 text-lg uppercase">Cartão ou PIX</p><p className="text-[10px] font-bold text-gray-400 uppercase">Via Mercado Pago</p></div>
                  <i className="bi bi-credit-card-2-back text-orange-500 text-2xl"></i>
                </button>
                <button onClick={() => { setMetodoSelecionado('cripto'); setEtapaCheckout('dados'); }} className="w-full p-8 bg-gray-50 rounded-[32px] border-2 border-transparent hover:border-orange-500 flex justify-between items-center transition-all">
                  <div className="text-left"><p className="font-black text-gray-900 text-lg uppercase">Pagar com Cripto</p><p className="text-[10px] font-bold text-gray-400 uppercase italic">Rede Polygon (POL)</p></div>
                  <i className="bi bi-currency-bitcoin text-orange-500 text-2xl"></i>
                </button>
                <button onClick={() => setEtapaCheckout('carrinho')} className="w-full py-4 text-[10px] font-black uppercase text-gray-400">Voltar ao Carrinho</button>
              </div>
            )}

           {/* ETAPA 3: DADOS FINAIS */}
            {etapaCheckout === 'dados' && (
              <div className="flex-grow flex flex-col h-full overflow-hidden">
                <div className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                  <div className="space-y-3">
                    <input type="text" placeholder="NOME COMPLETO" className="w-full bg-gray-50 rounded-2xl p-4 text-xs font-bold outline-none border-2 border-transparent focus:border-orange-500 transition-all" value={dados.nome} onChange={e => setDados({...dados, nome: e.target.value})} />
                    <input type="email" placeholder="E-MAIL" className="w-full bg-gray-50 rounded-2xl p-4 text-xs font-bold outline-none border-2 border-transparent focus:border-orange-500 transition-all" value={dados.email} onChange={e => setDados({...dados, email: e.target.value})} />
                    <input type="text" placeholder="COMPLEMENTO" className="w-full bg-gray-50 rounded-2xl p-4 text-xs font-bold outline-none border-2 border-transparent focus:border-orange-500 transition-all" value={dados.complemento} onChange={e => setDados({...dados, complemento: e.target.value})} />
                  </div>

                  <div className="bg-orange-50 rounded-[32px] p-6 border border-orange-100 mt-4 text-center">
                    <p className="font-black uppercase text-[10px] text-gray-900 mb-3 tracking-widest">Recompensas Web3</p>
                    <input type="text" placeholder="CARTEIRA POLYGON 0x..." value={dados.carteira_blockchain} onChange={(e) => setDados({...dados, carteira_blockchain: e.target.value})} className="w-full p-4 rounded-xl text-[10px] font-mono outline-none shadow-inner mb-2" />
                    <button onClick={() => window.open('/faq-web3', '_blank')} className="text-[9px] font-black text-orange-600 uppercase underline">O que é isso? Saiba mais</button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase">Total</p>
                      <p className="text-3xl font-black text-gray-900 italic text-orange-600">R$ {(carrinho.reduce((acc, item) => acc + item.preco, 0) + (parseFloat(frete) || 0)).toFixed(2)}</p>
                    </div>
                  </div>
                  <button onClick={processarPedidoFinal} disabled={loading} className="w-full bg-black text-white py-6 rounded-[24px] font-black uppercase text-xs tracking-widest hover:bg-orange-600 transition-all">
                    {loading ? 'Processando...' : 'Finalizar Pedido'}
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 4: PAGAMENTO BLOCKCHAIN */}
            {etapaCheckout === 'pagamento_blockchain' && (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-6 space-y-8 animate-in zoom-in duration-300">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <i className="bi bi-wallet2 text-5xl"></i>
                </div>
                <h3 className="text-2xl font-black text-gray-900 uppercase italic">Aguardando POL</h3>
                <div className="w-full">
                  <BotaoPagamentoWeb3 
                    total={(carrinho.reduce((acc, item) => acc + item.preco, 0) + (parseFloat(frete) || 0))} 
                    pedidoId={dados.pedidoId} 
                    onSuccess={() => window.location.href = "/sucesso"} 
                  />
                </div>
                <button onClick={() => setEtapaCheckout('dados')} className="text-[10px] font-black uppercase text-gray-400">Voltar</button>
              </div>
            )}
          </div>
        </div>  
      )}       
    
     {/* 7. FOOTER */}
      <footer className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:justify-between mb-16">
            <div className="flex flex-col items-center md:items-start space-y-4">
              <Link href="/"><img src="/logo-paodequeijodaira.jpg" className="h-20 cursor-pointer" alt="Logo" /></Link>
              <div className="flex gap-4">
                <Link href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-instagram"></i></Link>
                <Link href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-facebook"></i></Link>
                <Link href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-youtube"></i></Link>
              </div>
            </div>
            <div className="text-center md:text-left space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Ajuda & Suporte</h4>
              <div className="space-y-4">
                <Link href="/pedidos" className="flex items-center justify-center md:justify-start gap-2 group"><i className="bi bi-box-seam text-orange-600 text-lg"></i><p className="text-xs font-bold tracking-widest group-hover:text-orange-600 transition-colors pt-1">Rastrear Pedido</p></Link>
                <Link href="/suporte" className="flex items-center justify-center md:justify-start gap-2 group"><i className="bi bi-arrow-left-right text-orange-600 text-lg"></i><p className="text-xs font-bold tracking-widest group-hover:text-orange-600 transition-colors pt-1">Trocas e Devoluções</p></Link>
                <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="flex items-center justify-center md:justify-start gap-3 group"><i className="bi bi-whatsapp text-orange-600 text-lg"></i><p className="text-xs font-bold tracking-widest group-hover:text-orange-600 transition-colors pt-1">Fale Conosco</p></Link>
              </div>
            </div>
            <div className="text-center md:text-left space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Funcionamento & Retirada</h4>
              <div className="flex items-start justify-center md:justify-start gap-3"><i className="bi bi-clock text-orange-600 text-lg"></i><p className="text-sm text-gray-600 leading-tight">Seg a Sáb: 08:00 às 18:00<br />Dom: 08:00 às 12:00</p></div>
              <div className="pt-2"><Link href="#" target="_blank" className="flex items-start justify-center md:justify-start gap-3 group"><i className="bi bi-geo-alt text-orange-600 text-lg mt-0.5"></i><p className="text-sm text-gray-600 leading-relaxed text-left">Quadra 4 Lote 26 Condomínio Flores do Cerrado II<br />Recreio Mossoró - Cidade Ocidental-GO</p></Link></div>
            </div>
            <div className="text-center md:text-right space-y-4 flex flex-col items-center md:items-end">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Institucional</h4>
              <h3 className="text-[14px] text-base font-black pt-3 uppercase mb-1 italic tracking-tighter whitespace-nowrap">Pão de Queijo da Irá</h3>
              <div className="flex flex-row items-center justify-center md:justify-end gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">
                <Link href="/termos" className="hover:text-black flex items-center gap-1 transition-colors group">Termos de Uso <i className="bi bi-file-text group-hover:text-orange-600"></i></Link><span className="text-gray-200">|</span>
                <Link href="/privacidade" className="hover:text-black flex items-center gap-1 transition-colors group">Privacidade <i className="bi bi-shield-check group-hover:text-orange-600"></i></Link>
              </div>
              <p className="text-[9px] pt-2 font-bold text-gray-300 uppercase tracking-widest whitespace-nowrap">© 2026 - Todos os direitos reservados.</p>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-50 text-center">
            <Link href="https://sjrpovoas.vercel.app" target="_blank" className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300 hover:text-orange-600 transition-all">Desenvolvido por SjrPovoaS</Link>
          </div>
        </div>
      </footer>

      {/* Botão Voltar ao Topo */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className={`fixed bottom-8 right-8 z-[130] bg-orange-600 text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:bg-black hover:scale-110 active:scale-90 ${showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <i className="bi bi-arrow-up text-xl"></i>
      </button>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
