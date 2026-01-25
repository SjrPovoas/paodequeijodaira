import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function BaixarGuiaGratuito() {
  // ESTADOS DE INTERFACE
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // CONSTANTES DE CONFIGURAÇÃO
  const WHATSAPP_NUMBER = "5561982777196"; // Erro anterior: Variável não estava declarada nesta página
  const LINK_PDF_GUIA = "https://drive.google.com/file/d/1i7Du9UmYkx9UWbztc7U5HgRfqVn1RRkF/view?usp=drive_link";

  // Lógica de monitoramento de scroll
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="bg-white text-[#2D3134] antialiased font-['Inter'] min-h-screen overflow-x-hidden">
      <Head>
        <title>Obrigado! | Pão de Queijo da Irá</title>
        <meta name="robots" content="noindex" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lobster&display=swap" rel="stylesheet" />
      </Head>

      {/* HEADER FIXO NO TOPO */}
      <header className="border-b border-gray-100 py-4 px-6 sticky top-0 bg-white/95 backdrop-blur-md z-[110]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto cursor-pointer" />
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden lg:flex space-x-6 text-[10px] font-bold uppercase tracking-widest items-center">
            <Link href="/" className="hover:text-orange-600 transition-colors">Comprar Pão de Queijo</Link>
            <Link href="/loja" className="text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all uppercase">LOJA LIFESTYLE</Link>
            <Link href="/" className="bg-orange-600 text-white px-8 py-4 font-black uppercase tracking-widest text-xs shadow-lg">Ir para Home</Link>
          </nav>

          {/* Botão Mobile */}
          <button onClick={toggleMenu} className="lg:hidden text-3xl text-orange-600 z-[130] relative focus:outline-none">
            <i className={isMenuOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
          </button>
        </div>

        {/* MENU MOBILE */}
        <div className={`fixed inset-0 z-[120] bg-white h-screen w-screen transition-transform duration-500 ease-in-out lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col h-full items-center justify-center space-y-8 px-10 text-center">
            <Link href="/loja" onClick={toggleMenu} className="text-2xl font-black uppercase italic tracking-tighter border-b-4 border-orange-600 pb-1">
              LOJA LIFESTYLE
            </Link>
            <Link href="/" onClick={toggleMenu} className="text-xl font-black uppercase tracking-[0.2em] text-orange-600">
              COMPRAR PÃO DE QUEIJO
            </Link>

            <div className="w-12 h-px bg-gray-200"></div>

            <div className="flex gap-8">
              <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-3xl text-gray-800 hover:text-orange-600 transition-colors"><i className="bi bi-instagram"></i></a>
              <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-3xl text-gray-800 hover:text-orange-600 transition-colors"><i className="bi bi-facebook"></i></a>
              <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-3xl text-gray-800 hover:text-orange-600 transition-colors"><i className="bi bi-youtube"></i></a>
            </div>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL: Seção de Download */}
      <main className="min-h-[70vh] flex items-center justify-center py-20 px-6 bg-gray-50">
        <div className="max-w-2xl w-full bg-white p-8 md:p-16 rounded-[40px] shadow-2xl text-center border border-gray-100 relative overflow-hidden">
          <div className="absolute -top-2 -right-10 text-orange-600/5 text-9xl font-black rotate-12 select-none pointer-events-none">GUIA</div>
          
          <div className="bg-orange-100 text-orange-600 w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">
            <i className="bi bi-cloud-arrow-down-fill"></i>
          </div>

          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6 italic">
            Seu guia está <span className="text-orange-600">disponível!</span>
          </h1>
          
          <p className="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
            Obrigado por se inscrever! Preparamos esse conteúdo com muito carinho para deixar seus momentos com pão de queijo ainda mais saborosos.
          </p>
          
          <div className="flex flex-col gap-4 relative z-10">
            <a href={LINK_PDF_GUIA} target="_blank" rel="noopener noreferrer"
              className="bg-black hover:bg-orange-600 text-white px-10 py-6 font-black uppercase tracking-widest text-xs transition-all duration-500 shadow-2xl flex items-center justify-center gap-3 rounded-xl">
              <i className="bi bi-file-earmark-pdf-fill text-xl"></i> 
              Baixar Guia Gratuito
            </a>
            <Link href="/" className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-orange-600 transition-colors py-4">
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-16">

            {/* Coluna 1: Branding */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <Link href="/">
                <img src="/logo-paodequeijodaira.jpg" className="h-20 cursor-pointer" alt="Logo" />
              </Link>
              <div className="flex gap-2">
                <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-instagram"></i></a>
                <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-facebook"></i></a>
                <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-youtube"></i></a>
              </div>
            </div>

            {/* Coluna 2: Ajuda */}
            <div className="text-center md:text-left space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Ajuda & Suporte</h4>
              <div className="space-y-4">
                <Link href="/pedidos" className="flex items-center justify-center md:justify-start gap-2 group">
                  <i className="bi bi-box-seam text-orange-600 text-lg"></i>
                  <p className="text-xs font-bold uppercase tracking-widest group-hover:text-orange-600 transition-colors pt-1">Rastrear Pedido</p>
                </Link>
                <Link href="/suporte" className="flex items-center justify-center md:justify-start gap-2 group">
                  <i className="bi bi-arrow-left-right text-orange-600 text-lg"></i>
                  <p className="text-xs font-bold uppercase tracking-widest group-hover:text-orange-600 transition-colors pt-1">Trocas e Devoluções</p>
                </Link>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="flex items-center justify-center md:justify-start gap-3 group">
                  <i className="bi bi-whatsapp text-orange-600 text-lg"></i>
                  <p className="text-xs font-bold uppercase tracking-widest group-hover:text-orange-600 transition-colors pt-1">Fale Conosco</p>
                </a>
              </div>
            </div>

            {/* Coluna 3: Localização */}
            <div className="text-center md:text-left space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Funcionamento</h4>
              <div className="flex items-start justify-center md:justify-start gap-2">
                <i className="bi bi-clock text-orange-600 text-lg"></i>
                <p className="text-sm text-gray-600 leading-tight">Seg a Sáb: 08:00 às 18:00<br />Dom: 08:00 às 12:00</p>
              </div>
              <div className="flex items-start justify-center md:justify-start gap-2 pt-2">
                <i className="bi bi-geo-alt text-orange-600 text-lg"></i>
                <p className="text-sm text-gray-600 leading-relaxed">Quadra 4 Lote 26 Condomínio Flores do Cerrado II<br />Recreio Mossoró - Cidade Ocidental-GO</p>
              </div>
            </div>

 {/* Coluna 4: Institucional */}
 <div className="text-center md:text-right space-y-4 flex flex-col items-center md:items-end">
  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Institucional</h4>
  <h3 className="text-lg font-black uppercase mb-2 text-black italic tracking-tighter">Pão de Queijo da Irá</h3>
  <div className="mt-2 flex flex-wrap items-center justify-center md:justify-end gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
   <Link href="/termos" className="hover:text-black flex items-center gap-1 transition-colors group whitespace-nowrap">
      Termos de Uso <i className="bi bi-file-text group-hover:text-orange-600"></i>
    </Link>
    <span className="text-gray-200">|</span>
    <Link href="/privacidade" className="hover:text-black flex items-center gap-1 transition-colors group whitespace-nowrap">
      Privacidade <i className="bi bi-shield-check group-hover:text-orange-600"></i>
    </Link>
  </div>
  <p className="text-[10px] pt-4 font-bold text-gray-300 uppercase tracking-widest">© 2026 - Todos os direitos reservados.</p>
  </div>
      </footer>

      {/* Botão Voltar ao Topo */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[130] bg-orange-600 text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:bg-black hover:scale-110 active:scale-90 ${showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <i className="bi bi-arrow-up text-xl"></i>
      </button>
    </div>
  );
}
