"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import BotaoPagamentoWeb3 from '../components/BotaoPagamentoWeb3';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export default function Loja() {
  const LINK_LISTA_ESPERA = "https://43782b7b.sibforms.com/serve/MUIFAC4AxTEnI80RImF7seW5i2MRkz5EqdqtMse22-stmvG7jsOqdFhZ6mmpfwRA-2skU_c3GJF8YXD6k-K_kNE6_gFeWIFbCIxIEWpknHGH8m6tdQMhTuqNG7-e_tsEQRBC4-pjosH0TVoqcW1UonSiJnd2E378zedWIJRs_Dhj9R9v8_VCpmg9Kebo_wFD_WsvLIPqwRBVBCNh8w==";
  const VALOR_FRETE_GRATIS = 500;
  const WHATSAPP_NUMBER = "5561982777196";

  // ESTADOS
  const [carrinho, setCarrinho] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [dados, setDados] = useState({ nome: '', email: '', cpf: '', cep: '', endereco: '' });
  const [frete, setFrete] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // CÁLCULOS
  const subtotal = Array.isArray(carrinho)
    ? carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0)
    : 0;
  const totalGeral = subtotal + frete;

  // 1. PERFORMANCE & SEGURANÇA: CONTROLE DE MONTAGEM E PERSISTÊNCIA
  useEffect(() => {
    // Ordem alterada: Primeiro lê o localStorage, depois monta.
    const salvo = localStorage.getItem('carrinho_ira');
    if (salvo) {
      try {
        const parsed = JSON.parse(salvo);
        if (Array.isArray(parsed)) {
          setCarrinho(parsed);
        }
      } catch (e) {
        console.error("Erro no cache", e);
        setCarrinho([]);
      }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // A verificação if (isMounted) garante que o storage não seja zerado na hidratação
    if (isMounted) {
      localStorage.setItem('carrinho_ira', JSON.stringify(carrinho));
    }
  }, [carrinho, isMounted]);

  // 2. MONITORAR SCROLL
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. FRETE E VIA CEP
  useEffect(() => {
    if (subtotal === 0 || subtotal >= VALOR_FRETE_GRATIS) {
      setFrete(0);
      return;
    }
    if (dados.cep.length === 8) {
      const regiao = dados.cep.substring(0, 2);
      setFrete(["70", "71", "72", "73"].includes(regiao) ? 25 : 50);
    }
  }, [subtotal, dados.cep]);

  const handleCEP = async (v) => {
    const cep = v.replace(/\D/g, '').substring(0, 8);
    setDados({ ...dados, cep });
    if (cep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const json = await res.json();
        if (!json.erro) {
          setDados(d => ({
            ...d,
            endereco: `${json.logradouro}, ${json.bairro} - ${json.localidade}/${json.uf}`
          }));
        }
      } catch (e) { console.error("Erro CEP"); }
    }
  };

  // 4. ADICIONAR AO CARRINHO
  const add = (p, tamanhoSelecionado = null) => {
    if (p.category === 'vestuario' && !tamanhoSelecionado) {
      alert('⚠️ Por favor, selecione um tamanho: P, M, G ou GG');
      return;
    }
    const existe = carrinho.find(item =>
      item.id === p.id && (p.category === 'vestuario' ? item.tamanho === tamanhoSelecionado : true)
    );
    if (existe) {
      setCarrinho(carrinho.map(item =>
        item.id === p.id && (p.category === 'vestuario' ? item.tamanho === tamanhoSelecionado : true)
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      ));
    } else {
      setCarrinho([...carrinho, { ...p, tamanho: tamanhoSelecionado, quantidade: 1 }]);
    }
    setModalAberto(true);
  };

  // 5. CHECKOUT MERCADO PAGO
  const iniciarCheckoutMP = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const cpfLimpo = dados.cpf.replace(/\D/g, '');

    // Validações robustas
    if (!dados.nome || dados.nome.trim().split(' ').length < 2) {
      return alert("Por favor, preencha seu Nome Completo (Nome e Sobrenome).");
    }
    if (!dados.email || cpfLimpo.length !== 11 || !dados.endereco) {
      return alert("Por favor, preencha E-mail, CPF (11 dígitos) e Endereço corretamente.");
    }
    if (carrinho.length === 0) return alert("Carrinho vazio!");

    setLoading(true);

    // Tratamento de nome para o Mercado Pago (Evita botão cinza)
    const partesNome = dados.nome.trim().split(' ');
    const firstName = partesNome[0];
    const lastName = partesNome.slice(1).join(' ') || "da Silva";

    try {
      // 1. SALVAR NO SUPABASE
      const { data: pedidoSupabase, error: erroSupa } = await supabase
        .from('pedidos')
        .insert([{
          nome_cliente: dados.nome,
          email: dados.email.toLowerCase().trim(),
          cpf: cpfLimpo,
          cep: dados.cep,
          endereco: dados.endereco,
          total_geral: totalGeral,
          frete: frete,
          itens: carrinho,
          metodo_pagamento: 'Mercado Pago',
          status: 'pendente'
        }])
        .select()
        .single();

      if (erroSupa) throw new Error(`Erro ao salvar pedido: ${erroSupa.message}`);

      // 2. CHAMAR API DO MERCADO PAGO
      const res = await fetch('/api/checkout-mp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itens: carrinho,
          email: dados.email,
          frete: frete,
          cpf: cpfLimpo,
          pedidoId: pedidoSupabase.id,
          firstName: firstName,
          lastName: lastName
        })
      });

      const data = await res.json();

      if (data.init_point) {
        // 3. SUCESSO: Redireciona e limpa local
        localStorage.removeItem('carrinho_ira');
        window.location.href = data.init_point;
      } else {
        throw new Error(data.error || "Erro ao gerar link de pagamento.");
      }

    } catch (err) {
      console.error("Erro no Processo:", err);
      alert(err.message || "Erro ao processar pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // 6. PRODUTOS
  const produtos = [
    { id: 1, nome: 'T-Shirt Logo Pão de Queijo da Irá (Masc)', preco: 110, img: '/imagens/camiseta1.png', category: 'vestuario' },
    { id: 2, nome: 'T-Shirt Logo Pão de Queijo da Irá (Fem)', preco: 110, img: '/imagens/camiseta2.png', category: 'vestuario' },
    { id: 3, nome: 'Avental de Lona Pão de Queijo da Irá', preco: 85, img: '/imagens/avental.png', category: 'acessorios' },
    { id: 4, nome: 'Caneca Cerâmica Fosca do Pão de Queijo da Irá', preco: 42, img: '/imagens/caneca.png', category: 'acessorios' },
  ];

  if (!isMounted) return null;

  return (
    <div className="relative min-h-screen bg-white font-sans text-black overflow-x-hidden">
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
        <meta property="og:image" content="https://paodequeijodaira.vercel.app/logo-paodequeijodaira.jpg" />
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
          <a href="/"><img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto" /></a>

          {/* NAVEGAÇÃO DESKTOP */}
          <nav className="hidden md:flex space-x-4 text-[10px] font-bold uppercase tracking-widest items-center">
            <a href="#web3" className="hover:text-orange-600 transition-colors font-black uppercase text-[12px] flex items-center gap-2"><span className="hover:text-orange-600 transition-colors font-black uppercase text-[12px] flex items-center gap-2">IRÁ DIGITAL GENESIS PASS<i className="bi bi-gem text-[18px]"></i></span></a>
            <a href="/pedidos" className="text-[10px] font-black uppercase flex items-center gap-2"><span className="hover:text-orange-600 transition-colors font-black uppercase text-[12px] flex items-center gap-2">MEUS PEDIDOS<i className="bi bi-box-seam text-[18px]"></i></span></a>
            <div className="scale-90 origin-right">
              <ConnectButton.Custom>
                {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;
                  return (
                    <div {...(!ready && { 'aria-hidden': true, style: { opacity: 0, pointerEvents: 'none' } })}>
                      {!connected ? (
                        <button onClick={openConnectModal} className="hover:text-orange-600 transition-colors font-black uppercase text-[12px] flex items-center gap-2">
                          CONECTAR CARTEIRA <i className="bi bi-wallet2 text-xl"></i>
                        </button>
                      ) : (
                        <button onClick={openAccountModal} className="border border-black px-4 py-2 rounded-full font-black uppercase text-[10px] flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          {account.displayName}
                        </button>
                      )}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>

            <button onClick={() => setModalAberto(true)} className="flex items-center gap-3 bg-[#3D2B1F] text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-colors group">
              <span className="text-[10px] font-black uppercase flex items-center gap-2">CARRINHO <i className="bi bi-cart3 text-[14px]"></i></span>
              <span className="text-xs font-bold border-l border-white/20 pl-3">{carrinho.length}</span>
            </button>
          </nav>

          {/* NAVEGAÇÃO MOBILE */}
          <div className="flex md:hidden items-center gap-4">
            <a href="/pedidos" className="flex flex-col items-center relative"><i className="bi bi-box-seam text-2xl"></i>
              <span className="text-[8px] font-black uppercase mt-0.4">Meus Pedidos</span>
            </a>

            <ConnectButton.Custom>
              {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
                const connected = mounted && account && chain;
                return (
                  <button onClick={!connected ? openConnectModal : chain.unsupported ? openChainModal : openAccountModal} className="flex flex-col items-center">
                    <i className={`bi ${!connected ? 'bi-wallet2' : 'bi-person-check-fill text-green-600'} text-xl`}></i>
                    <span className="text-[8px] font-black uppercase mt-1">Carteira</span>
                  </button>
                );
              }}
            </ConnectButton.Custom>

            <button onClick={() => setModalAberto(true)} className="flex flex-col items-center relative">
              <i className="bi bi-bag text-xl"></i>
              {carrinho.length > 0 && <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">{carrinho.length}</span>}
              <span className="text-[8px] font-black uppercase mt-1">Carrinho</span>
            </button>

            <button onClick={() => setMenuMobileAberto(true)} className="flex flex-col items-center text-orange-600">
              <i className="bi bi-list text-2xl"></i>
              <span className="text-[8px] font-black uppercase mt-0.5">Menu</span>
            </button>
          </div>
        </div>

        {/* ESTRUTURA MENU MOBILE */}
        <div className={`fixed inset-0 z-[1000] bg-white md:hidden transition-all duration-500 ${menuMobileAberto ? 'visible' : 'invisible'}`}>
          <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${menuMobileAberto ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMenuMobileAberto(false)}></div>
          <nav className={`absolute top-0 right-0 w-[100%] h-screen bg-white transition-transform duration-500 ease-in-out shadow-2xl flex flex-col z-[1001] ${menuMobileAberto ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-end p-6">
              <button onClick={() => setMenuMobileAberto(false)} className="text-3xl text-orange-600 p-2"><i className="bi bi-x-lg"></i></button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center space-y-8 text-center px-6">
              <Link href="#web3" onClick={() => setMenuMobileAberto(false)} className="text-sm font-black uppercase tracking-[0.2em]">IRÁ DIGITAL GENESIS PASS</Link>
              <Link href="/" onClick={() => setMenuMobileAberto(false)} className="text-sm font-black uppercase tracking-[0.2em] text-orange-600">COMPRAR PÃO DE QUEIJO</Link>
              <Link href="/loja" onClick={() => setMenuMobileAberto(false)} className="text-2xl font-black uppercase italic tracking-tighter border-b-4 border-orange-600">LOJA LIFESTYLE</Link>

              {/* NOVOS LINKS DE RASTREIO E SUPORTE */}
              <div className="pt-4 flex flex-col space-y-4">
                <Link href="/pedidos" onClick={() => setMenuMobileAberto(false)} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:text-orange-600 transition-colors">
                  <i className="bi bi-box-seam text-lg"></i> Rastrear Pedido
                </Link>
                <Link href="/suporte" onClick={() => setMenuMobileAberto(false)} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:text-orange-600 transition-colors">
                  <i className="bi bi-arrow-left-right text-lg"></i> Trocas & Devoluções
                </Link>
              </div>

              {/* REDES SOCIAIS */}
              <div className="flex justify-center items-center gap-6 pt-6">
                <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-instagram"></i></a>
                <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-facebook"></i></a>
                <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-youtube"></i></a>
              </div>
            </div>

            <div className="p-10 text-center border-t border-gray-50">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">© Pão de Queijo da Irá</p>
            </div>
          </nav>
        </div>
      </header>

      {/* SEÇÃO PRODUTOS */}
      <main className="max-w-6xl mx-auto py-12 px-6">
        <header className="py-20 border-b border-orange-100 mb-16">
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">Lifestyle &<br />Acessórios</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-y-24">
          {produtos.map(p => (
            <div key={p.id} className="group flex flex-col h-full">
              <div className="aspect-[4/5] bg-white border border-gray-100 rounded-sm overflow-hidden mb-6">
                <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.nome} />
              </div>
              <h3 className="font-black uppercase text-sm tracking-widest mb-1">{p.nome}</h3>
              <p className="text-orange-600 font-bold mb-6 italic">R$ {p.preco.toFixed(2)}</p>
              {p.category === 'vestuario' ? (
                <div className="mb-6">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-3 text-gray-600">Selecione o tamanho:</p>
                  <div className="flex gap-2">
                    {['P', 'M', 'G', 'GG'].map(s => (
                      <button key={s} onClick={() => add(p, s)}
                        className={`w-12 h-12 border-2 font-black text-xs transition-all hover:border-orange-600 ${selectedSizes[p.id] === s ? 'border-orange-600 bg-orange-600 text-white' : 'border-gray-200'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button onClick={() => add(p)} className="mt-auto w-full py-5 border-2 border-[#3D2B1F] font-black uppercase text-[10px] tracking-widest hover:bg-[#3D2B1F] hover:text-white transition-all">
                  Adicionar ao Carrinho
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* SEÇÃO WEB3 */}
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
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Early Access</h4>
                <p className="text-gray-300 text-xs leading-relaxed">Acesso a novas fornadas 24h antes do público geral.</p>
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
            <a href={LINK_LISTA_ESPERA} target="_blank" rel="noopener noreferrer" className="mt-16 inline-block bg-orange-600 text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-orange-500 transition-all shadow-xl">
              Entrar na Lista de Espera
            </a>
          </div>
        </div>
        <div className="absolute top-1/2 right-[-5%] translate-y-[-50%] text-[25vw] font-black opacity-[0.05] select-none text-orange-500 pointer-events-none whitespace-nowrap hidden md:block">
          WEB3
        </div>
      </section>

      {/* MODAL CARRINHO */}
      {modalAberto && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalAberto(false)} />
          <div className="relative w-full max-w-md bg-[#FFFDF5] h-full shadow-2xl flex flex-col p-6 animate-slide-left">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">Seu Carrinho <i className="bi bi-cart3"></i></h2>
              <button onClick={() => setModalAberto(false)} className="text-[10px] font-black border-b-2 border-black">FECHAR</button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-6">
              {carrinho.map((item, index) => (
                <div key={index} className="flex gap-4 border-b border-orange-100 pb-4">
                  <img src={item.img} className="w-16 h-20 object-cover rounded bg-white" alt="" />
                  <div className="flex-1">
                    <h4 className="text-[10px] font-black uppercase">{item.nome}</h4>
                    {item.tamanho && <p className="text-[9px] text-orange-600">Tamanho: {item.tamanho}</p>}
                    <p className="text-[10px] font-black">QTD: {item.quantidade} | R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                  </div>
                  <button onClick={() => setCarrinho(carrinho.filter((_, i) => i !== index))} className="text-gray-400 hover:text-red-500"><i className="bi bi-trash3"></i></button>
                </div>
              ))}
              {(!carrinho || carrinho.length === 0) && (
                /* MELHORIA VISUAL: ÍCONE DE CARRINHO VAZIO */
                <div className="flex flex-col items-center justify-center py-2 text-gray-300">
                  <i className="bi bi-cart-x text-6xl mb-4"></i>
                  <p className="text-sm font-bold uppercase">Carrinho Vazio</p>
                </div>
              )}
            </div>
            <div className="mt-auto pt-6 border-t-2 border-[#3D2B1F] space-y-2">
              <div className="text-[10px] font-black uppercase">
                <div className="flex justify-between opacity-50"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-orange-600"><span>Frete</span><span>{subtotal >= VALOR_FRETE_GRATIS ? "GRÁTIS" : `R$ ${frete.toFixed(2)}`}</span></div>
                <div className="flex justify-between text-2xl pt-2 italic"><span>Total</span><span>R$ {totalGeral.toFixed(2)}</span></div>
              </div>
              <input type="text" placeholder="Nome Completo" value={dados.nome} onChange={e => setDados({ ...dados, nome: e.target.value })} className="w-full border p-0,8 text-[8px] bg-gray-50 text-xs mb-2" />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="CPF" value={dados.cpf} onChange={e => setDados({ ...dados, cpf: e.target.value })} className="w-full border p-0,8 text-[6px] bg-gray-50 text-xs" />
                <input type="text" placeholder="CEP" maxLength="8" value={dados.cep} onChange={e => handleCEP(e.target.value)} className="w-full border p-0,8 text-[6px] bg-gray-50 text-xs" />
              </div>
              <input type="text" placeholder="Endereço" value={dados.endereco} readOnly className="w-full border p-0,8 text-[6px] bg-gray-50 text-xs" />
              <input type="email" placeholder="E-mail" value={dados.email} onChange={e => setDados({ ...dados, email: e.target.value })} className="w-full border p-0,8 text-[6px] bg-gray-50 text-xs mb-2" />
              <div className="grid grid-cols-2 gap-2">
                <button onClick={iniciarCheckoutMP} disabled={loading || !carrinho.length} className="bg-black text-white py-2 font-black uppercase text-[10px] hover:bg-orange-600 disabled:opacity-50">CARTÃO OU PIX</button>
                <div className={(!dados.email || !dados.endereco || !carrinho.length) ? "opacity-30 pointer-events-none" : ""}>
                  <BotaoPagamentoWeb3 totalBRL={totalGeral} itens={carrinho} dadosEntrega={dados} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:justify-between mb-16">

            {/* COLUNA 1: LOGO E REDES SOCIAIS */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              {/* LOGO */}
              <Link href="/">
                <img src="/logo-paodequeijodaira.jpg" className="h-20 cursor-pointer" alt="Logo" />
              </Link>
              {/* REDES SOCIAIS */}
              <div className="flex gap-4">
                <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-instagram"></i></a>
                <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-facebook"></i></a>
                <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-youtube"></i></a>
              </div>
            </div>

            {/* COLUNA 2: AJUDA & SUPORTE */}
            <div className="text-center md:text-left space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Ajuda & Suporte</h4>
              <div className="space-y-4">
                <Link href="/pedidos" className="flex items-center justify-center md:justify-start gap-2 group">
                  <i className="bi bi-box-seam text-orange-600 text-lg"></i>
                  <p className="text-xs font-bold tracking-widest group-hover:text-orange-600 transition-colors pt-1">Rastrear Pedido</p>
                </Link>
                <Link href="/suporte" className="flex items-center justify-center md:justify-start gap-2 group">
                  <i className="bi bi-arrow-left-right text-orange-600 text-lg"></i>
                  <p className="text-xs font-bold tracking-widest group-hover:text-orange-600 transition-colors pt-1">Trocas e Devoluções</p>
                </Link>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="flex items-center justify-center md:justify-start gap-3 group">
                  <i className="bi bi-whatsapp text-orange-600 text-lg"></i>
                  <p className="text-xs font-bold tracking-widest group-hover:text-orange-600 transition-colors pt-1">Fale Conosco</p>
                </a>
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
                <a href="https://maps.app.goo.gl/oGCHp5i9y8HnPutg9" target="_blank" className="flex items-start justify-center md:justify-start gap-3 group">
                  <i className="bi bi-geo-alt text-orange-600 text-lg mt-0.5"></i>        
                  <p className="text-sm text-gray-600 leading-relaxed text-left">
                    Quadra 4 Lote 26 Condomínio Flores do Cerrado II<br />
                    Recreio Mossoró - Cidade Ocidental-GO</p>
                </a>
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
            <a href="https://sjrpovoas.vercel.app" target="_blank" className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300 hover:text-orange-600 transition-all">Desenvolvido por SjrPovoaS</a>
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
        {`@keyframes slide-left { from { transform: translateX(100%); } to { transform: translateX(0); } }
          @keyframes slide-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
          .animate-slide-left { animation: slide-left 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
          .animate-slide-right { animation: slide-right 0.4s cubic-bezier(0.16, 1, 0.3, 1); }`}
      </style>

    </div>
  );
}
