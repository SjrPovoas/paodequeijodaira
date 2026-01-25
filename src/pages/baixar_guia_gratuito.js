import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function BaixarGuiaGratuito() { // Corrigido: Nome de componente React deve ser PascalCase
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // ESTADO INTERFACE: Controle de visibilidade da seta de voltar ao topo
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  // LINK DO PDF - Centralizado para fácil manutenção
  const LINK_PDF_GUIA = "https://drive.google.com/file/d/1i7Du9UmYkx9UWbztc7U5HgRfqVn1RRkF/view?usp=drive_link";

  return (
    <div className="bg-white text-[#2D3134] antialiased font-['Inter'] min-h-screen overflow-x-hidden">
      <Head>
        <title>Obrigado! | Pão de Queijo da Irá</title>
        <meta name="robots" content="noindex" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lobster&display=swap" rel="stylesheet" />
      </Head>

      {/* HEADER FIXO: Ajustado para consistência visual */}
      <header className="border-b border-gray-100 py-4 px-6 sticky top-0 bg-white/95 backdrop-blur-md z-[110]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto cursor-pointer" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 text-[10px] font-bold uppercase tracking-widest items-center">
            <Link href="/" className="hover:text-orange-600 transition-colors">Comprar Pão de Queijo da Irá</Link>
            <Link href="/loja" className="text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all uppercase">LOJA LIFESTYLE</Link>
            <Link href="/" className="bg-orange-600 text-white px-8 py-4 font-black uppercase tracking-widest text-xs shadow-lg transition-all hover:bg-black">Ir para Home</Link>
          </nav>

          {/* Botão Mobile */}
          <button onClick={toggleMenu} className="lg:hidden text-3xl text-orange-600 z-[130] focus:outline-none">
            <i className={isMenuOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
          </button>
        </div>

        {/* MENU MOBILE: Painel lateral consistente */}
        <div className={`fixed inset-0 z-[120] bg-white transition-transform duration-500 ease-in-out lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col h-full items-center justify-center space-y-8 px-10 text-center">
            <Link href="/loja" onClick={toggleMenu} className="text-2xl font-black uppercase tracking-[0.2em] italic hover:text-orange-600">
              LOJA LIFESTYLE
            </Link>
            <Link href="/" onClick={toggleMenu} className="text-2xl font-black uppercase tracking-[0.2em] italic text-orange-600">
              COMPRAR PÃO DE QUEIJO
            </Link>

            <div className="w-12 h-px bg-gray-200"></div>

            {/* REDES SOCIAIS MOBILE */}
            <div className="flex justify-center items-center gap-8">
              <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-3xl text-gray-800 hover:text-orange-600"><i className="bi bi-instagram"></i></a>
              <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-3xl text-gray-800 hover:text-orange-600"><i className="bi bi-facebook"></i></a>
              <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-3xl text-gray-800 hover:text-orange-600"><i className="bi bi-youtube"></i></a>
            </div>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL: Download Section */}
      <main className="min-h-[70vh] flex items-center justify-center py-20 px-6 bg-gray-50">
        <div className="max-w-2xl w-full bg-white p-8 md:p-16 rounded-[40px] shadow-2xl text-center border border-gray-100 relative overflow-hidden">
          {/* Elemento decorativo de fundo */}
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
            <a 
              href={LINK_PDF_GUIA} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black hover:bg-orange-600 text-white px-10 py-6 font-black uppercase tracking-widest text-xs transition-all duration-500 shadow-2xl flex items-center justify-center gap-3 group rounded-xl"
            >
              <i className="bi bi-file-earmark-pdf-fill text-xl group-hover:scale-125 transition-transform"></i> 
              Baixar Guia Gratuito
            </a>
            
            <a href="/" className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-orange-600 transition-colors py-4">
              Voltar para a página inicial
            </a>
          </div>
        </div>
      </main>

{/* COLUNA 4: INSTITUCIONAL & DIREITOS */}
<div className="text-center md:text-right space-y-4 flex flex-col items-center md:items-end">
  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Institucional</h4>
  <div className="text-center md:text-right">
    {/* Título em Laranja para manter o padrão visual */}
    <h3 className="text-lg font-black uppercase mb-2 text-orange-600 italic tracking-tighter">
      Pão de Queijo da Irá
    </h3>
    
    {/* Links em linha única com ícones e separador */}
    <div className="mt-2 flex items-center justify-center md:justify-end gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
      <Link href="/termos" className="hover:text-black flex items-center gap-1 transition-colors group">
        Termos de Uso <i className="bi bi-file-text text-[12px] group-hover:text-orange-600"></i>
      </Link>
      
      <span className="text-gray-200">|</span>
      
      <Link href="/privacidade" className="hover:text-black flex items-center gap-1 transition-colors group">
        Privacidade <i className="bi bi-shield-check text-[12px] group-hover:text-orange-600"></i>
      </Link>
    </div>
    
    <p className="text-[10px] py-4 font-bold text-gray-300 uppercase tracking-widest">
      © 2026 - Todos os direitos reservados.
    </p>
  </div>
</div>

      {/* BOTÃO VOLTAR AO TOPO: Com lógica de transição suave */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[130] bg-orange-600 text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:bg-black hover:scale-110 active:scale-90 ${showScrollTop ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-10 invisible'}`} >
        <i className="bi bi-arrow-up text-xl"></i>
      </button>

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; }
      `}</style>

    </div>
  );
}
