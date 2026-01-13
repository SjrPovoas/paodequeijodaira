import React, { useState } from 'react';
import Head from 'next/head';

export default function Loja() {
  const WHATSAPP_NUMBER = "5561982777196";
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Link do seu formulário no Brevo
  const LINK_LISTA_ESPERA = "https://seu-link-do-vrevo.com"; 

  const handleOrder = (productName) => {
    const message = encodeURIComponent(`Olá Ira! Tenho interesse no: ${productName}. Como posso adquirir?`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen text-[#2D3134] antialiased selection:bg-orange-100">
      <Head>
        <title>Loja Oficial | Pão de Queijo da Ira</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          body { font-family: 'Inter', sans-serif; }
          .outline-text { -webkit-text-stroke: 1.5px #E88D1E; color: transparent; }
          .product-card img { transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1); }
          .product-card:hover img { transform: scale(1.08); }
        `}} />
      </Head>

      {/* 1. NAVEGAÇÃO COM LOGOMARCA */}
      <nav className="border-b-2 border-black py-6 px-6 md:px-12 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="flex items-center">
          <img 
            src="/logo-paodequeijodaira.jpg" 
            alt="Pão de Queijo da Irá" 
            className="h-16 md:h-20 w-auto object-contain"
          />
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex text-[10px] font-bold uppercase tracking-[0.2em] space-x-6">
            <a href="https://paodequeijodaira.vercel.app/" className="hover:text-orange-500 transition-colors">Home</a>
            <a href="#web3" className="text-orange-600 hover:text-orange-400">Web3 Membership</a>
          </div>
          
          {/* BOTÃO CARRINHO */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute top-0 right-0 bg-orange-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">0</span>
          </button>
        </div>
      </nav>

      {/* MODAL DO CARRINHO */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 flex flex-col">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <h2 className="text-xl font-black uppercase tracking-tighter">Seu Carrinho</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-black uppercase text-[10px] font-bold">Fechar</button>
            </div>
            <div className="flex-grow flex flex-col items-center justify-center text-center">
              <p className="text-gray-400 uppercase text-[10px] font-bold tracking-widest">O carrinho está vazio</p>
              <p className="text-sm mt-2">Adicione itens do nosso lifestyle.</p>
            </div>
            <button className="w-full bg-[#2D3134] text-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 cursor-not-allowed">Finalizar Compra</button>
          </div>
        </div>
      )}

      {/* SEÇÃO LIFESTYLE (Única seção de produtos agora) */}
      <main className="py-16 px-6 md:px-12 bg-white">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-gray-400 text-center md:text-left">01. Lifestyle & Acessórios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          <div className="product-card group cursor-pointer" onClick={() => handleOrder('Camiseta Estampa Logo')}>
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden border border-gray-100">
              <img src="/imagens/camiseta1.png" className="w-full h-full object-cover mix-blend-multiply" alt="Camiseta" />
            </div>
            <div className="mt-6 flex justify-between items-end">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest">T-Shirt Ira Logo (Off-White)</h3>
                <p className="text-[10px] font-bold text-orange-600 uppercase mt-1">R$ 110,00</p>
              </div>
              <button className="border-b border-black text-[10px] font-bold uppercase tracking-widest pb-1 hover:text-orange-600 hover:border-orange-600 transition-all">Ver Detalhes</button>
            </div>
          </div>

          <div className="product-card group cursor-pointer" onClick={() => handleOrder('Camiseta Estampa Frase')}>
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden border border-gray-100">
              <img src="/imagens/camiseta2.png" className="w-full h-full object-cover mix-blend-multiply" alt="Camiseta" />
            </div>
            <div className="mt-6 flex justify-between items-end">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest">T-Shirt "Cheese Bread Lover"</h3>
                <p className="text-[10px] font-bold text-orange-600 uppercase mt-1">R$ 110,00</p>
              </div>
              <button className="border-b border-black text-[10px] font-bold uppercase tracking-widest pb-1 hover:text-orange-600 hover:border-orange-600 transition-all">Ver Detalhes</button>
            </div>
          </div>

          <div className="product-card group cursor-pointer" onClick={() => handleOrder('Avental Ira')}>
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden border border-gray-100">
              <img src="/imagens/avental.png" className="w-full h-full object-cover mix-blend-multiply" alt="Avental" />
            </div>
            <div className="mt-6 flex justify-between items-end">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest">Avental de Lona Ira Studio</h3>
                <p className="text-[10px] font-bold text-orange-600 uppercase mt-1">R$ 85,00</p>
              </div>
              <button className="border-b border-black text-[10px] font-bold uppercase tracking-widest pb-1 hover:text-orange-600 hover:border-orange-600 transition-all">Ver Detalhes</button>
            </div>
          </div>

          <div className="product-card group cursor-pointer" onClick={() => handleOrder('Caneca Ira')}>
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden border border-gray-100">
              <img src="/imagens/caneca.png" className="w-full h-full object-cover mix-blend-multiply" alt="Caneca" />
            </div>
            <div className="mt-6 flex justify-between items-end">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest">Caneca Cerâmica Fosca</h3>
                <p className="text-[10px] font-bold text-orange-600 uppercase mt-1">R$ 42,00</p>
              </div>
              <button className="border-b border-black text-[10px] font-bold uppercase tracking-widest pb-1 hover:text-orange-600 hover:border-orange-600 transition-all">Ver Detalhes</button>
            </div>
          </div>

        </div>
      </main>

      {/* 5. SEÇÃO WEB3 (Com as cores da marca) */}
      <section id="web3" className="py-24 px-6 md:px-12 bg-[#2D3134] text-white overflow-hidden relative">
        <div className="max-w-4xl relative z-10 mx-auto md:mx-0">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4 italic">
            IRA Digital <br /> <span className="outline-text">Membership</span>
          </h2>
          <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[12px] mb-12">
            (Genesis Pass): Os Benefícios na sua carteira digital.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Golden Discount</h4>
                <p className="text-gray-300 text-xs leading-relaxed">10% de desconto fixo em todos os itens da loja (físicos e digitais) via cupom exclusivo para holders.</p>
              </div>
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Early Access</h4>
                <p className="text-gray-300 text-xs leading-relaxed">Acesso a novas fornadas de pão de queijo e lançamentos de vestuário 24h antes do público geral.</p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Ira's Secret Club</h4>
                <p className="text-gray-300 text-xs leading-relaxed">Acesso a um grupo fechado (Telegram/Discord) para receber dicas de preparo e receitas exclusivas de Minas.</p>
              </div>
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Physical Gift</h4>
                <p className="text-gray-300 text-xs leading-relaxed">O primeiro holder de cada NFT recebe um kit físico exclusivo (Caneca + Avental) em casa.</p>
              </div>
            </div>
          </div>

          <a 
            href={LINK_LISTA_ESPERA}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-16 inline-block bg-orange-600 text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-orange-500 transition-all shadow-xl"
          >
            Entrar na Lista de Espera
          </a>
        </div>
        
        {/* Decorativo */}
        <div className="absolute top-1/2 right-[-10%] translate-y-[-50%] text-[20vw] font-black opacity-[0.05] select-none text-orange-500">
          WEB3
        </div>
      </section>

      <footer className="py-12 px-6 text-center border-t border-gray-100 bg-white">
        <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-400 italic">© 2026 Pão de Queijo da Irá</p>
      </footer>
    </div>
  );
}
