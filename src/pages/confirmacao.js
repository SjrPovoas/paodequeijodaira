import React, { useState } from 'react';
import Head from 'next/head';

export default function ConfirmacaoInscricao() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="bg-[#f4f4f4] text-[#2D3134] antialiased font-sans min-h-screen overflow-x-hidden">
      <Head>
        <title>Inscrição Confirmada | Pão de Queijo da Irá</title>
        <meta name="robots" content="noindex" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
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

      {/* CONTEÚDO PRINCIPAL (MIMETIZANDO O DESIGN DO EMAIL) */}
      <main className="flex items-center justify-center py-12 md:py-20 px-4">
        <div className="max-w-[600px] w-full shadow-2xl overflow-hidden rounded-lg">
          
          {/* BLOCO ESCURO (ESTILO WEB3/EMAIL) */}
          <div className="bg-[#2D3134] p-8 md:p-12 text-center text-white">
            <p className="text-[#ea580c] text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] mb-4">
              Irá Digital GENESIS PASS
            </p>
            
            <h1 className="text-3xl md:text-5xl font-black uppercase italic leading-none tracking-tighter mb-8">
              Seu lugar na lista foi <br />Confirmado Com Sucesso!
            </h1>
            
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10 max-w-md mx-auto">
              Você foi adicionado com sucesso à nossa lista de espera do Irá Digital GENESIS PASS.<br />              
              Ao clicar no botão abaixo, você valida seu interesse e ativa seus benefícios exclusivos.
            </p>

            {/* BOTÃO DE AÇÃO */}
            <div className="mb-10">
              <a 
                href="/loja" // Link final de confirmação ou retorno
                className="inline-block bg-[#ea580c] hover:bg-[#f97316] text-white font-black uppercase text-xs md:text-sm tracking-[0.2em] px-8 py-5 transition-all transform hover:scale-105 active:scale-95 shadow-xl"
              >
                Garantir e Voltar para Loja!
              </a>
            </div>

            <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed italic">
              *Parabéns, você receberá 10% vitalício de desconto <br />
              nas camisetas e acesso ao Clube Secreto.<br />
              Guarde este e-mail, ele serve como cupom, para apresentar sempre que for solicitado o desconto*
            </p>
          </div>

          {/* FOOTER DO CARD */}
          <div className="bg-white p-6 text-center border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Pão de Queijo da Irá © 2026
            </p>
            <a 
              href="/" 
              className="inline-block mt-2 text-[#ea580c] text-[10px] font-black uppercase tracking-widest hover:underline"
            >
              Visite nosso site
            </a>
          </div>
        </div>
      </main>

      {/* RODAPÉ DA PÁGINA */}
      <footer className="py-10 text-center">
        <div className="pt-8 border-t border-gray-50 text-center">
            <a href="https://sjrpovoas.vercel.app" target="_blank" className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300 hover:text-orange-600 transition-all">Desenvolvido por SjrPovoaS</a>
        </div>      </footer>
    </div>
  );
}