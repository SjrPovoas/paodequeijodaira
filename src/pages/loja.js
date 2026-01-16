import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const Loja = () => {
  const LINK_LISTA_ESPERA = "https://43782b7b.sibforms.com/serve/MUIFAC4AxTEnI80RImF7seW5i2MRkz5EqdqtMse22-stmvG7jsOqdFhZ6mmpfwRA-2skU_c3GJF8YXD6k-K_kNE6_gFeWIFbCIxIEWpknHGH8m6tdQMhTuqNG7-e_tsEQRBC4-pjosH0TVoqcW1UonSiJnd2E378zedWIJRs_Dhj9R9v8_VCpmg9Kebo_wFD_WsvLIPqwRBVBCNh8w==";
  const WHATSAPP_FONE = "5561982777196";

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Estado para armazenar o tamanho selecionado de cada produto antes de adicionar ao carrinho
  const [selectedSizes, setSelectedSizes] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product) => {
    // Se for vestuário e não tiver tamanho selecionado, avisa o usuário
    if (product.category === 'vestuario' && !selectedSizes[product.id]) {
      alert("Por favor, selecione um tamanho (P, M G ou GG) antes de adicionar.");
      return;
    }

    const tamanhoEscolhido = selectedSizes[product.id] || null;

    setCart((prevCart) => {
      // O item é único pela combinação de ID + Tamanho
      const itemExistente = prevCart.find(
        (item) => item.id === product.id && item.size === tamanhoEscolhido
      );

      if (itemExistente) {
        return prevCart.map((item) =>
          (item.id === product.id && item.size === tamanhoEscolhido)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1, size: tamanhoEscolhido }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (uniqueId) => {
    // No carrinho, usamos index ou a combinação id+size para remover corretamente
    setCart(cart.filter((_, index) => index !== uniqueId));
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const totalCarrinho = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItens = cart.reduce((acc, item) => acc + item.quantity, 0);

  const finalizarPedidoWhatsApp = () => {
    let mensagem = `Olá Irá! Gostaria de fazer um pedido Lifestyle:\n\n`;
    cart.forEach((item) => {
      const infoTamanho = item.size ? ` [Tamanho: ${item.size}]` : "";
      mensagem += `*${item.quantity}x* ${item.name}${infoTamanho} - R$ ${item.price * item.quantity},00\n`;
    });
    mensagem += `\n*Total: R$ ${totalCarrinho},00*`;
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_FONE}&text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  const produtos = [
    { id: 1, name: 'T-Shirt Logo Pão de Queijo da Irá (Masculina)', price: 110, img: '/imagens/camiseta1.png', category: 'vestuario' },
    { id: 2, name: 'T-Shirt Logo Pão de Queijo da Irá (Feminina)', price: 110, img: '/imagens/camiseta2.png', category: 'vestuario' },
    { id: 3, name: 'Avental de Lona Pão de Queijo da Irá', price: 85, img: '/imagens/avental.png', category: 'acessorio' },
    { id: 4, name: 'Caneca Cerâmica Fosca do Pão de Queijo da Irá', price: 42, img: '/imagens/caneca.png', category: 'acessorio' },
  ];

  return (
    <div className="relative min-h-screen bg-white font-sans text-black overflow-x-hidden">
      <Head>
        <title>Loja Lifestyle | Pão de Queijo da Irá</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
      </Head>

      {/* HEADER */}
      <header className="border-b border-gray-100 py-4 px-6 sticky top-0 bg-white/95 backdrop-blur-md z-[1000]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/"><img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto" /></a>

          <nav className="hidden md:flex space-x-8 text-[10px] font-bold uppercase tracking-widest items-center">
            <a href="#web3" className="hover:text-orange-600">IRÁ DIGITAL GENESIS PASS</a>
            <a href="/" className="text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all">COMPRAR PÃO DE QUEIJO</a>
            <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 group">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-orange-600 transition-colors">Carrinho</span>
              <div className="bg-black text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full group-hover:bg-orange-600 transition-colors">{totalItens}</div>
            </button>
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <button onClick={() => setIsCartOpen(true)} className="relative p-2">
              <i className="bi bi-bag text-2xl"></i>
              {totalItens > 0 && <span className="absolute top-0 right-0 bg-orange-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{totalItens}</span>}
            </button>
            <button onClick={toggleMenu} className="text-3xl text-orange-600 z-[2001] relative">
              <i className={isMenuOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
            </button>
          </div>
        </div>

        {/* Overlay Menu Mobile (Corrigido: Único e com Z-index adequado) */}
        <div className={`fixed inset-0 bg-white z-[50] transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col bg-white  items-center pt-32 space-y-8 text-xl font-black uppercase tracking-tighter italic text-center text-black">
            <a href="#web3" onClick={toggleMenu} className="flex items-center gap-3 border-b-2 border-black pb-1 hover:text-orange-600 transition-colors">
              <span>Lista de espera Genesis Pass</span><i className="bi bi-ticket-perforated text-2xl"></i>
            </a>
            <button onClick={() => { setIsCartOpen(true); toggleMenu(); }}
              className="flex items-center gap-3 border-b-2 border-black pb-1 hover:text-orange-600 transition-colors uppercase font-black">
              <span>Ver Carrinho ({totalItens})</span><i className="bi bi-cart3 text-2xl"></i>
            </button>
          </nav>
        </div>
      </header>

      <main className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-20 text-center md:text-left pt-10">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4">Loja Oficial</h2>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">Lifestyle & <br /> Acessórios</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-12 md:gap-y-24">
          {produtos.map((produto) => (
            <div key={produto.id} className="product-card group">
              <div className="aspect-[4/5] bg-gray-50 overflow-hidden border border-gray-100 relative">
                <img src={produto.img} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700" alt={produto.name} />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 pr-4">
                    <h3 className="text-sm font-black uppercase tracking-widest leading-tight">{produto.name}</h3>
                    <p className="text-xs font-bold text-orange-600 uppercase mt-2">R$ {produto.price},00</p>
                  </div>
                </div>

                {/* Seleção de Tamanho para Camisetas */}
                {produto.category === 'vestuario' && (
                  <div className="flex gap-2 mb-6">
                    {['P', 'M', 'G'].map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(produto.id, size)}
                        className={`w-10 h-10 border-2 font-black text-xs transition-all ${
                          selectedSizes[produto.id] === size 
                          ? 'border-orange-600 bg-orange-600 text-white' 
                          : 'border-gray-200 hover:border-black text-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}

                <button 
                  onClick={() => handleAddToCart(produto)} 
                  className="w-full border-2 border-black py-4 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* WEB3 SECTION */}
      <section id="web3" className="py-24 px-6 md:px-12 bg-[#2D3134] text-white relative overflow-hidden">
        <div className="max-w-4xl relative z-10 mx-auto md:mx-0">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4 italic">
            IRÁ Digital <br /> <span className="outline-text" style={{ WebkitTextStroke: '1px white', color: 'transparent' }}>Genesis Pass</span>
          </h2>
          <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[12px] mb-12">
            (Genesis Pass): Os Benefícios na sua carteira digital.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Golden Discount</h4>
                <p className="text-gray-300 text-xs leading-relaxed">10% de desconto fixo em todos os itens da loja.</p>
              </div>
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Early Access</h4>
                <p className="text-gray-300 text-xs leading-relaxed">Acesso a novas fornadas 24h antes do público geral.</p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Ira's Secret Club</h4>
                <p className="text-gray-300 text-xs leading-relaxed">Acesso a um grupo fechado com receitas exclusivas.</p>
              </div>
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Physical Gift</h4>
                <p className="text-gray-300 text-xs leading-relaxed">Primeiro holder recebe kit físico exclusivo.</p>
              </div>
            </div>
          </div>
          <a href={LINK_LISTA_ESPERA} target="_blank" rel="noopener noreferrer" className="mt-16 inline-block bg-orange-600 text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-orange-500 transition-all shadow-xl">
            Entrar na Lista de Espera
          </a>
        </div>
        <div className="absolute top-1/2 right-[-5%] translate-y-[-50%] text-[25vw] font-black opacity-[0.05] select-none text-orange-500 pointer-events-none whitespace-nowrap">
          WEB3
        </div>
      </section>

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

      {/* CARRINHO (SIDEBAR) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[3000] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-10 flex flex-col animate-slide-in">
            <div className="flex justify-between items-center mb-16">
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">Seu Carrinho</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-[10px] font-black uppercase tracking-widest border-b-2 border-black">Fechar</button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.size}-${index}`} className="flex gap-6 mb-8 items-center border-b border-gray-50 pb-8">
                  <img src={item.img} className="w-20 h-24 object-cover" alt={item.name} />
                  <div className="flex-1">
                    <h4 className="text-[10px] font-black uppercase tracking-widest leading-tight">{item.name}</h4>
                    {item.size && <p className="text-[10px] font-bold text-orange-600 mt-1 uppercase">Tamanho: {item.size}</p>}
                    <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Qtd: {item.quantity}</p>
                    <div className="flex justify-between items-center mt-3">
                      <p className="font-black text-sm tracking-tighter">R$ {item.price * item.quantity},00</p>
                      <button onClick={() => removeItem(index)} className="text-[9px] font-black uppercase text-red-600 hover:underline">Remover</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="mt-10 pt-10 border-t-4 border-black">
                <div className="flex justify-between items-end mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Total</span>
                  <span className="text-3xl font-black tracking-tighter">R$ {totalCarrinho},00</span>
                </div>
                <button onClick={finalizarPedidoWhatsApp} className="w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-orange-600 transition-colors">Finalizar no WhatsApp</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BOTÃO VOLTAR AO TOPO */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[90] bg-orange-600 text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:bg-black hover:scale-110 active:scale-90 ${
          showScrollTop ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-10 invisible'
        }`} 
      >
        <i className="bi bi-arrow-up text-xl font-bold"></i>
      </button>

      <style jsx>{`
        @keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-slide-in { animation: slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default Loja;
