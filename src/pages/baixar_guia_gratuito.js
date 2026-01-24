import React, { useState } from 'react';
import Head from 'next/head';

export default function Obrigado() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // LINK DO PDF (/guias/guia-harmonizacao-paodequeijodaira.pdf)
  const LINK_PDF_GUIA = "https://drive.google.com/file/d/1i7Du9UmYkx9UWbztc7U5HgRfqVn1RRkF/view?usp=drive_link";

  return (
    /* Adicionado overflow-x-hidden para matar a barra de rolagem lateral */
    <div className="bg-white text-[#2D3134] antialiased font-['Inter'] min-h-screen overflow-x-hidden">
      <Head>
        <title>Obrigado! | Pão de Queijo da Irá</title>
        <meta name="robots" content="noindex" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lobster&display=swap" rel="stylesheet" />
      </Head>

      {/* HEADER */}
      <header className="border-b border-gray-100 py-4 px-6 sticky top-0 bg-white/95 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="https://paodequeijodaira.vercel.app/">
            <img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto" />
          </a>
          
          <nav className="hidden md:flex space-x-8 text-[10px] font-bold uppercase tracking-widest items-center">
            <a href="/" className="hover:text-orange-600 transition-colors">Ir para Home</a>
            <a href="/loja" className="text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all uppercase">Loja Lifestyle</a>
          </nav>

          <button onClick={toggleMenu} className="md:hidden text-3xl text-orange-600 z-[60] relative">
            <i className={isMenuOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
          </button>
        </div>

        {/* MENU MOBILE */}
        <div className={`fixed inset-[5] bg-white z-[-89] flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col bg-white items-center space-y-6 text-xl font-black uppercase tracking-tighter italic">
            <a href="/" onClick={toggleMenu}>Home</a>
            <a href="/loja" onClick={toggleMenu} className="text-orange-600">Loja Lifestyle</a>
            <a href="/" onClick={toggleMenu} className="bg-orange-600 text-white px-10 py-5 font-black uppercase tracking-widest text-xs not-italic">Ir para Home</a>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="min-h-[70vh] flex items-center justify-center py-20 px-6 bg-gray-50">
        <div className="max-w-2xl w-full bg-white p-8 md:p-16 rounded-[40px] shadow-2xl text-center border border-gray-100 relative overflow-hidden">
          <div className="absolute -top-2 -right-10 text-orange-600/5 text-9xl font-black rotate-12 select-none">GUIA</div>
          
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
              className="bg-black hover:bg-orange-600 text-white px-10 py-6 font-black uppercase tracking-widest text-xs transition-all duration-500 shadow-2xl flex items-center justify-center gap-3 group"
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

      {/* FOOTER E ASSINATURA */}
      <footer className="py-20 px-6 bg-white border-t border-gray-100">
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
              <h3 className="text-lg font-black uppercase mb-2">Pão de Queijo da Irá</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© 2026 - Todos os direitos reservados.</p>
              <p className="mt-2 space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <a href="/termos" className="hover:text-black">Termos de Uso</a>
                <span>|</span>
                <a href="/privacidade" className="hover:text-black">Privacidade</a></p>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-50 text-center">
            <a href="https://sjrpovoas.vercel.app" target="_blank" className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300 hover:text-orange-600 transition-all">Desenvolvido por SjrPovoaS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}