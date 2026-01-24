"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';
import FormularioTroca from '../components/FormularioTroca';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emailBusca, setEmailBusca] = useState('');
  const [cpfBusca, setCpfBusca] = useState('');
  const [buscou, setBuscou] = useState(false);
  const [pedidoParaTrocar, setPedidoParaTrocar] = useState(null);

  // ESTADOS DE INTERFACE
  const [menuMobileAberto, setMenuMobileAberto] = useState(false); // CORRIGIDO: Nome do estado sincronizado com o clique
  const [showScrollTop, setShowScrollTop] = useState(false);

  const WHATSAPP_NUMBER = "5561982777196";

  // Lógica de Scroll para o botão "Voltar ao Topo"
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // LÓGICA DE BUSCA: Filtra pedidos por Email e CPF (Sem exigir login formal)
  async function buscarPedidos(e) {
    if (e) e.preventDefault();
    setLoading(true);

    const cpfLimpo = cpfBusca.replace(/\D/g, '');

    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .eq('email', emailBusca.toLowerCase().trim())
      .eq('cpf', cpfLimpo)
      .order('created_at', { ascending: false });

    if (!error) {
      setPedidos(data);
      setBuscou(true);
    } else {
      alert("Erro ao buscar pedidos. Verifique os dados.");
    }
    setLoading(false);
  }

  // Componente de Badge para Status do Pedido
  const StatusBadge = ({ status }) => {
    const estilos = {
      'pendente': 'bg-yellow-100 text-yellow-700',
      'pago': 'bg-green-100 text-green-700',
      'enviado': 'bg-blue-100 text-blue-700',
      'Entregue': 'bg-green-100 text-green-700',
      'Cancelado': 'bg-red-100 text-red-700'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-wider ${estilos[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-[#2D3134] antialiased font-sans flex flex-col overflow-x-hidden">
      <Head>
        <title>Rastrear Pedidos | Loja Lifestyle e Acessórios do Pão de Queijo da Irá</title>
        <link rel="canonical" href="https://paodequeijodaira.vercel.app/pedidos" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
      </Head>

      {/* BARRA DE ANÚNCIO TOPO - Fixa com z-index alto */}
      <div className="bg-orange-600 text-white py-2 text-center text-[10px] font-black uppercase tracking-widest sticky top-0 z-[120]">
        • Entrega em todo Brasil • Frete Grátis acima de R$ 500,00 •
      </div>

      {/* HEADER - Ajustado top para acomodar a barra de anúncio e z-index */}
      <header className="border-b border-gray-100 py-4 px-6 sticky top-[30px] bg-white/95 backdrop-blur-md z-[110]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* LOGO */}
          <Link href="/">
            <img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto cursor-pointer" />
          </Link>

          {/* NAVEGAÇÃO DESKTOP */}
          <nav className="hidden md:flex space-x-6 text-[10px] font-bold uppercase tracking-widest items-center">
            <Link href="/pedidos" className="hover:text-orange-600 transition-colors flex items-center gap-2">
              MEUS PEDIDOS <i className="bi bi-box-seam text-lg"></i>
            </Link>
            <Link href="/suporte" className="hover:text-orange-600 transition-colors flex items-center gap-2">
              TROCAS & DEVOLUÇÕES <i className="bi bi-arrow-left-right text-lg"></i>
            </Link>
            <Link href="/loja" className="bg-orange-600 text-white px-6 py-3 font-black rounded-full hover:bg-black transition-all">
              LOJA LIFESTYLE
            </Link>
          </nav>

          {/* BOTÃO MENU MOBILE */}
          <div className="flex md:hidden items-center">
            <button onClick={() => setMenuMobileAberto(true)} className="text-orange-600 p-2">
              <i className="bi bi-list text-3xl"></i>
            </button>
          </div>
        </div>

        {/* ESTRUTURA MENU MOBILE (BARRA LATERAL) */}
        <div className={`fixed inset-0 z-[1000] transition-all duration-500 ${menuMobileAberto ? 'visible' : 'invisible'}`}>
          {/* Overlay Escuro com blur */}
          <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${menuMobileAberto ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setMenuMobileAberto(false)}></div>

          {/* Painel Lateral que desliza */}
          <nav className={`absolute top-0 right-0 w-[100%] h-screen bg-white transition-transform duration-500 ease-in-out shadow-2xl flex flex-col z-[1001] ${menuMobileAberto ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-end p-6">
              <button onClick={() => setMenuMobileAberto(false)} className="text-3xl text-orange-600">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center space-y-8 text-center px-10">
              <Link href="#web3" onClick={() => setMenuMobileAberto(false)} className="text-sm font-black uppercase tracking-[0.2em] hover:text-orange-600">IRÁ DIGITAL GENESIS PASS</Link>
              <Link href="/" onClick={() => setMenuMobileAberto(false)} className="text-sm font-black uppercase tracking-[0.2em] text-orange-600 hover:text-black">COMPRAR PÃO DE QUEIJO</Link>
              <Link href="/loja" onClick={() => setMenuMobileAberto(false)} className="text-2xl font-black uppercase italic tracking-tighter border-b-4 border-orange-600 pb-1">LOJA LIFESTYLE</Link>

              <div className="w-full h-px bg-gray-100 my-4"></div>

              {/* LINKS ADICIONAIS MOBILE */}
              <div className="flex flex-col space-y-6">
                <Link href="/pedidos" onClick={() => setMenuMobileAberto(false)} className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:text-orange-600">
                  <i className="bi bi-box-seam text-xl"></i> Rastrear Pedido
                </Link>
                <Link href="/suporte" onClick={() => setMenuMobileAberto(false)} className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:text-orange-600">
                  <i className="bi bi-arrow-left-right text-xl"></i> Trocas & Devoluções
                </Link>
              </div>

              {/* REDES SOCIAIS MOBILE */}
              <div className="flex justify-center items-center gap-8 pt-8">
                <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-3xl text-gray-800 hover:text-orange-600 transition-colors"><i className="bi bi-instagram"></i></a>
                <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-3xl text-gray-800 hover:text-orange-600 transition-colors"><i className="bi bi-facebook"></i></a>
                <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-3xl text-gray-800 hover:text-orange-600 transition-colors"><i className="bi bi-youtube"></i></a>
              </div>
            </div>

            <div className="p-8 text-center border-t border-gray-50 bg-gray-50/50">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© Pão de Queijo da Irá</p>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow py-20 px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic leading-none text-black">
          Meus <span className="text-orange-600">Pedidos</span>
        </h1>

        {/* FORMULÁRIO DE CONSULTA */}
        <section className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 mb-12">
          <form onSubmit={buscarPedidos} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">E-mail da compra</label>
              <input
                type="email"
                required
                className="w-full border-b-2 border-gray-100 py-2 outline-none focus:border-orange-600 transition-colors bg-transparent"
                value={emailBusca}
                onChange={e => setEmailBusca(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">CPF</label>
              <input
                type="text"
                required
                className="w-full border-b-2 border-gray-100 py-2 outline-none focus:border-orange-600 transition-colors bg-transparent"
                value={cpfBusca}
                onChange={e => setCpfBusca(e.target.value)}
              />
            </div>
            <button className="bg-black text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-orange-600 transition-all shadow-lg active:scale-95">
              {loading ? 'Buscando...' : 'Consultar'}
            </button>
          </form>
        </section>

        {/* MENSAGEM DE RESULTADO VAZIO */}
        {buscou && pedidos.length === 0 && (
          <div className="text-center py-10 bg-white rounded-[32px] border border-dashed border-gray-200">
            <p className="text-gray-400 italic">Nenhum pedido encontrado para estes dados.</p>
          </div>
        )}

        {/* LISTAGEM DE PEDIDOS ENCONTRADOS */}
        <div className="grid gap-6">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 hover:border-orange-200 transition-all group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Protocolo: {pedido.id.slice(0, 8)}</span>
                  <p className="text-sm font-bold text-gray-500">
                    {new Date(pedido.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <StatusBadge status={pedido.status} />
              </div>

              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="w-full">
                  <h3 className="font-black text-xl uppercase italic mb-1">
                    {pedido.itens?.[0]?.nome || 'Pedido Lifestyle'}
                  </h3>
                  <p className="text-orange-600 font-black text-2xl tracking-tighter">R$ {Number(pedido.total_geral).toFixed(2)}</p>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                  <button
                    onClick={() => setPedidoParaTrocar(pedido)}
                    className="flex-1 md:flex-none bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-600 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    Trocar
                  </button>
                  <button className="flex-1 md:flex-none border-2 border-gray-100 hover:border-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                    Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL DE TROCA - Acionado pelo botão acima */}
      {pedidoParaTrocar && (
        <FormularioTroca
          pedido={pedidoParaTrocar}
          onFechar={() => setPedidoParaTrocar(null)}
        />
      )}

      {/* FOOTER - Mantido integralmente conforme solicitado */}
      <footer className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

            {/* COLUNA 1: LOGO E REDES SOCIAIS */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <Link href="/">
                <img src="/logo-paodequeijodaira.jpg" className="h-20 cursor-pointer" alt="Logo" />
              </Link>
              <div className="flex gap-6 justify-center md:justify-start">
                <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-instagram"></i></a>
                <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-facebook"></i></a>
                <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-youtube"></i></a>
              </div>
            </div>

            {/* COLUNA 2: AJUDA & SUPORTE */}
            <div className="text-center md:text-left space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Ajuda & Suporte</h4>
              <div className="space-y-4">
                <Link href="/pedidos" className="flex items-center justify-center md:justify-start gap-3 group">
                  <i className="bi bi-box-seam text-orange-600 text-lg"></i>
                  <p className="text-sm tracking-widest group-hover:text-orange-600 transition-colors leading-tight pt-1">Rastrear Pedido</p>
                </Link>
                <Link href="/suporte" className="flex items-center justify-center md:justify-start gap-3 group">
                  <i className="bi bi-arrow-left-right text-orange-600 text-lg"></i>
                  <p className="text-sm tracking-widest group-hover:text-orange-600 transition-colors leading-tight pt-1">Trocas e Devoluções</p>
                </Link>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="flex items-center justify-center md:justify-start gap-3 group">
                  <i className="bi bi-whatsapp text-orange-600 text-lg"></i>
                  <p className="text-sm tracking-widest group-hover:text-orange-600 transition-colors leading-tight pt-1">Fale Conosco</p>
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
              <div className="flex items-start justify-center md:justify-start gap-3 pt-2">
                <a href="https://maps.app.goo.gl/oGCHp5i9y8HnPutg9" target="_blank" className="text-2xl hover:text-orange-600">
                  <i className="bi bi-geo-alt text-orange-600 text-lg"></i>
                </a>
                <p className="text-sm text-gray-600 leading-relaxed">Quadra 4 Lote 26 Condomínio Flores do Cerrado II<br />Recreio Mossoró - Cidade Ocidental-GO</p>
              </div>
            </div>

            {/* COLUNA 4: INSTITUCIONAL & DIREITOS */}
            <div className="text-center md:text-right space-y-4 flex flex-col items-center md:items-end">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Institucional</h4>
              <div className="text-center md:text-right">
                <h3 className="text-lg font-black uppercase mb-2">Pão de Queijo da Irá</h3>
                <div className="mt-2 flex flex-col md:items-end gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <Link href="/termos" className="hover:text-black flex items-center justify-center md:justify-end gap-2">Termos de Uso <i className="bi bi-file-text"></i></Link>
                  <Link href="/privacidade" className="hover:text-black flex items-center justify-center md:justify-end gap-2">Privacidade <i className="bi bi-shield-check"></i></Link>
                </div>
                <p className="text-[10px] py-4 font-bold text-gray-300 uppercase tracking-widest">© 2026 - Todos os direitos reservados.</p>
              </div>
            </div>
          </div>

          {/* ASSINATURA */}
          <div className="pt-8 border-t border-gray-50 text-center">
            <a href="https://sjrpovoas.vercel.app" target="_blank" className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300 hover:text-orange-600 transition-all">Desenvolvido por SjrPovoaS</a>
          </div>
        </div>
      </footer>

      {/* BOTÃO VOLTAR AO TOPO */}
      <button 
        onClick={scrollToTop} 
        className={`fixed bottom-8 right-8 z-[130] bg-orange-600 text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:bg-black hover:scale-110 active:scale-90 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <i className="bi bi-arrow-up text-xl"></i>
      </button>

      {/* ESTILOS DE ANIMAÇÃO */}
      <style jsx global>
        {`@keyframes slide-left { from { transform: translateX(100%); } to { transform: translateX(0); } }
          .animate-slide-left { animation: slide-left 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
          html { scroll-behavior: smooth; }`}
      </style>

    </div>
  );
}