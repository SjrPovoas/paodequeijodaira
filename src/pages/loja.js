import React from 'react';
import Head from 'next/head';

export default function Loja() {
  const WHATSAPP_NUMBER = "5511999999999"; // <-- Troque pelo seu número

  const handleOrder = (productName) => {
    const message = encodeURIComponent(`Olá Ira! Gostaria de encomendar o produto: ${productName}. Como podemos combinar?`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', color: 'black', fontFamily: 'sans-serif' }}>
      <Head>
        <title>Loja | Pão de Queijo da Ira</title>
      </Head>

      {/* NAV */}
      <nav className="border-b border-gray-100 py-6 px-6 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="text-xl font-black uppercase tracking-tighter">
          Pão de Queijo <span className="text-gray-400">da Ira</span>
        </div>
        <a href="/" className="text-[10px] font-bold uppercase tracking-widest border border-black px-4 py-2">Home</a>
      </nav>

      {/* HERO */}
      <header className="py-16 px-6 border-b border-gray-100">
        <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4">
          Loja <br /> <span className="text-gray-300">Oficial</span>
        </h1>
        <p className="text-gray-500 text-sm">O verdadeiro sabor de Minas, com design minimalista.</p>
      </header>

      {/* LISTA DE PRODUTOS */}
      <main className="p-6 grid grid-cols-1 gap-12">
        
        {/* PRODUTO 1 */}
        <div className="flex flex-col">
          <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1598148331584-37f2670e2810?q=80&w=800" 
              className="w-full h-full object-cover grayscale"
              alt="Pão de Queijo"
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
              <span className="text-gray-400">Artesanal</span>
              <span>R$ 38,00</span>
            </div>
            <h3 className="text-sm font-bold uppercase mb-4">Pão de Queijo Tradicional (1kg)</h3>
            <button 
              onClick={() => handleOrder('Pão de Queijo Tradicional 1kg')}
              className="w-full border border-black py-4 text-[10px] font-bold uppercase tracking-widest active:bg-black active:text-white transition-all"
            >
              Pedir via WhatsApp
            </button>
          </div>
        </div>

        {/* Repita o bloco acima para mais produtos se desejar */}

      </main>

      <footer className="p-10 text-center border-t border-gray-100 mt-10">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">© Pão de Queijo da Ira</p>
      </footer>
    </div>
  );
}
