import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Termos() {
    // Estado corrigido para combinar com o restante do código
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Estado para controlar a visibilidade da seta de voltar ao topo
    const [showScrollTop, setShowScrollTop] = useState(false);

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

    return (
        <div className="bg-white text-[#2D3134] antialiased font-sans overflow-x-hidden">
            <Head>
                <title>Termos de Uso | Loja Lifestyle do Pão de Queijo da Irá</title>
                <meta name="robots" content="noindex" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lobster&display=swap" rel="stylesheet" />
            </Head>

            {/* HEADER */}
            <header className="border-b border-gray-100 py-4 px-6 sticky top-0 bg-white/95 backdrop-blur-md z-[100]">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/">
                        <img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto cursor-pointer" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex space-x-6 text-[10px] font-bold uppercase tracking-widest items-center">
                        <Link href="/" className="hover:text-orange-600 transition-colors">Comprar Pão de Queijo da Irá</Link>
                        <Link href="/loja" className="text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all uppercase">LOJA LIFESTYLE</Link>
                        <Link href="/" className="bg-orange-600 text-white px-8 py-4 font-black uppercase tracking-widest text-xs shadow-lg uppercase">Ir para Home</Link>
                    </nav>

                    {/* Botão Mobile - Z-index alto para ficar acima do menu */}
                    <button onClick={toggleMenu} className="lg:hidden text-3xl text-orange-600 z-[130] relative focus:outline-none">
                        <i className={isMenuOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
                    </button>
                </div>

                {/* MENU MOBILE CORRIGIDO */}
                <div className={`fixed inset-0 z-[120] bg-white h-screen w-screen transition-transform duration-500 ease-in-out lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <nav className="flex flex-col h-full items-center justify-center space-y-8 px-10 text-center">
                        <Link href="/loja" onClick={toggleMenu} className="text-xl font-black uppercase tracking-[0.2em] italic hover:text-orange-600">
                            LOJA LIFESTYLE
                        </Link>
                        <Link href="/" onClick={toggleMenu} className="text-xl font-black uppercase tracking-[0.2em] italic text-orange-600">
                            COMPRAR PÃO DE QUEIJO
                        </Link>
                        
                        <div className="w-12 h-1 bg-gray-100"></div>

                        {/* REDES SOCIAIS NO MENU MOBILE */}
                        <div className="flex justify-center items-center gap-8">
                                <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-3xl hover:text-orange-600"><i className="bi bi-instagram"></i></a>
                                <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-3xl hover:text-orange-600"><i className="bi bi-facebook"></i></a>
                                <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-3xl hover:text-orange-600"><i className="bi bi-youtube"></i></a>
                        </div>
                    </nav>
                </div>
            </header>

            {/* CONTEÚDO DOS TERMOS */}
            <main className="py-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 italic leading-none text-black text-center md:text-left">
                    Termos de <span className="text-orange-600">Serviço</span>
                </h1>

                <div className="prose prose-orange max-w-none text-gray-600 leading-relaxed space-y-10">

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
                            <span className="text-orange-600">01.</span> Pagamentos e Web3
                        </h2>
                        <p>
                            Nossa loja aceita pagamentos via <strong>Mercado Pago</strong> (Pix e Cartão) e <strong>Criptomoedas</strong> (POL na rede Polygon).
                            Ao optar por pagamentos em Cripto, o usuário reconhece que as transações na blockchain são irreversíveis.
                            O Pão de Queijo da Irá não se responsabiliza por envios feitos para endereços incorretos ou através de redes não suportadas.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
                            <span className="text-orange-600">02.</span> Produtos Lifestyle
                        </h2>
                        <p>
                            As imagens dos produtos (camisetas e acessórios) são ilustrativas. Pequenas variações de cor e estampa podem ocorrer devido ao processo de produção artesanal e à calibração de cada monitor.
                        </p>
                    </section>

                    <section className="bg-orange-50 p-8 rounded-3xl border-2 border-orange-100">
                        <h3 className="text-xl font-black uppercase text-orange-600 mb-2">Envio e Logística</h3>
                        <p className="text-sm">
                            O prazo de entrega começa a contar a partir da confirmação do pagamento. Para itens de vestuário, o prazo de produção pode levar até <strong>5 dias úteis</strong> antes da postagem oficial.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
                            <span className="text-orange-600">03.</span> Isenção de Responsabilidade
                        </h2>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <p className="mb-4 text-sm md:text-base">Os materiais no site da Pão de Queijo da Irá são fornecidos 'como estão'. O Pão de Queijo da Irá não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias.</p>
                        </div>
                    </section>

                    <section className="bg-orange-50 p-8 rounded-3xl border-2 border-orange-100">
                        <h3 className="text-xl font-black uppercase text-orange-600 mb-2">Modificações</h3>
                        <p className="text-sm">O Pão de Queijo da Irá pode revisar estes termos a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos.</p>

                        <h3 className="text-xl font-black uppercase text-orange-600 mt-6 mb-2">Lei Aplicável</h3>
                        <p className="text-sm text-black font-bold italic">Estes termos são regidos pelas leis brasileiras e você se submete à jurisdição exclusiva dos tribunais locais.</p>
                    </section>

                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-12 border-t pt-8 text-center">
                        Última atualização: 21 de Janeiro de 2026.
                    </p>
                </div>
            </main>

      {/* FOOTER */}
      <footer className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:justify-between mb-16">

            {/* COLUNA 1: LOGO E REDES SOCIAIS */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              {/* LOGO */}
              <Link href="/">
                <img src="/logo-paodequeijodaira.jpg" className="h-20 cursor-pointer" alt="Logo" />
              </Link>
              {/* REDES SOCIAIS */}
              <div className="flex gap-4">
                <Link href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-instagram"></i></Link>
                <Link href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-facebook"></i></Link>
                <Link href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-youtube"></i></Link>
              </div>
            </div>

            {/* COLUNA 2: FUNCIONAMENTO & LOCALIZAÇÃO */}
            <div className="text-center md:text-left space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Funcionamento & Retirada</h4>
              <div className="flex items-start justify-center md:justify-start gap-3">
                <i className="bi bi-clock text-orange-600 text-lg"></i>
                <p className="text-sm text-gray-600 leading-tight">Seg a Sáb: 08:00 às 18:00<br />Dom: 08:00 às 12:00</p>
              </div>
              <div className="pt-2">
                <Link href="https://maps.app.goo.gl/oGCHp5i9y8HnPutg9" target="_blank" className="flex items-start justify-center md:justify-start gap-3 group">
                  <i className="bi bi-geo-alt text-orange-600 text-lg mt-0.5"></i>        
                  <p className="text-sm text-gray-600 leading-relaxed text-left">
                    Quadra 4 Lote 26 Condomínio Flores do Cerrado II<br />
                    Recreio Mossoró - Cidade Ocidental-GO</p>
                </Link>
              </div>
            </div>

            {/* COLUNA 3: INSTITUCIONAL & DIREITOS */}
            <div className="text-center md:text-right space-y-4 flex flex-col items-center md:items-end">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Institucional</h4>
              <h3 className="text-[14px] text-base font-black pt-3 uppercase mb-1 italic tracking-tighter whitespace-nowrap">Pão de Queijo da Irá</h3>    
              <div className="flex flex-row items-center justify-center md:justify-end gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">
                <Link href="/termos" className="text-orange-500 flex items-center gap-1 transition-colors group">
                  Termos de Uso <i className="bi bi-file-text group-hover:text-orange-600"></i>
                </Link>
                <span className="text-gray-200">|</span>
                <Link href="/privacidade" className="hover:text-black flex items-center gap-1 transition-colors group">
                  Privacidade <i className="bi bi-shield-check group-hover:text-orange-600"></i>
                </Link>
              </div> 
              <p className="text-[9px] pt-2 font-bold text-gray-300 uppercase tracking-widest whitespace-nowrap">© 2026 - Todos os direitos reservados.</p>
            </div>
          </div>

          {/* ASSINATURA */}
          <div className="pt-8 border-t border-gray-50 text-center">
            <a href="https://sjrpovoas.vercel.app" target="_blank" className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300 hover:text-orange-600 transition-all">Desenvolvido por SjrPovoaS</a>
          </div>
        </div>
      </footer>

      {/* BOTÃO VOLTAR AO TOPO */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 z-[90] bg-orange-600 text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:bg-black hover:scale-110 active:scale-90 animate-bounce">
          <i className="bi bi-arrow-up"></i>
        </button>
      )}

      <style jsx global>
        {`@keyframes slide-left { from { transform: translateX(100%); } to { transform: translateX(0); } }
          @keyframes slide-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
          .animate-slide-left { animation: slide-left 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
          .animate-slide-right { animation: slide-right 0.4s cubic-bezier(0.16, 1, 0.3, 1); }`}
      </style>

    </div>
  );
}
