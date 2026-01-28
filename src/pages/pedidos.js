"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

export default function Pedidos() {
    // --- ESTADOS DE INTERFACE E BUSCA ---
    const [loading, setLoading] = useState(false);
    const [pedidoEncontrado, setPedidoEncontrado] = useState(null);
    const [erro, setErro] = useState(null);
    const [abaAtiva, setAbaAtiva] = useState('tradicional'); 
    const [menuMobileAberto, setMenuMobileAberto] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    
    const WHATSAPP_NUMBER = "5561982777196";
    const [busca, setBusca] = useState({ email: '', id: '', hash: '' });

    // --- EFEITO: BOTÃO VOLTAR AO TOPO ---
    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- FUNÇÃO: BUSCA DE PEDIDO NO SUPABASE ---
    const handleBuscarPedido = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro(null);
        setPedidoEncontrado(null);

        try {
            let query = supabase.from('pedidos').select('*');

            // Lógica de filtro baseada na aba selecionada
            if (abaAtiva === 'tradicional') {
                // Busca por ID (UUID ou Short ID) e E-mail
                query = query.ilike('id', `%${busca.id}%`).eq('cliente_email', busca.email.trim());
            } else {
                // Busca por Hash da Transação (Web3)
                query = query.eq('transacao_hash', busca.hash.trim());
            }

            const { data, error } = await query.single();

            if (error || !data) throw new Error("Pedido não localizado. Verifique se o e-mail e o ID estão corretos.");
            
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
                <title>Rastrear Pedido | Loja Lifestyle e Acessórios | Pão de Queijo da Irá</title>
                <meta name="description" content="Acompanhe o status da sua entrega na Loja Lifestyle e Acessórios. Rastreio tradicional ou via Blockchain Polygon (POL)." />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
            </Head>

            {/* 1. BARRA DE ANÚNCIO TOPO */}
            <div className="bg-orange-600 text-white py-2 text-center text-[10px] font-black uppercase tracking-widest sticky top-0 z-[120]">
                • Entrega em todo Brasil • Frete Grátis acima de R$ 500,00 •
            </div>

            {/* 2. HEADER FIXO */}
      <header className="border-b border-gray-100 py-4 px-6 sticky top-[28px] bg-white/95 backdrop-blur-md z-[100]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* LOGO */}
          <Link href="/">
            <img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto cursor-pointer" />
          </Link>

          {/* NAVEGAÇÃO DESKTOP */}
          <nav className="hidden md:flex space-x-6 text-[10px] font-bold uppercase tracking-widest items-center">
            <Link href="/pedidos" onClick={() => setMenuMobileAberto(false)} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:text-orange-600 transition-colors">
              <i className="bi bi-box-seam text-lg"></i> Rastrear Pedido
            </Link>
            <Link href="/suporte" onClick={() => setMenuMobileAberto(false)} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:text-orange-600 transition-colors">
              <i className="bi bi-arrow-left-right text-lg"></i> Trocas & Devoluções
            </Link>
          </nav>

          {/* NAVEGAÇÃO MOBILE */}
          <div className="flex md:hidden items-center gap-4">
            <Link href="/pedidos" className="flex flex-col items-center relative">
              <i className="bi bi-box-seam text-2xl"></i>
              <span className="text-[8px] font-black uppercase mt-0.4">Rastrear</span>
            </Link>

        {/* ESTRUTURA MENU MOBILE OVERLAY */}
        <div className={`fixed inset-0 z-[1000] bg-white md:hidden transition-all duration-500 ${menuMobileAberto ? 'visible' : 'invisible'}`}>
          <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${menuMobileAberto ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMenuMobileAberto(false)}></div>
          <nav className={`absolute top-0 right-0 w-[100%] h-screen bg-white transition-transform duration-500 ease-in-out shadow-2xl flex flex-col z-[1001] ${menuMobileAberto ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-end p-6">
              <button onClick={() => setMenuMobileAberto(false)} className="text-3xl text-orange-600 p-2"><i className="bi bi-x-lg"></i></button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center space-y-8 text-center px-6">
              <Link href="/" onClick={() => setMenuMobileAberto(false)} className="text-sm font-black uppercase tracking-[0.2em] text-orange-600">COMPRAR PÃO DE QUEIJO</Link>
              <Link href="/loja" onClick={() => setMenuMobileAberto(false)} className="text-2xl font-black uppercase italic tracking-tighter border-b-4 border-orange-600">LOJA LIFESTYLE</Link>

              {/* NOVOS LINKS DE RASTREIO E SUPORTE */}
              <div className="pt-4 flex flex-col space-y-4">
                <Link href="/pedidos" onClick={() => setMenuMobileAberto(false)} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:text-orange-600 transition-colors">
                  <i className="bi bi-box-seam text-lg"></i> Rastrear Pedido
                </Link>
                <Link href="/suporte" onClick={() => setMenuMobileAberto(false)} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:text-orange-600 transition-colors">
                  <i className="bi bi-arrow-left-right text-lg"></i> Trocas & Devoluções
                </Link>
              </div>

              {/* REDES SOCIAIS */}
              <div className="flex justify-center items-center gap-6 pt-6">
                <Link href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-instagram"></i></Link>
                <Link href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-facebook"></i></Link>
                <Link href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-youtube"></i></Link>
              </div>
            </div>

            <div className="p-10 text-center border-t border-gray-50">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">© Pão de Queijo da Irá</p>
            </div>
          </nav>
        </div>
      </header>

            {/* 3. CONTEÚDO PRINCIPAL: BUSCA OU RESULTADO */}
            <main className="flex-grow py-20 px-6 max-w-4xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic leading-none text-black">
                       RASTREAR <span className="text-orange-600">PEDIDO</span>
                    </h1>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-600">Sua jornada lifestyle em tempo real</p>
                </div>

                {/* Seleção de Aba */}
                <div className="flex justify-center gap-3 mb-10">
                    <button onClick={() => setAbaAtiva('tradicional')} className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${abaAtiva === 'tradicional' ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>E-mail & ID</button>
                    <button onClick={() => setAbaAtiva('web3')} className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${abaAtiva === 'web3' ? 'bg-[#8247E5] text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>Blockchain Hash</button>
                </div>

                {!pedidoEncontrado ? (
                    /* FORMULÁRIO DE BUSCA */
                    <form onSubmit={handleBuscarPedido} className="bg-white p-8 shadow-sm border border-gray-100 rounded-3xl space-y-6">
                        {abaAtiva === 'tradicional' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">E-mail da Compra</label>
                                    <input required type="email" placeholder="seu@email.com" className="w-full border-b-2 border-gray-100 focus:border-orange-600 outline-none py-2 text-sm"
                                        value={busca.email} onChange={e => setBusca({...busca, email: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">ID do Pedido</label>
                                    <input required type="text" placeholder="Ex: a1b2c3d4" className="w-full border-b-2 border-gray-100 focus:border-orange-600 outline-none py-2 text-sm"
                                        value={busca.id} onChange={e => setBusca({...busca, id: e.target.value})} />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Transaction Hash (POLYGON)</label>
                                <input required type="text" placeholder="0x..." className="w-full border-b-2 border-gray-100 focus:border-[#8247E5] outline-none py-2 text-sm font-mono"
                                    value={busca.hash} onChange={e => setBusca({...busca, hash: e.target.value})} />
                            </div>
                        )}
                        {erro && <p className="text-[10px] text-red-600 font-bold uppercase text-center bg-red-50 py-3 rounded-xl">{erro}</p>}
                        <button disabled={loading} className="w-full bg-black text-white py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-orange-600 transition-all rounded-full shadow-lg">
                            {loading ? 'Sincronizando...' : 'Localizar Pedido'}
                        </button>
                    </form>
                ) : (
                    /* EXIBIÇÃO DO RESULTADO DO PEDIDO */
                    <div className="bg-white p-10 border border-gray-100 rounded-[40px] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-start mb-10 border-b border-gray-50 pb-8">
                            <div>
                                <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">Status do Pedido</p>
                                <h3 className="text-4xl font-black uppercase italic tracking-tighter">{pedidoEncontrado.status}</h3>
                            </div>
                            <button onClick={() => setPedidoEncontrado(null)} className="text-[9px] font-black uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all">Nova Busca</button>
                        </div>

                        {/* Detalhes do Rastreio Melhor Envio */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 text-2xl"><i className="bi bi-truck"></i></div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-400">Rastreio Transportadora</p>
                                    <p className="text-md font-bold uppercase">{pedidoEncontrado.rastreio_codigo || "Aguardando Coleta"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-[#8247E5] text-2xl"><i className="bi bi-hexagon-fill"></i></div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-400">Método de Pagamento</p>
                                    <p className="text-md font-bold uppercase">{pedidoEncontrado.transacao_hash ? "Web3 (Polygon)" : "Tradicional"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Botão de Ação de Rastreio */}
                        {pedidoEncontrado.rastreio_codigo && (
                            <a 
                                href={`https://www.melhorenvio.com.br/rastreio/${pedidoEncontrado.rastreio_codigo}`}
                                target="_blank"
                                rel="noreferrer"
                                className="block w-full text-center bg-orange-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all mb-6"
                            >
                                Acompanhar no Mapa <i className="bi bi-geo-alt-fill ml-2"></i>
                            </a>
                        )}

                        {/* Hash da Transação para Transparência */}
                        {pedidoEncontrado.transacao_hash && (
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-[9px] font-black uppercase text-gray-400 mb-1">Blockchain Proof (TX Hash)</p>
                                <p className="text-[10px] font-mono break-all text-purple-600">{pedidoEncontrado.transacao_hash}</p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* 4. SEÇÃO DE CREDIBILIDADE (Fiel ao original) */}
            <section className="bg-white border-t border-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                        <div className="flex flex-col items-center text-center space-y-3 group">
                            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-green-50 transition-all">
                                <i className="bi bi-google text-gray-400 group-hover:text-green-600 text-xl"></i>
                            </div>
                            <div>
                                <h5 className="font-black uppercase text-[9px] tracking-[0.2em] mb-1">Google Safe Browsing</h5>
                                <p className="text-[8px] text-gray-400 uppercase leading-tight px-4">Ambiente monitorado e livre de malwares</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-3 group">
                            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-all">
                                <i className="bi bi-shield-lock text-gray-400 group-hover:text-blue-600 text-xl"></i>
                            </div>
                            <div>
                                <h5 className="font-black uppercase text-[9px] tracking-[0.2em] mb-1">Conexão Criptografada</h5>
                                <p className="text-[8px] text-gray-400 uppercase leading-tight px-4">Dados protegidos via SSL 256-bits</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-3 group">
                            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-purple-50 transition-all">
                                <i className="bi bi-hexagon-fill text-gray-400 group-hover:text-[#8247E5] text-xl"></i>
                            </div>
                            <div>
                                <h5 className="font-black uppercase text-[9px] tracking-[0.2em] mb-1">Polygon Ecosystem</h5>
                                <p className="text-[8px] text-gray-400 uppercase leading-tight px-4">Pagamentos nativos em rede (POL)</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-3 group">
                            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-orange-50 transition-all">
                                <i className="bi bi-award text-gray-400 group-hover:text-orange-600 text-xl"></i>
                            </div>
                            <div>
                                <h5 className="font-black uppercase text-[9px] tracking-[0.2em] mb-1">Curadoria Lifestyle</h5>
                                <p className="text-[8px] text-gray-400 uppercase leading-tight px-4">Produtos exclusivos de tiragem limitada</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

{/* 5. FOOTER (Fiel ao original) */}
            <footer className="py-20 px-6 bg-white border-t border-gray-100 mt-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                        <div className="flex flex-col items-center md:items-start space-y-4">
                            <Link href="/">
                                <img src="/logo-paodequeijodaira.jpg" className="h-20 cursor-pointer" alt="Logo" />
                            </Link>
                            <div className="flex gap-4 text-2xl">
                                <a href="https://instagram.com/paodequeijodaira" target="_blank" className="hover:text-orange-600"><i className="bi bi-instagram"></i></a>
                                <a href="https://facebook.com/share/1GWWjcK1xr/" target="_blank" className="hover:text-orange-600"><i className="bi bi-facebook"></i></a>
                                <a href="https://youtube.com/@paodequeijodaira" target="_blank" className="hover:text-orange-600"><i className="bi bi-youtube"></i></a>
                            </div>
                        </div>

                        <div className="text-center md:text-left space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Ajuda & Suporte</h4>
                            <div className="space-y-4">
                                <Link href="/pedidos" className="flex items-center justify-center md:justify-start gap-2 group">
                                    <i className="bi bi-box-seam text-orange-600 text-lg"></i>
                                    <p className="text-xs font-bold tracking-widest group-hover:text-orange-600 pt-1">Rastrear Pedido</p>
                                </Link>
                                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="flex items-center justify-center md:justify-start gap-3 group">
                                    <i className="bi bi-whatsapp text-orange-600 text-lg"></i>
                                    <p className="text-xs font-bold tracking-widest group-hover:text-orange-600 pt-1">Suporte WhatsApp</p>
                                </a>
                            </div>
                        </div>

                        <div className="text-center md:text-left space-y-4 col-span-1 md:col-span-2">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Endereço & Funcionamento</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Seg a Sáb: 08:00 às 18:00 | Dom: 08:00 às 12:00<br />
                                Quadra 4 Lote 26 Condomínio Flores do Cerrado II - Cidade Ocidental-GO
                            </p>
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
                className={`fixed bottom-8 right-8 z-[130] bg-orange-600 text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:bg-black hover:scale-110 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            >
                <i className="bi bi-arrow-up text-xl"></i>
            </button>
        </div>
    );
}
