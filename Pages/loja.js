import React from 'react';

// CONFIGURAÇÃO DOS PRODUTOS
const products = [
  {
    id: 1,
    name: 'Pão de Queijo Tradicional (1kg)',
    price: '38,00',
    category: 'Congelados',
    image: 'https://images.unsplash.com/photo-1598148331584-37f2670e2810?q=80&w=800&auto=format&fit=crop' // Substitua pelas suas fotos reais
  },
  {
    id: 2,
    name: 'Avental Ira - Edição Minimalista',
    price: '85,00',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1533544431890-b0cf7f45039a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Caneca Cerâmica Fosca Logo',
    price: '42,00',
    category: 'Acessórios',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fbed20?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Pão de Queijo com Canastra (500g)',
    price: '29,00',
    category: 'Premium',
    image: 'https://images.unsplash.com/photo-1628191010210-a59de33e5941?q=80&w=800&auto=format&fit=crop'
  }
];

const WHATSAPP_NUMBER = "5511999999999"; // <--- COLOQUE SEU NÚMERO AQUI

export default function LojaIra() {
  
  const handleOrder = (productName) => {
    const message = encodeURIComponent(`Olá Ira! Gostaria de encomendar o produto: ${productName}. Como podemos combinar?`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-yellow-200">
      
      {/* 1. NAVEGAÇÃO FIXA */}
      <nav className="border-b border-gray-100 py-5 px-6 md:px-12 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <div className="text-xl font-black tracking-tighter uppercase leading-none">
          Pão de Queijo <br/> <span className="text-gray-400">da Ira</span>
        </div>
        <div className="hidden md:flex space-x-10 text-[10px] font-bold uppercase tracking-[0.2em]">
          <a href="#produtos" className="hover:text-gray-400 transition-colors">Produtos</a>
          <a href="#sobre" className="hover:text-gray-400 transition-colors">A nossa história</a>
          <a href="#contato" className="hover:text-gray-400 transition-colors">Contato</a>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] border border-black px-4 py-2 hover:bg-black hover:text-white transition-all cursor-pointer">
          Carrinho (0)
        </div>
      </nav>

      {/* 2. HERO SECTION (IMPACTO) */}
      <header className="py-24 px-6 md:px-12 border-b border-gray-100">
        <div className="max-w-5xl">
          <h2 className="text-6xl md:text-[120px] font-black uppercase tracking-tighter leading-[0.85] mb-8">
            O QUEIJO <br /> 
            <span className="text-transparent stroke-black" style={{ WebkitTextStroke: '1px black' }}>É DE VERDADE.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-xl font-medium">
            Direto de Minas para a sua mesa. Design limpo, ingredientes puros e o sabor que você já conhece.
          </p>
        </div>
      </header>

      {/* 3. GRID DE PRODUTOS */}
      <main id="produtos" className="py-16 px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col">
              {/* Imagem do Produto */}
              <div 
                className="aspect-[4/5] bg-[#F9F9F9] relative overflow-hidden cursor-pointer"
                onClick={() => handleOrder(product.name)}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Detalhes */}
              <div className="mt-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
                    {product.category}
                  </span>
                  <span className="text-sm font-bold">R$ {product.price}</span>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-tight leading-snug mb-4">
                  {product.name}
                </h3>
                
                {/* Botão de Compra Estilo PFP */}
                <button 
                  onClick={() => handleOrder(product.name)}
                  className="mt-auto w-full border border-black py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300"
                >
                  Pedir via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. FOOTER */}
      <footer className="bg-black text-white py-20 px-6 md:px-12 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-white/10 pb-12">
          <div>
            <h4 className="text-4xl font-black uppercase tracking-tighter mb-4">Fique por dentro.</h4>
            <p className="text-gray-400 text-sm">Receba avisos de novas fornadas e produtos exclusivos.</p>
          </div>
          <div className="flex items-end md:justify-end">
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-yellow-400 transition-colors">Instagram</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Facebook</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="pt-8 flex justify-between items-center text-[9px] font-medium text-gray-500 uppercase tracking-widest">
          <p>© 2024 Pão de Queijo da Ira. Feito com amor e polvilho.</p>
          <p>Belo Horizonte / Brasil</p>
        </div>
      </footer>

      {/* 5. BOTÃO FLUTUANTE DE SUPORTE */}
      <button 
        onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
        className="fixed bottom-6 right-6 bg-white border border-black w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-black hover:text-white transition-all z-[100] group"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.43 0 9.856-4.426 9.858-9.855.002-5.43-4.424-9.855-9.855-9.855-2.63 0-5.102 1.026-6.964 2.887-1.862 1.862-2.886 4.334-2.887 6.965-.001 1.738.447 3.432 1.298 4.914l-1.103 4.027 4.137-1.084z"/>
        </svg>
      </button>

    </div>
  );
}
