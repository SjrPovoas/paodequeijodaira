"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

export default function Pedidos() {
    // ESTADOS DE INTERFACE
    const [loading, setLoading] = useState(false);
    const [pedidoEncontrado, setPedidoEncontrado] = useState(null);
    const [erro, setErro] = useState(null);
    const [abaAtiva, setAbaAtiva] = useState('tradicional'); 
    const [menuMobileAberto, setMenuMobileAberto] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    
    const WHATSAPP_NUMBER = "5561982777196";
    const [busca, setBusca] = useState({ email: '', id: '', hash: '' });

    // Lógica para mostrar/esconder botão de voltar ao topo
    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Função de Busca no Supabase
    const handleBuscarPedido = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro(null);
        setPedidoEncontrado(null);

        try {
            let query = supabase.from('pedidos').select('*');

            if (abaAtiva === 'tradicional') {
                query = query.eq('id', busca.id).eq('cliente_email', busca.email);
            } else {
                query = query.eq('transacao_hash', busca.hash);
            }

            const { data, error } = await query.single();

            if (error || !data) throw new Error("Pedido não localizado. Verifique os dados inseridos.");
            setPedidoEncontrado(data);
        } catch (err) {
            setErro(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFDF5] font-sans text-black overflow-x-hidden flex flex-col">
            <Head>
                {/* SEO BÁSICO */}
                <title>Rastrear Pedido | Loja Lifestyle e Acessórios | Pão de Queijo da Irá</title>
                <meta name="description" content="Acompanhe o status da sua entrega na Loja Lifestyle e Acessórios. Rastreio tradicional ou via Blockchain Polygon (POL)." />
                <meta name="keywords" content="rastreio, pão de queijo da irá, lifestyle, acessórios, polygon, pol, web3, ecommerce" />
                <link rel="canonical" href="https://paodequeijodaira.vercel.app/pedidos" />

                {/* OPEN GRAPH (Facebook/Instagram/WhatsApp) */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Rastrear Pedido | Loja Lifestyle e Acessórios" />
                <meta property="og:description" content="Acompanhe sua jornada lifestyle. Rastreio seguro e transparente." />
                <meta property="og:image" content="/og-image-rastreio.jpg" />
                <meta property="og:url" content="https://paodequeijodaira.vercel.app/pedidos" />

                {/* TWITTER */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Rastrear Pedido | Pão de Queijo da Irá" />

                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
            </Head>

            {/* 1. BARRA DE ANÚNCIO */}
            <div className="bg-orange-600 text-white py-2 text-center text-[10px] font-black uppercase tracking-widest sticky top-0 z-[120]">
                • Entrega em todo Brasil • Frete Grátis acima de R$ 500,00 •
            </div>

            {/* 2. HEADER */}
            <header className="py-4 px-6 sticky top-[28px] bg-white/95 backdrop-blur-md z-[110] border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/">
                        <img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto cursor-pointer" />
                    </Link>

                    <nav className="hidden md:flex space-x-6 text-[10px] font-bold uppercase tracking-widest items-center">
                        <Link href="/pedidos" className="text-orange-600 flex items-center gap-2">RASTREAR <i className="bi bi-box-seam text-lg"></i></Link>
                        <Link href="/suporte" className="hover:text-orange-600 flex items-center gap-2">SUPORTE <i className="bi bi-arrow-left-right text-lg"></i></Link>
                        <Link href="/loja" className="bg-orange-600 text-white px-6 py-3 font-black rounded-full hover:bg-black transition-all">LOJA LIFESTYLE</Link>
                    </nav>

                    <div className="flex md:hidden items-center">
                        <button onClick={() => setMenuMobileAberto(true)} className="text-orange-600 p-2"><i className="bi bi-list text-3xl"></i></button>
                    </div>
                </div>
            </header>

            {/* 3. CONTEÚDO PRINCIPAL */}
            <main className="flex-grow py-20 px-6 max-w-4xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic leading-none text-black">
                       RASTREAR <span className="text-orange-600">PEDIDO</span>
                    </h1>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-600">Sua jornada lifestyle começa aqui</p>
                </div>

                <div className="flex justify-center gap-3 mb-10">
                    <button onClick={() => setAbaAtiva('tradicional')} className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${abaAtiva === 'tradicional' ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>E-mail & ID</button>
                    <button onClick={() => setAbaAtiva('web3')} className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${abaAtiva === 'web3' ? 'bg-[#8247E5] text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>Hash Web3 (POL)</button>
                </div>

                {!pedidoEncontrado ? (
                    <form onSubmit={handleBuscarPedido} className="bg-white p-8 shadow-sm border border-gray-100 rounded-3xl space-y-6">
                        {abaAtiva === 'tradicional' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">E-mail da Compra</label>
                                    <input required type="email" className="w-full border-b-2 border-gray-100 focus:border-orange-600 outline-none py-2 text-sm"
                                        value={busca.email} onChange={e => setBusca({...busca, email: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">ID do Pedido</label>
                                    <input required type="text" className="w-full border-b-2 border-gray-100 focus:border-orange-600 outline-none py-2 text-sm"
                                        value={busca.id} onChange={e => setBusca({...busca, id: e.target.value})} />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Transaction Hash (POL Network)</label>
                                <input required type="text" placeholder="0x..." className="w-full border-b-2 border-gray-100 focus:border-[#8247E5] outline-none py-2 text-sm font-mono"
                                    value={busca.hash} onChange={e => setBusca({...busca, hash: e.target.value})} />
                            </div>
                        )}
                        {erro && <p className="text-[10px] text-red-600 font-bold uppercase text-center bg-red-50 py-3 rounded-xl">{erro}</p>}
                        <button disabled={loading} className="w-full bg-black text-white py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-orange-600 transition-all rounded-full shadow-lg">
                            {loading ? 'Consultando...' : 'Localizar Pedido'}
                        </button>
                    </form>
                ) : (
                    <div className="bg-white p-10 border border-gray-100 rounded-[40px] shadow-2xl animate-fade-in">
                        <div className="flex justify-between items-start mb-10 border-b border-gray-50 pb-8">
                            <div>
                                <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">Status Atual</p>
                                <h3 className="text-4xl font-black uppercase italic tracking-tighter">{pedidoEncontrado.status}</h3>
                            </div>
                            <button onClick={() => setPedidoEncontrado(null)} className="text-[9px] font-black uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all">Voltar</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 text-2xl"><i className="bi bi-truck"></i></div>
                                <div><p className="text-[10px] font-black uppercase text-gray-400">Previsão</p><p className="text-md font-bold uppercase">{pedidoEncontrado.previsao_entrega || "Em breve"}</p></div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-[#8247E5] text-2xl"><i className="bi bi-hexagon-fill"></i></div>
                                <div><p className="text-[10px] font-black uppercase text-gray-400">Rede</p><p className="text-md font-bold uppercase">{pedidoEncontrado.transacao_hash ? "Polygon (POL)" : "Tradicional"}</p></div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* SEÇÃO DE CREDIBILIDADE E TECNOLOGIA - Pré-Rodapé */}
<section className="bg-white border-t border-gray-50 py-16">
    <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            
            {/* 1. SEGURANÇA GOOGLE */}
            <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center transition-colors group-hover:bg-green-50">
                    <i className="bi bi-google text-gray-400 group-hover:text-green-600 text-xl"></i>
                </div>
                <div>
                    <h5 className="font-black uppercase text-[9px] tracking-[0.2em] mb-1">Google Safe Browsing</h5>
                    <p className="text-[8px] text-gray-400 uppercase leading-tight px-4">Ambiente monitorado e livre de malwares</p>
                </div>
            </div>

            {/* 2. CRIPTOGRAFIA SSL */}
            <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center transition-colors group-hover:bg-blue-50">
                    <i className="bi bi-shield-lock text-gray-400 group-hover:text-blue-600 text-xl"></i>
                </div>
                <div>
                    <h5 className="font-black uppercase text-[9px] tracking-[0.2em] mb-1">Conexão Criptografada</h5>
                    <p className="text-[8px] text-gray-400 uppercase leading-tight px-4">Dados protegidos via certificado SSL 256-bits</p>
                </div>
            </div>

            {/* 3. POLYGON (POL) BLOCKCHAIN VERIFIED */}
            <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center transition-colors group-hover:bg-purple-50">
                    {/* Hexágono sólido representando o novo ecossistema Polygon */}
                    <i className="bi bi-hexagon-fill text-gray-400 group-hover:text-[#8247E5] text-xl"></i>
                </div>
                <div>
                    <h5 className="font-black uppercase text-[9px] tracking-[0.2em] mb-1">Polygon Ecosystem</h5>
                    <p className="text-[8px] text-gray-400 uppercase leading-tight px-4">Pagamentos e ativos nativos em rede (POL)</p>
                </div>
            </div>

            {/* 4. QUALIDADE LIFESTYLE */}
            <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center transition-colors group-hover:bg-orange-50">
                    <i className="bi bi-award text-gray-400 group-hover:text-orange-600 text-xl"></i>
                </div>
                <div>
                    <h5 className="font-black uppercase text-[9px] tracking-[0.2em] mb-1">Curadoria Lifestyle</h5>
                    <p className="text-[8px] text-gray-400 uppercase leading-tight px-4">Produtos exclusivos com tiragem limitada</p>
                </div>
            </div>

        </div>
    </div>
</section>

            {/* 5. FOOTER */}
            <footer className="py-20 px-6 bg-white border-t border-gray-100 mt-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:justify-between mb-16">
                        
                        {/* Coluna 1: Branding */}
                        <div className="flex flex-col items-center md:items-start space-y-4">
                            <Link href="/">
                                <img src="/logo-paodequeijodaira.jpg" className="h-20 cursor-pointer" alt="Logo" />
                            </Link>
                            <div className="flex gap-4">
                                <a href="https://instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-instagram"></i></a>
                                <a href="https://facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-facebook"></i></a>
                                <a href="https://youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-youtube"></i></a>
                            </div>
                        </div>

                        {/* Coluna 2: Ajuda */}
                        <div className="text-center md:text-left space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Ajuda & Suporte</h4>
                            <div className="space-y-4">
                                <Link href="/pedidos" className="flex items-center justify-center md:justify-start gap-2 group">
                                    <i className="bi bi-box-seam text-orange-600 text-lg"></i>
                                    <p className="text-xs font-bold tracking-widest group-hover:text-orange-600 transition-colors pt-1">Rastrear Pedido</p>
                                </Link>
                                <Link href="/suporte" className="flex items-center justify-center md:justify-start gap-2 group">
                                    <i className="bi bi-arrow-left-right text-orange-600 text-lg"></i>
                                    <p className="text-xs font-bold tracking-widest group-hover:text-orange-600 transition-colors pt-1">Trocas e Devoluções</p>
                                </Link>
                                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="flex items-center justify-center md:justify-start gap-3 group">
                                    <i className="bi bi-whatsapp text-orange-600 text-lg"></i>
                                    <p className="text-xs font-bold tracking-widest group-hover:text-orange-600 transition-colors pt-1">Fale Conosco</p>
                                </a>
                            </div>
                        </div>

                        {/* Coluna 3: Funcionamento */}
                        <div className="text-center md:text-left space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Funcionamento & Retirada</h4>
                            <div className="flex items-start justify-center md:justify-start gap-3">
                                <i className="bi bi-clock text-orange-600 text-lg"></i>
                                <p className="text-sm text-gray-600 leading-tight">Seg a Sáb: 08:00 às 18:00<br />Dom: 08:00 às 12:00</p>
                            </div>
                            <div className="pt-2">
                                <a href="#" target="_blank" className="flex items-start justify-center md:justify-start gap-3 group">
                                    <i className="bi bi-geo-alt text-orange-600 text-lg mt-0.5"></i>        
                                    <p className="text-sm text-gray-600 leading-relaxed text-left">
                                        Quadra 4 Lote 26 Condomínio Flores do Cerrado II<br />
                                        Recreio Mossoró - Cidade Ocidental-GO
                                    </p>
                                </a>
                            </div>
                        </div>

                        {/* Coluna 4: Institucional */}
                        <div className="text-center md:text-right space-y-4 flex flex-col items-center md:items-end">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Institucional</h4>
                            <h3 className="text-base font-black uppercase mb-1 italic tracking-tighter whitespace-nowrap">Pão de Queijo da Irá</h3>
                            <div className="flex flex-row items-center justify-center md:justify-end gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">
                                <Link href="/termos" className="hover:text-black flex items-center gap-1">Termos de Uso <i className="bi bi-file-text"></i></Link>
                                <span>|</span>
                                <Link href="/privacidade" className="hover:text-black flex items-center gap-1">Privacidade <i className="bi bi-shield-check"></i></Link>
                            </div>
                            <p className="text-[10px] pt-4 font-bold text-gray-300 uppercase tracking-widest">© 2026 - Todos os direitos reservados.</p>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-50 text-center">
                        <a href="https://sjrpovoas.vercel.app" target="_blank" className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300 hover:text-orange-600 transition-all">Desenvolvido por SjrPovoaS</a>
                    </div>
                </div>
            </footer>

            {/* 6. BOTÃO VOLTAR AO TOPO */}
            <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                className={`fixed bottom-8 right-8 z-[130] bg-orange-600 text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:bg-black hover:scale-110 active:scale-90 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            >
                <i className="bi bi-arrow-up text-xl"></i>
            </button>
        </div>
    );
}
