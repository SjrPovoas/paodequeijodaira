import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import FormularioTroca from '../components/FormularioTroca';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [pedidoParaTrocar, setPedidoParaTrocar] = useState(null);

  // Estados de Interface
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Lógica de Scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Carregamento de Dados
  useEffect(() => {
    async function carregarDados() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data, error } = await supabase
          .from('pedidos')
          .select('*')
          .or(`cliente_email.eq.${user.email},wallet_address.eq.${user.user_metadata?.wallet || 'none'}`)
          .order('created_at', { ascending: false });

        if (!error) setPedidos(data);
      }
      setLoading(false);
    }
    carregarDados();
  }, []);

  const handleLogin = () => {
    // Redirecione para sua página de login ou abra o modal de auth
    window.location.href = '/login';
  };

  const StatusBadge = ({ status }) => {
    const estilos = {
      'Preparando': 'bg-blue-100 text-blue-700',
      'Saiu para Entrega': 'bg-orange-100 text-orange-700',
      'Entregue': 'bg-green-100 text-green-700',
      'Cancelado': 'bg-red-100 text-red-700',
      'Em Análise de Troca': 'bg-purple-100 text-purple-700'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-wider ${estilos[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-[#2D3134] antialiased font-sans overflow-x-hidden flex flex-col">
      <Head>
        <title>Meus Pedidos | Loja Lifestyle do Pão de Queijo da Irá</title>
        <meta name="robots" content="noindex" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lobster&display=swap" rel="stylesheet" />
      </Head>

      {/* HEADER */}
      <header className="border-b border-gray-100 py-4 px-6 sticky top-0 bg-white/95 backdrop-blur-md z-[100]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto cursor-pointer" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 text-[10px] font-bold uppercase tracking-widest items-center">
            <Link href="/" className="hover:text-orange-600 transition-colors">Comprar Pão de Queijo da Irá</Link>
            <Link href="/loja" className="text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all uppercase">LOJA LIFESTYLE</Link>
            <Link href="/" className="bg-orange-600 text-white px-8 py-4 font-black uppercase tracking-widest text-xs shadow-lg uppercase">Ir para Home</Link>
          </nav>

          {/* Botão Mobile - Z-index alto para ficar acima do menu */}
          <button onClick={toggleMenu} className="lg:hidden text-3xl text-orange-600 z-[130] relative focus:outline-none">
            <i className={isMenuOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
          </button>
        </div>

        {/* MENU MOBILE CORRIGIDO */}
        <div className={`fixed inset-0 z-[120] bg-white h-screen w-screen transition-transform duration-500 ease-in-out lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col h-full items-center justify-center space-y-8 px-10 text-center">
            <Link href="/loja" onClick={toggleMenu} className="text-xl font-black uppercase tracking-[0.2em] italic hover:text-orange-600">
              LOJA LIFESTYLE
            </Link>
            <Link href="/" onClick={toggleMenu} className="text-xl font-black uppercase tracking-[0.2em] italic text-orange-600">
              COMPRAR PÃO DE QUEIJO
            </Link>

            <div className="w-12 h-1 bg-gray-100"></div>

            {/* REDES SOCIAIS NO MENU MOBILE */}
            <div className="flex justify-center items-center gap-8">
              <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-3xl hover:text-orange-600"><i className="bi bi-instagram"></i></a>
              <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-3xl hover:text-orange-600"><i className="bi bi-facebook"></i></a>
              <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-3xl hover:text-orange-600"><i className="bi bi-youtube"></i></a>
            </div>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="flex-grow py-20 px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic leading-none text-black">
          Meus <span className="text-orange-600">Pedidos</span>
        </h1>
        <p className="text-gray-500 mb-12 uppercase text-[10px] tracking-[0.2em] font-bold">Acompanhe suas compras e histórico de pedidos.</p>

        {!user ? (
          <div className="bg-white p-12 rounded-[40px] text-center shadow-xl border border-gray-100">
            <div className="text-5xl mb-6">🔐</div>
            <p className="text-gray-600 mb-8 font-medium">Você precisa estar logado para ver seu histórico.</p>
            <button
              onClick={handleLogin}
              className="bg-black text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-orange-600 transition-colors shadow-lg"
            >
              Fazer Login agora
            </button>
          </div>
        ) : pedidos.length === 0 ? (
          <div className="bg-white p-12 rounded-[40px] text-center shadow-sm border border-dashed border-gray-200">
            <p className="text-gray-400 italic">Nenhum pedido encontrado no seu e-mail.</p>
          </div>
        ) : (
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
                    <h3 className="font-black text-xl uppercase italic mb-1">{pedido.resumo_itens || 'Produtos da Loja'}</h3>
                    <p className="text-orange-600 font-black text-2xl tracking-tighter">R$ {pedido.total.toFixed(2)}</p>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto">
                    {pedido.status === 'Entregue' && (
                      <button
                        onClick={() => setPedidoParaTrocar(pedido)}
                        className="flex-1 md:flex-none bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-600 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                      >
                        Trocar
                      </button>
                    )}
                    <button className="flex-1 md:flex-none border-2 border-gray-100 hover:border-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                      Detalhes
                    </button>
                  </div>
                </div>

                {pedido.tx_hash && (
                  <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[9px] text-gray-400 font-mono tracking-tighter">BLOCKCHAIN: {pedido.tx_hash.slice(0, 24)}...</span>
                    <a
                      href={`https://polygonscan.com/tx/${pedido.tx_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] text-purple-600 font-black uppercase tracking-widest hover:text-black transition-colors"
                    >
                      Ver Recibo ↗
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal de Troca */}
      {pedidoParaTrocar && (
        <FormularioTroca
          pedido={pedidoParaTrocar}
          onFechar={() => setPedidoParaTrocar(null)}
        />
      )}

      {/* FOOTER */}
      <footer footer className="py-20 px-6 bg-white border-t border-gray-100" >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="flex flex-col items-center md:items-start">
              <a href="/"><img src="/logo-paodequeijodaira.jpg" className="h-20 mb-6" alt="Logo" /></a>
              <div className="flex space-x-2">
                <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-instagram"></i></a>
                <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-facebook"></i></a>
                <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-youtube"></i></a>
                <a href="https://maps.app.goo.gl/oGCHp5i9y8HnPutg9" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-geo-alt-fill"></i></a>
              </div>
            </div>
            <div className="text-center md:text-left space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Funcionamento & Retirada</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>Horário:</strong> Seg a Sáb das 08:00 às 18:00.<br />Dom das 08:00 às 12:00.</p>
              <p className="text-sm text-gray-600">
                <strong>Endereço:</strong> Quadra 4 Lote 26 Condomínio Flores do Cerrado II<br />Recreio Mossoró - Cidade Ocidental-GO</p>
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-lg font-black uppercase tracking-tighter mb-2 italic">Pão de Queijo da Irá</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© 2026 - Todos os direitos reservados.</p>
              <div className="mt-4 flex justify-center md:justify-end gap-4 text-[10px] font-black text-gray-400 uppercase">
                <a href="/termos" className="hover:text-black">Termos de Uso</a>
                <span>|</span>
                <a href="/privacidade" className="hover:text-black">Privacidade</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-50 text-center">
            <a href="https://sjrpovoas.vercel.app" target="_blank" className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300 hover:text-orange-600 transition-all">Desenvolvido por SjrPovoaS</a>
          </div>
        </div>
      </footer >

      {/* BOTÃO VOLTAR AO TOPO */}
      < button onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[90] bg-orange-600 text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:bg-black hover:scale-110 active:scale-90 ${showScrollTop ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-10 invisible'}`} >
        <i className="bi bi-arrow-up text-xl font-bold"></i>
      </button>
    </div>
  );
}