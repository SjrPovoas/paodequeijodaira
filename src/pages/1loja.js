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

  // --- ESTADOS DE INTERFACE E DADOS ---
  const [carrinho, setCarrinho] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState({ nome: '', email: '', cpf: '', cep: '', endereco: '' });
  const [frete, setFrete] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // --- CÁLCULOS ---
  const subtotal = Array.isArray(carrinho)
    ? carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0)
    : 0;
  const totalGeral = subtotal + frete;

  // --- 1. PERSISTÊNCIA E HIDRATAÇÃO ---
  useEffect(() => {
    const salvo = localStorage.getItem('carrinho_ira');
    if (salvo) {
      try {
        const parsed = JSON.parse(salvo);
        if (Array.isArray(parsed)) setCarrinho(parsed);
      } catch (e) {
        console.error("Erro no cache", e);
      }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('carrinho_ira', JSON.stringify(carrinho));
    }
  }, [carrinho, isMounted]);

  // --- 2. MONITORAR SCROLL ---
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- 3. LÓGICA DE FRETE (ViaCEP) ---
  useEffect(() => {
    if (subtotal === 0 || subtotal >= VALOR_FRETE_GRATIS) {
      setFrete(0);
      return;
    }
    if (dados.cep.length === 8) {
      const regiao = dados.cep.substring(0, 2);
      // Exemplo: DF e arredores frete fixo menor
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

  // --- 4. GESTÃO DO CARRINHO ---
  const add = (p, tamanhoSelecionado = null) => {
    if (p.category === 'vestuario' && !tamanhoSelecionado) {
      alert('⚠️ Selecione um tamanho (P, M, G ou GG)');
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

  const remover = (index) => {
    const novo = [...carrinho];
    novo.splice(index, 1);
    setCarrinho(novo);
  };

  // --- 5. CHECKOUT MERCADO PAGO ---
  const iniciarCheckoutMP = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const cpfLimpo = dados.cpf.replace(/\D/g, '');

    if (!dados.nome || dados.nome.trim().split(' ').length < 2) return alert("Nome Completo obrigatório.");
    if (cpfLimpo.length !== 11) return alert("CPF Inválido.");
    if (carrinho.length === 0) return alert("Carrinho vazio.");

    setLoading(true);

    try {
      // Salva Pedido no Supabase
      const { data: pedido, error: errSupa } = await supabase
        .from('pedidos')
        .insert([{
          cliente_nome: dados.nome,
          cliente_email: dados.email.toLowerCase().trim(),
          cliente_cpf: cpfLimpo,
          cliente_cep: dados.cep,
          endereco_entrega: dados.endereco,
          valor_total: totalGeral,
          itens: carrinho,
          status: 'Aguardando Pagamento',
          metodo: 'Mercado Pago'
        }])
        .select().single();

      if (errSupa) throw errSupa;

      // Chama API de Checkout
      const res = await fetch('/api/checkout-mp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itens: carrinho, frete, pedidoId: pedido.id, email: dados.email })
      });

      const { init_point } = await res.json();
      if (init_point) window.location.href = init_point;

    } catch (err) {
      alert("Erro ao processar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const produtos = [
    { id: 1, nome: 'T-Shirt Logo Irá (Masc)', preco: 110, img: '/imagens/camiseta1.png', category: 'vestuario' },
    { id: 2, nome: 'T-Shirt Logo Irá (Fem)', preco: 110, img: '/imagens/camiseta2.png', category: 'vestuario' },
    { id: 3, nome: 'Avental de Lona Irá', preco: 85, img: '/imagens/avental.png', category: 'acessorios' },
    { id: 4, nome: 'Caneca Cerâmica Fosca', preco: 42, img: '/imagens/caneca.png', category: 'acessorios' },
  ];

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Head>
        <title>Loja Lifestyle | Pão de Queijo da Irá</title>
        <meta name="description" content="Acessórios e vestuário exclusivos do ecossistema Pão de Queijo da Irá." />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
      </Head>

      {/* ANÚNCIO */}
      <div className="bg-orange-600 text-white py-2 text-center text-[10px] font-black uppercase tracking-widest sticky top-0 z-[110]">
        • Frete Grátis acima de R$ 500,00 • Entrega em todo Brasil •
      </div>

      {/* HEADER */}
      <header className="border-b border-gray-100 py-4 px-6 sticky top-[28px] bg-white/95 backdrop-blur-md z-[100]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/"><img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 cursor-pointer" /></Link>

          <nav className="hidden md:flex space-x-6 text-[10px] font-bold uppercase tracking-widest items-center">
            <Link href="/pedidos" className="hover:text-orange-600 flex items-center gap-2">RASTREAR <i className="bi bi-box-seam"></i></Link>
            <ConnectButton />
            <button onClick={() => setModalAberto(true)} className="bg-black text-white px-6 py-2.5 rounded-full flex items-center gap-3">
              CARRINHO <span className="bg-orange-600 px-2 rounded-full">{carrinho.length}</span>
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setModalAberto(true)} className="relative"><i className="bi bi-bag text-2xl"></i></button>
            <button onClick={() => setMenuMobileAberto(true)}><i className="bi bi-list text-3xl"></i></button>
          </div>
        </div>
      </header>

      {/* LISTAGEM DE PRODUTOS */}
      <main className="max-w-6xl mx-auto py-20 px-6">
        <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-16 leading-none">
          LIFESTYLE <br /><span className="text-orange-600">& ACESSÓRIOS</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {produtos.map(p => (
            <div key={p.id} className="group border-b border-gray-100 pb-10">
              <div className="aspect-square bg-gray-50 mb-6 overflow-hidden">
                <img src={p.img} alt={p.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="font-black uppercase text-lg mb-2">{p.nome}</h3>
              <p className="text-orange-600 font-black text-xl mb-6">R$ {p.preco.toFixed(2)}</p>
              
              {p.category === 'vestuario' ? (
                <div className="flex gap-2">
                  {['P', 'M', 'G', 'GG'].map(s => (
                    <button key={s} onClick={() => add(p, s)} className="w-12 h-12 border-2 border-black font-black hover:bg-black hover:text-white transition-all">{s}</button>
                  ))}
                </div>
              ) : (
                <button onClick={() => add(p)} className="w-full py-4 border-2 border-black font-black uppercase text-xs hover:bg-black hover:text-white">Adicionar</button>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* SEÇÃO WEB3 */}
      <section id="web3" className="bg-[#1a1a1a] text-white py-24 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic leading-none mb-6">
              IRÁ Digital <br /><span className="text-orange-600">Genesis Pass</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-md uppercase text-xs font-bold tracking-widest leading-loose">
              O passe exclusivo para o ecossistema Web3. Membros possuem descontos vitalícios, acesso a drops limitados e governança no Pão de Queijo da Irá.
            </p>
            <a href={LINK_LISTA_ESPERA} target="_blank" className="inline-block bg-white text-black px-10 py-4 font-black uppercase text-xs tracking-[0.2em] hover:bg-orange-600 hover:text-white transition-all">Entrar na Lista de Espera</a>
          </div>
          <div className="relative">
             <div className="aspect-square border-2 border-orange-600/30 rounded-full animate-spin-slow absolute inset-0"></div>
             <img src="/imagens/genesis-pass.png" alt="Genesis Pass" className="relative z-10 w-full animate-float" />
          </div>
        </div>
      </section>

      {/* MODAL CARRINHO / CHECKOUT */}
      {modalAberto && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalAberto(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 overflow-y-auto">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black uppercase italic">Seu Carrinho</h2>
              <button onClick={() => setModalAberto(false)} className="text-2xl"><i className="bi bi-x-lg"></i></button>
            </div>

            {carrinho.length === 0 ? (
              <p className="text-center py-20 font-bold uppercase text-gray-400 text-xs tracking-widest">Carrinho vazio</p>
            ) : (
              <div className="space-y-8">
                {carrinho.map((item, i) => (
                  <div key={i} className="flex gap-4 border-b border-gray-50 pb-4">
                    <img src={item.img} className="w-20 h-20 object-cover" alt="" />
                    <div className="flex-1">
                      <h4 className="font-black uppercase text-[10px]">{item.nome} {item.tamanho && `(${item.tamanho})`}</h4>
                      <p className="text-orange-600 font-bold">1x R$ {item.preco}</p>
                      <button onClick={() => remover(i)} className="text-[9px] font-black uppercase text-red-500 mt-2">Remover</button>
                    </div>
                  </div>
                ))}

                <div className="bg-gray-50 p-6 space-y-4">
                  <input type="text" placeholder="NOME COMPLETO" className="w-full p-3 border-b border-gray-200 bg-transparent text-xs font-bold" value={dados.nome} onChange={e => setDados({...dados, nome: e.target.value})} />
                  <input type="email" placeholder="E-MAIL" className="w-full p-3 border-b border-gray-200 bg-transparent text-xs font-bold" value={dados.email} onChange={e => setDados({...dados, email: e.target.value})} />
                  <input type="text" placeholder="CEP" className="w-full p-3 border-b border-gray-200 bg-transparent text-xs font-bold" value={dados.cep} onChange={e => handleCEP(e.target.value)} />
                  <textarea placeholder="ENDEREÇO COMPLETO" className="w-full p-3 border-b border-gray-200 bg-transparent text-xs font-bold" value={dados.endereco} onChange={e => setDados({...dados, endereco: e.target.value})} />
                </div>

                <div className="pt-6 border-t-4 border-black">
                  <div className="flex justify-between font-black uppercase text-xs mb-2"><span>Subtotal</span><span>R$ {subtotal}</span></div>
                  <div className="flex justify-between font-black uppercase text-xs mb-2"><span>Frete</span><span>{frete === 0 ? 'GRÁTIS' : `R$ ${frete}`}</span></div>
                  <div className="flex justify-between font-black uppercase text-2xl mt-4 text-orange-600"><span>Total</span><span>R$ {totalGeral}</span></div>
                  
                  <button onClick={iniciarCheckoutMP} disabled={loading} className="w-full bg-black text-white py-5 mt-8 font-black uppercase text-xs tracking-widest hover:bg-orange-600 transition-all">
                    {loading ? 'Processando...' : 'Finalizar com Mercado Pago'}
                  </button>
                  <div className="mt-4">
                     <BotaoPagamentoWeb3 total={totalGeral} carrinho={carrinho} dadosCliente={dados} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-20 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-1">
            <img src="/logo-paodequeijodaira.jpg" className="h-20 mb-6" alt="Logo" />
            <div className="flex gap-4 text-2xl">
               <a href="#"><i className="bi bi-instagram"></i></a>
               <a href="#"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
          <div>
            <h4 className="font-black uppercase text-[10px] tracking-widest mb-6 text-orange-600">Suporte</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase">
              <li><Link href="/pedidos">Rastrear Pedido</Link></li>
              <li><Link href="/suporte">Trocas e Devoluções</Link></li>
            </ul>
          </div>
          <div className="col-span-2 text-right md:text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© 2026 Pão de Queijo da Irá. Desenvolvido por SjrPovoaS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
  }
