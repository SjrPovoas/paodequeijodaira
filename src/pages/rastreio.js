"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Rastreio() {
    const [codigo, setCodigo] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const buscarRastreio = (e) => {
        e.preventDefault();
        if (!codigo) return;
        window.open(`https://www.linkcorreios.com.br/${codigo}`, '_blank');
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-white text-[#2D3134] antialiased font-sans min-h-screen flex flex-col overflow-x-hidden">
            <Head>
                <title>Rastreio de Pedido | Loja Lifestyle do Pão de Queijo da Irá</title>
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

                    <nav className="hidden lg:flex space-x-6 text-[10px] font-bold uppercase tracking-widest items-center">
                        <Link href="/" className="hover:text-orange-600 transition-colors">Comprar Pão de Queijo da Irá</Link>
                        <Link href="/loja" className="text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all uppercase">LOJA LIFESTYLE</Link>
                        <Link href="/" className="bg-orange-600 text-white px-8 py-4 font-black uppercase tracking-widest text-xs shadow-lg uppercase">Ir para Home</Link>
                    </nav>

                    <button onClick={toggleMenu} className="lg:hidden text-3xl text-orange-600 z-[130] relative focus:outline-none">
                        <i className={isMenuOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
                    </button>
                </div>

                {/* MENU MOBILE */}
                <div className={`fixed inset-0 z-[120] bg-white h-screen w-screen transition-transform duration-500 ease-in-out lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <nav className="flex flex-col h-full items-center justify-center space-y-8 px-10 text-center">
                        <Link href="/loja" onClick={toggleMenu} className="text-xl font-black uppercase tracking-[0.2em] italic hover:text-orange-600">LOJA LIFESTYLE</Link>
                        <Link href="/" onClick={toggleMenu} className="text-xl font-black uppercase tracking-[0.2em] italic text-orange-600">COMPRAR PÃO DE QUEIJO</Link>
                        <div className="w-12 h-1 bg-gray-100"></div>
                        <div className="flex justify-center items-center gap-8">
                            <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-3xl hover:text-orange-600"><i className="bi bi-instagram"></i></a>
                            <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-3xl hover:text-orange-600"><i className="bi bi-facebook"></i></a>
                            <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-3xl hover:text-orange-600"><i className="bi bi-youtube"></i></a>
                        </div>
                    </nav>
                </div>
            </header>

            {/* CONTEÚDO CENTRALIZADO */}
            <main className="flex-grow flex flex-col items-center justify-center px-6 py-20">
                <div className="w-full max-w-md text-center">
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic mb-4 leading-none">
                        Rastrear <span className="text-orange-600">Pedido</span>
                    </h1>
                    <p className="text-gray-500 text-[10px] mb-10 uppercase tracking-[0.2em] leading-relaxed">
                        Válido apenas para itens da Loja Lifestyle e Acessórios<br/> (Camisetas e Brindes).
                    </p>

                    <form onSubmit={buscarRastreio} className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Digite seu código (ex: AA123456789BR)"
                                className="w-full p-5 border-2 border-black focus:border-orange-600 outline-none uppercase font-mono text-sm transition-colors"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full py-5 bg-orange-600 text-white font-black uppercase text-xs tracking-[0.2em] hover:bg-black transition-colors shadow-xl active:scale-95 transform">
                            Consultar Status <i className="bi bi-search ml-2"></i>
                        </button>
                    </form>
                </div>
            </main>

            {/* FOOTER */}
            <footer className="py-20 px-6 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto text-center md:text-left">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-center md:items-start">
                        <div className="flex flex-col items-center md:items-start">
                            <Link href="/"><img src="/logo-paodequeijodaira.jpg" className="h-20 mb-6 cursor-pointer" alt="Logo" /></Link>
                            <div className="flex space-x-4">
                                <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-instagram"></i></a>
                                <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-facebook"></i></a>
                                <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-youtube"></i></a>
                            </div>
                        </div>
                        <div className="text-center md:text-left space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Funcionamento & Retirada</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                <strong>Horário:</strong> Seg a Sáb das 08:00 às 18:00.<br />Dom das 08:00 às 12:00.</p>
                            <p className="text-sm text-gray-600">
                                <strong>Endereço:</strong> Quadra 4 Lote 26 Condomínio Flores do Cerrado II<br />Recreio Mossoró - Cidade Ocidental-GO</p>
                        </div>
                        <div className="md:text-right">
                            <h3 className="text-lg font-black uppercase tracking-tighter mb-2 italic">Pão de Queijo da Irá</h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© 2026 - Todos os direitos reservados.</p>
                            <div className="mt-4 flex justify-center md:justify-end gap-4 text-[10px] font-black text-gray-400 uppercase">
                                <Link href="/termos" className="hover:text-orange-600">Termos de Uso</Link>
                                <span>|</span>
                                <Link href="/privacidade" className="hover:text-orange-600">Privacidade</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <button onClick={scrollToTop}
                className={`fixed bottom-8 right-8 z-[90] bg-orange-600 text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:bg-black ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 invisible'}`}>
                <i className="bi bi-arrow-up text-xl font-bold"></i>
            </button>
        </div>
    );
}