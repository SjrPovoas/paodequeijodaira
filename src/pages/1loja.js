import React from 'react';
import Head from 'next/head';

export default function Loja() {
  const WHATSAPP_NUMBER = "5561982777196"; // <-- COLOQUE SEU NÚMERO AQUI

  const handleOrder = (productName) => {
    const message = encodeURIComponent(`Olá Ira! Gostaria de encomendar: ${productName}. Como podemos combinar?`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen text-black antialiased selection:bg-yellow-200">
      <Head>
        <title>Loja | Pão de Queijo da Ira</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Carregamento do Tailwind via CDN para evitar erros de build no celular */}
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          body { font-family: 'Inter', sans-serif; }
          .outline-text {
            -webkit-text-stroke: 1px black;
            color: transparent;
          }
          .product-card:hover img { transform: scale(1.05); }
        `}} />
      </Head>

      {/* NAVEGAÇÃO */}
      <nav className="border-b border-gray-100 py-6 px-6 md:px-12 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="text-xl font-black tracking-tighter uppercase leading-none">
          Pão de Queijo <br /> <span className="text-gray-400">da Ira</span>
        </div>
        <div className="hidden md:flex space-x-10 text-[10px] font-bold uppercase tracking-[0.2em]">
          <a href="/" className="hover:text-gray-400 transition-colors">Início</a>
          <a href="#produtos" className="hover:text-gray-400 transition-colors">Produtos</a>
          <a href="#web3" className="text-yellow-600 hover:text-yellow-700 transition-colors font-black">Web3 Membership</a>
        </div>
        <button className="text-[10px] font-bold uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-all">
          Carrinho (0)
        </button>
      </nav>

      {/* HEADER */}
      <header className="py-20 px-6 md:px-12 border-b border-gray-100">
        <div className="max-w-6xl">
          <h1 className="text-6xl md:text-[110px] font-black uppercase tracking-tighter leading-[0.85] mb-8">
            Tradição <br /> 
            <span className="outline-text">& Futuro.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-lg font-medium italic">
            Artesanal por essência, moderno por escolha. O verdadeiro pão de queijo mineiro em uma nova curadoria.
          </p>
        </div>
      </header>

      {/* GRID DE PRODUTOS */}
      <main id="produtos" className="py-16 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          
          {/* PÃO DE QUEIJO CONGELADO */}
          <div className="product-card group flex flex-col">
            <div className="aspect-[4/5] bg-[#F5F5F5] relative overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1598148331584-37f2670e2810?q=80&w=800" 
                   alt="Pão de Queijo" className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700" />
            </div>
            <div className="mt-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-1 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
                <span>Congelados</span>
                <span className="text-black">R$ 38,00</span>
              </div>
              <h3 className="text-sm font-bold uppercase mb-4">Pão de Queijo Tradicional (1kg / 20un)</h3>
              <button onClick={() => handleOrder('Pão de Queijo 1kg (20un)')} className="mt-auto w-full border border-black py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
                Pedir via WhatsApp
              </button>
            </div>
          </div>

          {/* CAMISETA */}
          <div className="product-card group flex flex-col">
            <div className="aspect-[4/5] bg-[#F5F5F5] relative overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800" 
                   alt="Camiseta" className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700" />
            </div>
            <div className="mt-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-1 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
                <span>Apparel</span>
                <span className="text-black">R$ 110,00</span>
              </div>
              <h3 className="text-sm font-bold uppercase mb-4">T-Shirt "Ira Minimal"</h3>
              <button onClick={() => handleOrder('Camiseta T-Shirt')} className="mt-auto w-full border border-black py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
                Pedir via WhatsApp
              </button>
            </div>
          </div>

          {/* CANECA */}
          <div className="product-card group flex flex-col">
            <div className="aspect-[4/5] bg-[#F5F5F5] relative overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1514228742587-6b1558fbed20?q=80&w=800" 
                   alt="Caneca" className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700" />
            </div>
            <div className="mt-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-1 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
                <span>Acessórios</span>
                <span className="text-black">R$ 42,00</span>
              </div>
              <h3 className="text-sm font-bold uppercase mb-4">Caneca Cerâmica Fosca</h3>
              <button onClick={() => handleOrder('Caneca')} className="mt-auto w-full border border-black py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
                Pedir via WhatsApp
              </button>
            </div>
          </div>

          {/* AVENTAL */}
          <div className="product-card group flex flex-col">
            <div className="aspect-[4/5] bg-[#F5F5F5] relative overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1533544431890-b0cf7f45039a?q=80&w=800" 
                   alt="Avental" className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700" />
            </div>
            <div className="mt-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-1 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
                <span>Lifestyle</span>
                <span className="text-black">R$ 85,00</span>
              </div>
              <h3 className="text-sm font-bold uppercase mb-4">Avental de Lona Ira</h3>
              <button onClick={() => handleOrder('Avental')} className="mt-auto w-full border border-black py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
                Pedir via WhatsApp
              </button>
            </div>
          </div>

        </div>

        {/* SEÇÃO WEB3 */}
        <div id="web3" className="mt-32 bg-yellow-50 p-8 md:p-20 border border-yellow-100 rounded-2xl">
          <div className="max-w-4xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-yellow-600 block mb-4">Web3 Membership</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
              IRA Genesis <br /> Digital Card
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <p className="text-gray-600 font-medium">
                Nosso primeiro ativo digital colecionável. Muito mais que uma imagem: um passe vitalício de benefícios na nossa loja física e digital.
              </p>
              <ul className="text-[10px] font-bold uppercase tracking-widest text-gray-500 space-y-3">
                <li className="flex items-center"><span className="text-yellow-600 mr-2 text-lg">✓</span> 10% de Desconto em Congelados</li>
                <li className="flex items-center"><span className="text-yellow-600 mr-2 text-lg">✓</span> Brindes Físicos nos Primeiros Drops</li>
                <li className="flex items-center"><span className="text-yellow-600 mr-2 text-lg">✓</span> Acesso ao Clube Secreto da Ira</li>
              </ul>
            </div>
            <button onClick={() => handleOrder('Lista de Espera Web3')} className="bg-black text-white px-8 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-yellow-500 transition-all shadow-xl">
              Entrar na Lista de Espera
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-white py-24 px-6 md:px-12 mt-20">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 italic">Pão de Queijo da Ira</h2>
            <p className="text-gray-500 text-[10px] max-w-xs uppercase font-bold tracking-[0.3em] leading-loose">
              Onde a tradição mineira encontra a estética contemporânea.
            </p>
          </div>
          <div className="flex flex-col gap-6 text-[10px] font-bold uppercase tracking-[0.3em]">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
            <button onClick={() => handleOrder('Contato Geral')} className="text-gray-400 hover:text-white text-left uppercase">WhatsApp</button>
            <span className="text-gray-700 mt-4 italic">© 2026 IRA STUDIO</span>
          </div>
        </div>
      </footer>
    </div>
  );
                                                 }
