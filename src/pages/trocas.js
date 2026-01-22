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
                <title>Trocas e Devoluções | Loja Lifestyle do Pão de Queijo da Irá</title>
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

            {/* CONTEÚDO TROCAS E DEVOLUÇÕES */}
            <main className="py-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 italic leading-none text-black">
                    Trocas e <span className="text-orange-600">Devoluções</span>
                </h1>

                <div className="prose prose-orange max-w-none text-gray-600 leading-relaxed space-y-10 font-sans">
                    <section>
                        <h2 className="text-xl font-black uppercase mb-4 text-[#3D2B1F]">01. Itens Lifestyle e Acessórios</h2>
                        <p className="text-sm mb-4 italic">Válido para: Camisetas, Canecas e Aventais.</p>
                        <ul className="list-disc pl-5 space-y-4 text-sm">
                            <li><strong>Arrependimento:</strong> Até 7 dias após o recebimento. O item deve estar novo e na embalagem original.</li>
                            <li><strong>Defeitos:</strong> Garantia de 30 dias para erros de estampa ou fabricação.</li>
                        </ul>
                    </section>

                    <section className="bg-orange-50 p-8 border-l-4 border-orange-600">
                        <h2 className="text-xl font-black uppercase mb-4 text-[#3D2B1F]">02. Procedimento</h2>
                        <p className="text-sm mb-4 font-bold text-[#3D2B1F]">Processo rápido via WhatsApp:</p>
                        <ol className="list-decimal pl-5 space-y-3 text-sm">
                            <li>Contate-nos informando o número do pedido.</li>
                            <li>Anexe fotos do produto.</li>
                            <li>Enviaremos as instruções de postagem em até 24h.</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-xl font-black uppercase mb-4 text-[#3D2B1F]">03. Estorno</h2>
                        <p className="text-sm">
                            <strong>Mercado Pago:</strong> Estorno direto na fatura ou conta Pix. <br />
                            <strong>Web3 (POL):</strong> Devolução para a mesma carteira (taxas de rede não inclusas).
                        </p>
                    </section>
                </div>
            </main>

            {/* FOOTER */}
            <footer footer className="py-20 px-6 bg-white border-t border-gray-100" >
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
                            <h3 className="text-lg font-black uppercase tracking-tighter mb-2 italic">Pão de Queijo da Irá</h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© 2026 - Todos os direitos reservados.</p>
                            <div className="mt-4 flex justify-center md:justify-end gap-4 text-[10px] font-black text-gray-400 uppercase">
                                <a href="/termos" className="hover:text-black">Termos de Uso</a>
                                <span>|</span>
                                <a href="/privacidade" className="hover:text-black">Privacidade</a>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-50 text-center">
                        <a href="https://sjrpovoas.vercel.app" target="_blank" className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300 hover:text-orange-600 transition-all">Desenvolvido por SjrPovoaS</a>
                    </div>
                </div>
            </footer >

            {/* BOTÃO VOLTAR AO TOPO */}
            < button onClick={scrollToTop}
                className={`fixed bottom-8 right-8 z-[90] bg-orange-600 text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:bg-black hover:scale-110 active:scale-90 ${showScrollTop ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-10 invisible'}`} >
                <i className="bi bi-arrow-up text-xl font-bold"></i>
            </button>
        </div>
    );
}