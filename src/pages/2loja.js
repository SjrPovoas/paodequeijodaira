import React from 'react';
import Head from 'next/head';

export default function Loja() {
  const WHATSAPP_NUMBER = "5561982777196"; // SUBSTITUA PELO SEU NÚMERO

  const handleOrder = (productName) => {
    const message = encodeURIComponent(`Olá Ira! Tenho interesse no: ${productName}. Como posso adquirir?`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen text-black antialiased selection:bg-yellow-200">
      <Head>
        <title>Loja Oficial | Pão de Queijo da Ira</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          body { font-family: 'Inter', sans-serif; }
          .outline-text { -webkit-text-stroke: 1.5px black; color: transparent; }
          .product-card img { transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1); }
          .product-card:hover img { transform: scale(1.08); }
        `}} />
      </Head>

      {/* 1. NAVEGAÇÃO COM LOGO NO CANTO SUPERIOR ESQUERDO */}
      <nav className="border-b-2 border-black py-8 px-6 md:px-12 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="flex flex-col">
      
          <span className="text-2xl font-[900] tracking-[ -0.05em] uppercase leading-[0.8]">Pão de Queijo</span>
          <span className="text-2xl font-[900] tracking-[ -0.05em] uppercase leading-[0.8] text-gray-400">da Ira</span>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] space-x-6">
          <a href="https://paodequeijodaira.vercel.app/" className="border-b-2 border-black pb-1">Home</a>
          <a href="#web3" className="text-yellow-600">Web3</a>
        </div>
      </nav>

      {/* 2. SEÇÃO PÃES DE QUEIJO CONGELADOS */}
      <section className="py-16 px-6 md:px-12 border-b border-gray-100">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-gray-400">01. Congelados Artesanais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl">
          
          {/* Card 1kg */}
          <div className="product-card group cursor-pointer" onClick={() => handleOrder('Pão de Queijo 1kg')}>
            <div className="aspect-square bg-gray-100 overflow-hidden relative">
              <img src="/imagens/imagem-embalagem-1kg.png" className="w-full h-full object-cover grayscale hover:grayscale-0" alt="Pão de Queijo 1kg" />
              <div className="absolute bottom-4 left-4 bg-black text-white px-3 py-1 text-[10px] font-bold">R$ 38,00</div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-black uppercase tracking-tighter">Pacote Tradicional 1kg</h3>
              <p className="text-sm text-gray-500 mt-2 uppercase font-bold tracking-widest text-[10px]">O clássico para ter sempre em casa.</p>
            </div>
          </div>

          {/* Card 20 unidades */}
          <div className="product-card group cursor-pointer" onClick={() => handleOrder('Pacote 20 unidades')}>
            <div className="aspect-square bg-gray-100 overflow-hidden relative">
              <img src="/imagens/imagem-embalagem-20und.png" className="w-full h-full object-cover grayscale hover:grayscale-0" alt="Pão de Queijo 20un" />
              <div className="absolute bottom-4 left-4 bg-black text-white px-3 py-1 text-[10px] font-bold">R$ 29,00</div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-black uppercase tracking-tighter">Pacote Praticidade (20 und)</h3>
              <p className="text-sm text-gray-500 mt-2 uppercase font-bold tracking-widest text-[10px]">A porção ideal para o seu café da tarde.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEÇÃO LIFESTYLE (Camisetas, Avental, Caneca) */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-gray-400">02. Lifestyle & Acessórios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl">
          
          {/* Camiseta 1 */}
          <div className="product-card group cursor-pointer" onClick={() => handleOrder('Camiseta Estampa Logo')}>
            <div className="aspect-[4/5] bg-white overflow-hidden border border-gray-200">
              <img src="/imagens/camiseta1.png" className="w-full h-full object-cover mix-blend-multiply" alt="Camiseta" />
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-black uppercase tracking-widest">T-Shirt Ira Logo (Off-White)</h3>
              <span className="text-[10px] font-bold text-gray-400 uppercase">R$ 110,00</span>
            </div>
          </div>

          {/* Camiseta 2 */}
          <div className="product-card group cursor-pointer" onClick={() => handleOrder('Camiseta Estampa Frase')}>
            <div className="aspect-[4/5] bg-white overflow-hidden border border-gray-200">
              <img src="/imagens/camiseta2.png" className="w-full h-full object-cover mix-blend-multiply" alt="Camiseta" />
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-black uppercase tracking-widest">T-Shirt "Cheese Bread Lover"</h3>
              <span className="text-[10px] font-bold text-gray-400 uppercase">R$ 110,00</span>
            </div>
          </div>

          {/* Avental */}
          <div className="product-card group cursor-pointer" onClick={() => handleOrder('Avental Ira')}>
            <div className="aspect-[4/5] bg-white overflow-hidden border border-gray-200">
              <img src="/imagens/avental.png" className="w-full h-full object-cover mix-blend-multiply" alt="Avental" />
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-black uppercase tracking-widest">Avental de Lona Ira Studio</h3>
              <span className="text-[10px] font-bold text-gray-400 uppercase">R$ 85,00</span>
            </div>
          </div>

          {/* Caneca */}
          <div className="product-card group cursor-pointer" onClick={() => handleOrder('Caneca Ira')}>
            <div className="aspect-[4/5] bg-white overflow-hidden border border-gray-200">
              <img src="/imagens/caneca.png" className="w-full h-full object-cover mix-blend-multiply" alt="Caneca" />
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-black uppercase tracking-widest">Caneca Cerâmica Fosca</h3>
              <span className="text-[10px] font-bold text-gray-400 uppercase">R$ 42,00</span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. SEÇÃO WEB3 */}
      <section id="web3" className="py-24 px-6 md:px-12 bg-black text-white overflow-hidden relative">
        <div className="max-w-4xl relative z-10">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4 italic">
            IRA Digital <br /> <span className="outline-text" style={{ WebkitTextStroke: '1px white' }}>Membership</span>
          </h2>
          <p className="text-yellow-500 font-bold uppercase tracking-[0.3em] text-[12px] mb-12">
            (Genesis Pass): Os Benefícios na sua carteira digital.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2">Golden Discount</h4>
                <p className="text-gray-400 text-xs leading-relaxed">10% de desconto fixo em todos os itens da loja (físicos e digitais) via cupom exclusivo para holders.</p>
              </div>
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2">Early Access</h4>
                <p className="text-gray-400 text-xs leading-relaxed">Acesso a novas fornadas de pão de queijo e lançamentos de vestuário 24h antes do público geral.</p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2">Ira's Secret Club</h4>
                <p className="text-gray-400 text-xs leading-relaxed">Acesso a um grupo fechado (Telegram/Discord) para receber dicas de preparo e receitas exclusivas de Minas.</p>
              </div>
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2">Physical Gift</h4>
                <p className="text-gray-400 text-xs leading-relaxed">O primeiro holder de cada NFT recebe um kit físico exclusivo (Caneca + Avental) em casa.</p>
              </div>
            </div>
          </div>

          <button onClick={() => handleOrder('Interesse Genesis Pass Web3')} className="mt-16 border-2 border-yellow-500 text-yellow-500 px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-yellow-500 hover:text-black transition-all">
            Entrar na Lista de Espera
          </button>
        </div>
        {/* Elemento Decorativo Web3 */}
        <div className="absolute top-1/2 right-[-10%] translate-y-[-50%] text-[20vw] font-black opacity-[0.03] select-none">
          WEB3
        </div>
      </section>

      <footer className="py-12 px-6 text-center border-t border-gray-100">
        <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-400">© 2026 Pão de Queijo da Irá</p>
      </footer>
    </div>
  );
}
