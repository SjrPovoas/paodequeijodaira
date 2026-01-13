import React from 'react';

const products = [
  {
    id: 1,
    name: 'Pão de Queijo Tradicional (1kg)',
    price: 'R$ 38,00',
    category: 'Congelados',
    image: 'https://via.placeholder.com/600x600?text=Pao+de+Queijo' // Substitua pelas suas fotos
  },
  {
    id: 2,
    name: 'Avental Ira - Edição Limitada',
    price: 'R$ 85,00',
    category: 'Lifestyle',
    image: 'https://via.placeholder.com/600x600?text=Avental'
  },
  {
    id: 3,
    name: 'Caneca Cerâmica Fosca',
    price: 'R$ 42,00',
    category: 'Acessórios',
    image: 'https://via.placeholder.com/600x600?text=Caneca'
  },
  {
    id: 4,
    name: 'Pão de Queijo com Canastra (500g)',
    price: 'R$ 29,00',
    category: 'Congelados',
    image: 'https://via.placeholder.com/600x600?text=Queijo+Canastra'
  }
];

export default function LojaIra() {
  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-yellow-300">
      {/* Barra de Navegação */}
      <nav className="border-b border-gray-100 py-6 px-8 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <h1 className="text-xl font-black tracking-tighter uppercase">Pão de Queijo da Ira</h1>
        <div className="hidden md:flex space-x-8 text-xs font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-gray-500 transition-colors">Produtos</a>
          <a href="#" className="hover:text-gray-500 transition-colors">História</a>
          <a href="#" className="hover:text-gray-500 transition-colors">Carrinho (0)</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-20 px-8 border-b border-gray-100">
        <div className="max-w-4xl">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            Sabor de <span className="text-gray-300 italic font-light">Minas</span> <br /> 
            no seu forno.
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-lg">
            Produtos artesanais feitos com queijo de verdade, entregues na porta da sua casa. Minimalismo no design, máximo no sabor.
          </p>
        </div>
      </header>

      {/* Grid de Produtos */}
      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Container da Imagem */}
              <div className="aspect-square bg-[#F5F5F5] overflow-hidden relative border border-transparent group-hover:border-black transition-all duration-500">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest border border-black">
                    Ver detalhes
                  </span>
                </div>
              </div>

              {/* Info do Produto */}
              <div className="mt-4 flex justify-between items-start">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{product.category}</p>
                  <h3 className="text-sm font-bold uppercase leading-tight">{product.name}</h3>
                </div>
                <p className="text-sm font-medium">{product.price}</p>
              </div>
              
              {/* Botão de Compra (Estilo PFP) */}
              <button className="mt-4 w-full py-3 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-yellow-500 hover:text-black transition-colors duration-300">
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-black p-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] font-bold uppercase tracking-widest">© 2024 Pão de Queijo da Ira</p>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
          <a href="#">Instagram</a>
          <a href="#">WhatsApp</a>
          <a href="#">Privacidade</a>
        </div>
      </footer>
    </div>
  );
}
