"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import BotaoPagamentoWeb3 from '../components/BotaoPagamentoWeb3';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export default function Loja() {
  const LINK_LISTA_ESPERA = "https://43782b7b.sibforms.com/serve/MUIFAC4AxTEnI80RImF7seW5i2MRkz5EqdqtMse22-stmvG7jsOqdFhZ6mmpfwRA-2skU_c3GJF8YXD6k-K_kNE6_gFeWIFbCIxIEWpknHGH8m6tdQMhTuqNG7-e_tsEQRBC4-pjosH0TVoqcW1UonSiJnd2E378zedWIJRs_Dhj9R9v8_VCpmg9Kebo_wFD_WsvLIPqwRBVBCNh8w==";
  const VALOR_FRETE_GRATIS = 500;
  const WHATSAPP_NUMBER = "5561982777196";

  // --- 1. ESTADOS DE INTERFACE E DADOS ---
  const [carrinho, setCarrinho] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Evita erros de hidratação (SSR vs Client)
  
  // Controle de Navegação do Checkout
  const [etapaCheckout, setEtapaCheckout] = useState('sacola'); // 'sacola' | 'metodo' | 'dados'
  const [metodoSelecionado, setMetodoSelecionado] = useState(null); // 'mp' | 'cripto'
  const [showScrollTop, setShowScrollTop] = useState(false);

  // E este useEffect para controlar a visibilidade do botão ao rolar a página:
  useEffect(() => {
  const handleScroll = () => setShowScrollTop(window.scrollY > 400);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Dados do Formulário
  const [dados, setDados] = useState({ nome: '', email: '', cpf: '', cep: '', endereco: '', complemento: '' });
  const [frete, setFrete] = useState(0);

  // --- 2. CÁLCULOS OTIMIZADOS (useMemo) ---
  // Impede que o app quebre se 'carrinho' não for um array e garante precisão numérica
  const subtotal = useMemo(() => {
    if (!Array.isArray(carrinho)) return 0;
    return carrinho.reduce((acc, item) => {
      const preco = Number(item?.preco) || 0;
      const qtd = Number(item?.quantidade) || 1;
      return acc + (preco * qtd);
    }, 0);
  }, [carrinho]);

  const totalGeral = subtotal + frete;

  // --- 3. PERSISTÊNCIA E HIDRATAÇÃO ---
  useEffect(() => {
    setIsMounted(true); // Indica que o componente está no navegador
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

  // Salva no localStorage sempre que o carrinho mudar
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('carrinho_ira', JSON.stringify(carrinho));
    }
  }, [carrinho, isMounted]);

  // --- 4. LÓGICA DE CEP E FRETE ---
  const handleCEP = async (v) => {
    const cep = v.replace(/\D/g, '').substring(0, 8);
    setDados(prev => ({ ...prev, cep }));
    
    if (cep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const json = await res.json();
        if (!json.erro) {
          setDados(prev => ({
            ...prev,
            endereco: `${json.logradouro}, ${json.bairro} - ${json.localidade}/${json.uf}`
          }));
          
          // Lógica de Frete baseada nos dois primeiros dígitos
          const regiao = cep.substring(0, 2);
          const valorFrete = ["70", "71", "72", "73"].includes(regiao) ? 25 : 50;
          
          // Se subtotal > frete grátis, zera o frete
          setFrete(subtotal >= VALOR_FRETE_GRATIS ? 0 : valorFrete);
        }
      } catch (e) { 
        console.error("Erro ao buscar CEP"); 
      }
    }
  };

  // --- 5. GESTÃO DO CARRINHO ---
  const add = (p, tam = null) => {
    // Validação de tamanho para vestuário
    if (p.category === 'vestuario' && !tam) {
      alert('⚠️ Por favor, selecione um tamanho (P, M, G ou GG)');
      return;
    }

    setCarrinho(prev => {
      // Busca item idêntico (mesmo ID e mesmo Tamanho)
      const existe = prev.find(i => i.id === p.id && i.tamanho === tam);
      if (existe) {
        return prev.map(i => i.id === p.id && i.tamanho === tam 
          ? { ...i, quantidade: i.quantidade + 1 } 
          : i
        );
      }
      return [...prev, { ...p, tamanho: tam, quantidade: 1 }];
    });
    
    // Reseta etapa e abre o modal
    setEtapaCheckout('sacola');
    setModalAberto(true);
  };

  const remover = (idx) => {
    setCarrinho(prev => prev.filter((_, i) => i !== idx));
  };

  // --- 6. FUNÇÃO CENTRALIZADA DE REGISTRO DE PEDIDO ---
  const processarPedidoFinal = async () => {
    const cpfLimpo = dados.cpf.replace(/\D/g, '');
    
    // Validações de Segurança
    if (!dados.nome || !dados.email || !dados.cep) {
      alert("Por favor, preencha Nome, E-mail e CEP para a entrega.");
      return null;
    }
    
    if (metodoSelecionado === 'mp' && cpfLimpo.length !== 11) {
      alert("O CPF é obrigatório para pagamentos via Mercado Pago.");
      return null;
    }
    
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio.");
      return null;
    }

    setLoading(true);

    try {
      // 1. Criar objeto do pedido para o Supabase
      const dadosPedido = {
        cliente_nome: dados.nome,
        cliente_email: dados.email.toLowerCase().trim(),
        // Placeholder se for Web3 sem CPF
        cliente_cpf: metodoSelecionado === 'mp' ? cpfLimpo : (cpfLimpo || 'WEB3_CLIENT'),
        cliente_cep: dados.cep,
        endereco_entrega: `${dados.endereco} | Complemento: ${dados.complemento || 'N/A'}`,
        valor_total: totalGeral,
        itens: carrinho, // Coluna JSONB no banco
        status: 'Aguardando Pagamento',
        metodo: metodoSelecionado === 'mp' ? 'Mercado Pago' : 'Web3 Cripto'
      };

      const { data: pedido, error: errSupa } = await supabase
        .from('pedidos')
        .insert([dadosPedido])
        .select()
        .single();

      if (errSupa) throw new Error("Erro ao registrar no banco de dados: " + errSupa.message);

      // 2. Se for Mercado Pago, envia para a API do Backend
      if (metodoSelecionado === 'mp') {
        const res = await fetch('/api/checkout-mp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            itens: carrinho, 
            frete, 
            pedidoId: pedido.id, 
            email: dados.email.trim(),
            nome: dados.nome,
            cpf: cpfLimpo
          })
        });

        const data = await res.json();
        if (data.init_point) {
          window.location.href = data.init_point;
        } else {
          throw new Error(data.error || "Erro ao gerar link de pagamento.");
        }
      } 
      
      // 3. Retorna o ID para o BotaoPagamentoWeb3 processar a transação
      return pedido.id;

    } catch (err) {
      console.error("Erro no Processamento:", err);
      alert(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

    // 4. PRODUTOS
  const produtos = [
    { id: 1, nome: 'T-Shirt Logo Pão de Queijo da Irá (Masc)', preco: 110, img: '/imagens/camiseta1.png', category: 'vestuario' },
    { id: 2, nome: 'T-Shirt Logo Pão de Queijo da Irá (Fem)', preco: 110, img: '/imagens/camiseta2.png', category: 'vestuario' },
    { id: 3, nome: 'Avental de Lona Pão de Queijo da Irá', preco: 85, img: '/imagens/avental.png', category: 'acessorios' },
    { id: 4, nome: 'Caneca Cerâmica Fosca do Pão de Queijo da Irá', preco: 42, img: '/imagens/caneca.png', category: 'acessorios' },
  ];

  
const [loading, setLoading] = useState(false);

const processarPedidoFinal = async () => {
    // 1. Validação de campos básicos
    if (!dados.nome || !dados.email) {
        alert("Preencha seu nome e e-mail para continuar.");
        return;
    }

    // 2. Validação da Carteira EVM (Tempo Real/Segurança)
    if (dados.carteira_blockchain) {
        const regexEVM = /^0x[a-fA-F0-9]{40}$/;
        if (!regexEVM.test(dados.carteira_blockchain)) {
            alert("O endereço da carteira digital está incorreto. Ele deve começar com '0x' seguido de 40 caracteres.");
            return; 
        }
    }

    setLoading(true);
    try {
        const { data, error } = await supabase
            .from('pedidos')
            .insert([{ 
                ...dados, 
                valor_total: totalGeral, 
                itens: JSON.stringify(carrinho), // Salva o que ele comprou
                status: 'Pendente' 
            }]);

        if (error) throw error;
        
        // Se for Mercado Pago, aqui você chamaria a abertura do checkout
        // Se for PIX, geraria o QR Code, etc.
        alert("Pedido registrado! Prepare sua carteira para o NFT.");
        
    } catch (err) {
        console.error(err);
        alert("Erro ao processar: " + err.message);
    } finally {
        setLoading(false);
    }
};

  // Se o componente ainda não montou no cliente, não renderiza nada (evita erro de hidratação)
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
          <Link href="/"><img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto cursor-pointer" /></Link>
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
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                {etapaCheckout === 'sacola' && 'Carrinho'}
                {etapaCheckout === 'metodo' && 'Pagamento'}
                {etapaCheckout === 'dados' && 'Checkout'}
              </h2>
              <button 
                onClick={() => setModalAberto(false)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <i className="bi bi-x-lg text-xl"></i>
              </button>
            </div>

            {/* ETAPA 1: SACOLA (LISTAGEM DE ITENS) */}
            {etapaCheckout === 'sacola' && (
              <div className="flex-grow flex flex-col">
                <div className="flex-grow space-y-6 overflow-y-auto pr-2">
                  {carrinho.length === 0 ? (
                    <div className="text-center py-20 opacity-30">
                      <i className="bi bi-cart-x text-6xl"></i>
                      <p className="mt-4 font-bold uppercase text-xs">Sua sacola está vazia</p>
                    </div>
                  ) : (
                    carrinho.map((item, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.nome} />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <p className="font-black text-[11px] uppercase leading-tight">{item.nome}</p>
                            <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase italic">
                              Tamanho: {item.tamanho || 'Único'} | Qtd: {item.quantidade}
                            </p>
                          </div>
                          <div className="flex justify-between items-end">
                            <p className="text-orange-600 font-black text-sm">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                            <button onClick={() => remover(i)} className="text-[9px] font-black text-red-500 hover:underline uppercase">Excluir</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="mb-4">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Cálculo de Entrega (CEP)</label>
                    <input 
                      type="text" 
                      placeholder="00000-000"
                      maxLength={9}
                      className="w-full bg-gray-50 border-none rounded-xl p-4 font-bold text-xs focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                      value={dados.cep} 
                      onChange={e => handleCEP(e.target.value)}
                    />
                    {dados.endereco && (
                      <p className="text-[9px] mt-2 font-bold uppercase text-gray-500 flex items-center gap-1 italic">
                        <i className="bi bi-geo-alt-fill text-orange-600"></i> {dados.endereco}
                      </p>
                    )}
                  </div>

                  <button 
                    disabled={carrinho.length === 0 || !dados.cep}
                    onClick={() => setEtapaCheckout('metodo')}
                    className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-orange-600 disabled:opacity-20 transition-all shadow-xl shadow-black/10"
                  >
                    Prosseguir Pagamento
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 2: MÉTODOS DE PAGAMENTO */}
            {etapaCheckout === 'metodo' && (
              <div className="flex-grow space-y-4">
                <button 
                  onClick={() => { setMetodoSelecionado('mp'); setEtapaCheckout('dados'); }}
                  className="w-full p-8 border-2 border-gray-100 rounded-3xl flex justify-between items-center hover:border-black hover:bg-gray-50 transition-all group"
                >
                  <div className="text-left">
                    <p className="font-black uppercase text-sm tracking-tight">Cartão ou PIX</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-1">PROCESSADO POR MERCADO PAGO</p>
                  </div>
                  <i className="bi bi-lightning-charge-fill text-2xl text-gray-400 group-hover:scale-125 transition-transform"></i>
                </button>

                <button 
                  onClick={() => { setMetodoSelecionado('cripto'); setEtapaCheckout('dados'); }}
                  className="w-full p-8 border-2 border-gray-100 rounded-3xl flex justify-between items-center hover:border-black hover:bg-gray-50 transition-all group"
                >
                  <div className="text-left">
                    <p className="font-black uppercase text-sm tracking-tight">Pagar com Cripto</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-1">REDE POLYGON (POL)</p>
                  </div>
                  <i className="bi bi-hexagon-fill text-2xl text-gray-400 group-hover:scale-125 transition-transform"></i>
                </button>

                <button onClick={() => setEtapaCheckout('sacola')} className="w-full py-4 text-[10px] font-black uppercase text-gray-300 hover:text-black transition-colors">Voltar para a Sacola</button>
              </div>
            )}

{/* ETAPA 3: DADOS DE ENVIO E FINALIZAÇÃO */}
{etapaCheckout === 'dados' && (
  <div className="flex-grow flex flex-col">
    {/* Área de Inputs com Rolagem interna para não quebrar o layout no mobile */}
    <div className="space-y-4 mb-6 overflow-y-auto pr-2 max-h-[55vh]">
      
      {/* Campos Pessoais */}
      <div className="grid grid-cols-1 gap-4">
        <input 
          type="text" 
          placeholder="NOME COMPLETO"
          className="w-full bg-gray-50 rounded-xl p-4 text-xs font-bold outline-none border-2 border-transparent focus:border-black transition-all"
          value={dados.nome} 
          onChange={e => setDados({...dados, nome: e.target.value})}
        />
        <input 
          type="email" 
          placeholder="SEU MELHOR E-MAIL"
          className="w-full bg-gray-50 rounded-xl p-4 text-xs font-bold outline-none border-2 border-transparent focus:border-black transition-all"
          value={dados.email} 
          onChange={e => setDados({...dados, email: e.target.value})}
        />
        
        {/* CPF só aparece se o método for Mercado Pago */}
        {metodoSelecionado === 'mp' && (
          <input 
            type="text" 
            placeholder="CPF (PARA NOTA FISCAL)"
            className="w-full bg-gray-50 rounded-xl p-4 text-xs font-bold outline-none border-2 border-transparent focus:border-black transition-all"
            value={dados.cpf} 
            onChange={e => setDados({...dados, cpf: e.target.value})}
          />
        )}
        
        <input 
          type="text" 
          placeholder="COMPLEMENTO / NÚMERO" 
          className="w-full bg-gray-50 rounded-xl p-4 text-xs font-bold outline-none border-2 border-transparent focus:border-black transition-all" 
          value={dados.complemento} 
          onChange={e => setDados({...dados, complemento: e.target.value})}
        />
      </div>

      {/* BLOCO WEB3 - RECOMPENSA DIGITAL */}
      <div className="mt-4 border-[3px] border-black p-5 bg-orange-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-2 mb-2">
          <i className="bi bi-cpu-fill text-orange-600"></i>
          <h3 className="font-black uppercase italic tracking-tighter text-sm">RECOMPENSA DIGITAL</h3>
        </div>

        <p className="text-[9px] font-bold text-gray-600 uppercase leading-tight mb-4 italic">
          Ganhe 5% de desconto vitalício e acesso à nova plataforma.
        </p>

        <input 
          type="text"
          placeholder="ENDEREÇO DA CARTEIRA (0x...)"
          value={dados.carteira_blockchain}
          onChange={(e) => setDados({...dados, carteira_blockchain: e.target.value})}
          className={`w-full border-2 p-3 font-mono text-[10px] outline-none transition-all uppercase ${
            dados.carteira_blockchain && !/^0x[a-fA-F0-9]{40}$/.test(dados.carteira_blockchain)
            ? 'border-red-500 bg-red-50 text-red-600'
            : 'border-black bg-white focus:ring-2 focus:ring-orange-500'
          }`}
        />
        
        {/* Validação Visual de erro na carteira */}
        {dados.carteira_blockchain && !/^0x[a-fA-F0-9]{40}$/.test(dados.carteira_blockchain) && (
          <p className="text-[8px] font-black text-red-500 mt-1 uppercase italic animate-pulse">
            Endereço Inválido! Verifique o código '0x'.
          </p>
        )}

        <div className="mt-4">
          <a href="/faq-web3" target="_blank" className="text-[8px] font-black uppercase underline hover:text-orange-600 italic">
            <i className="bi bi-question-circle"></i> O que é isso? Tira-Dúvidas
          </a>
        </div>
      </div>
    </div>

    {/* RESUMO DE VALORES E BOTÕES FINAIS */}
    <div className="mt-auto pt-6 border-t border-dashed border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase italic">Total do Pedido</p>
          <p className="text-3xl font-black italic tracking-tighter">
            R$ {totalGeral.toFixed(2)}
          </p>
        </div>
        {frete === 0 && (
          <span className="bg-green-100 text-green-600 text-[9px] font-black px-3 py-1 rounded-full uppercase">
            Frete Grátis
          </span>
        )}
      </div>

      {/* Condicional de Botão baseado no Método de Pagamento */}
      {metodoSelecionado === 'mp' ? (
        <button 
          onClick={processarPedidoFinal} 
          disabled={loading || !dados.nome || !dados.email} 
          className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-orange-600 transition-all flex items-center justify-center gap-3 disabled:opacity-30"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            'Finalizar e Pagar'
          )}
        </button>
      ) : (
        <BotaoPagamentoWeb3 
          total={totalGeral} 
          dadosCliente={dados} 
          onBeforeClick={processarPedidoFinal}
        />
      )}
      
      <button 
        onClick={() => setEtapaCheckout('metodo')} 
        className="w-full py-4 text-[10px] font-black uppercase text-gray-300 hover:text-black transition-colors"
      >
        Trocar Método de Pagamento
      </button>
    </div>
</div>
          )} {/* <--- CONFIRA SE ESTA CHAVE E PARÊNTESE ESTÃO AQUI */}

          </div> {/* Fecha o Painel Lateral */}
        </div> {/* Fecha o Backdrop/Overlay */}
      )} {/* Fecha o {modalAberto && (...)} */}

    </div> // Fecha a Div Principal do componente (Ex: <div className="min-h-screen...">)
  ); // Fecha o return
} // Fecha a função do componente

      {/* 7. FOOTER */}
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
                <Link href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-instagram"></i></Link>
                <Link href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-facebook"></i></Link>
                <Link href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-youtube"></i></Link>
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
                <Link href="https://maps.app.goo.gl/oGCHp5i9y8HnPutg9" target="_blank" className="flex items-start justify-center md:justify-start gap-3 group">
                  <i className="bi bi-geo-alt text-orange-600 text-lg mt-0.5"></i>        
                  <p className="text-sm text-gray-600 leading-relaxed text-left">
                    Quadra 4 Lote 26 Condomínio Flores do Cerrado II<br />
                    Recreio Mossoró - Cidade Ocidental-GO</p>
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
            <Link href="https://sjrpovoas.vercel.app" target="_blank" className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300 hover:text-orange-600 transition-all">Desenvolvido por SjrPovoaS</Link>
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
