import Head from 'next/head';

export default function Loja() {
  const WHATSAPP_NUMBER = "5511999999999"; // <--- COLOQUE SEU NÚMERO AQUI

  const handleOrder = (productName) => {
    const message = encodeURIComponent(`Olá Ira! Gostaria de encomendar o produto: ${productName}. Como podemos combinar?`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen text-black font-sans">
      <Head>
        <title>Loja | Pão de Queijo da Ira</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* NAVEGAÇÃO */}
      <nav className="border-b border-gray-100 py-6 px-6 md:px-12 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="text-xl font-black tracking-tighter uppercase leading-none">
          Pão de Queijo <br /> <span className="text-gray-400">da Ira</span>
        </div>
        <div className="hidden md:flex space-x-10 text-[10px] font-bold uppercase tracking-[0.2em]">
          <button className="hover:text-gray-400 transition-colors uppercase">Produtos</button>
          <button className="hover:text-gray-400 transition-colors uppercase">Sobre</button>
          <button className="hover:text-gray-400 transition-colors uppercase text-gray-300">Carrinho (0)</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="py-20 px-6 md:px-12 border-b border-gray-100">
        <div className="max-w-6xl">
          <h1 className="text-6xl md:text-[110px] font-black uppercase tracking-tighter leading-[0.85] mb-8">
            Sabor Puro. <br /> 
            <span className="text-transparent" style={{ WebkitTextStroke: '1px black' }}>Design Limpo.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-lg font-medium">
            Receita artesanal mineira com uma estética moderna. O verdadeiro pão de queijo, entregue com cuidado.
          </p>
        </div>
      </header>

      {/* GRID DE PRODUTOS */}
      <main className="py-16 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          
          {/* CARD DE PRODUTO EXEMPLO (Repita este bloco para outros produtos) */}
          <div className="group flex flex-col">
            <div className="aspect-[4/5] bg-[#F5F5F5] relative overflow-hidden cursor-pointer" onClick={() => handleOrder('Pão de Queijo Tradicional')}>
                <img 
                  src="https://images.unsplash.com/photo-1598148331584-37f2670e2810?q=80&w=800&auto=format&fit=crop" 
                  alt="Pão de Queijo" 
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                />
            </div>
            <div className="mt-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <span className="text-gray-400">Congelados</span>
                    <span>R$ 38,00</span>
                </div>
                <h3 className="text-sm font-bold uppercase mb-4">Pão de Queijo Tradicional (1kg)</h3>
                <button 
                  onClick={() => handleOrder('Pão de Queijo Tradicional')}
                  className="mt-auto border border-black py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300"
                >
                  Pedir via WhatsApp
                </button>
            </div>
          </div>

          {/* Adicione mais produtos aqui seguindo o mesmo modelo */}

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-white py-20 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter italic">Pão de Queijo da Ira</h2>
          <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-[0.3em]">
            <a href="https://instagram.com" className="text-gray-400 hover:text-white">Instagram</a>
            <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')} className="text-gray-400 hover:text-white text-left uppercase">WhatsApp</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
