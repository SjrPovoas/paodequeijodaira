"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

export default function Suporte() {
    const [loading, setLoading] = useState(false);
    const [enviado, setEnviado] = useState(false);
    const [menuMobileAberto, setMenuMobileAberto] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const WHATSAPP_NUMBER = "5561982777196";
    const [form, setForm] = useState({ nome: '', email: '', pedido: '', motivo: 'Troca de Tamanho', mensagem: '' });

    // Lógica para mostrar/esconder botão de voltar ao topo
    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Função de envio para a tabela 'trocas' do Supabase
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('trocas')
                .insert([{
                    cliente_email: form.email,
                    pedido_id: form.pedido,
                    motivo: form.motivo,
                    descricao: form.mensagem,
                    status: 'Pendente'
                }]);

            if (error) throw error;
            setEnviado(true);
        } catch (err) {
            alert("Erro ao enviar: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFDF5] font-sans text-black overflow-x-hidden">
            <Head>
                <title>Suporte: Trocas & Devoluções | Loja Lifestyle e Acessórios | Pão de Queijo da Irá</title>
                <link rel="canonical" href="https://paodequeijodaira.vercel.app/suporte" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
            </Head>

            {/* BARRA DE ANÚNCIO TOPO - Fixa com z-index alto */}
            <div className="bg-orange-600 text-white py-2 text-center text-[10px] font-black uppercase tracking-widest sticky top-0 z-[120]">
                • Entrega em todo Brasil • Frete Grátis acima de R$ 500,00 •
            </div>

            {/* HEADER */}
            <header className="py-4 px-6 sticky top-0 bg-white/95 backdrop-blur-md z-[110] border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* LOGO */}
                    <Link href="/">
                        <img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto cursor-pointer" />
                    </Link>

                    {/* NAVEGAÇÃO DESKTOP */}
                    <nav className="hidden md:flex space-x-6 text-[10px] font-bold uppercase tracking-widest items-center">
                        <Link href="/pedidos" className="hover:text-orange-600 transition-colors flex items-center gap-2">
                            RASTREAR PEDIDO <i className="bi bi-box-seam text-lg"></i>
                        </Link>
                        <Link href="/suporte" className="hover:text-orange-600 transition-colors flex items-center gap-2">
                            TROCAS & DEVOLUÇÕES <i className="bi bi-arrow-left-right text-lg"></i>
                        </Link>
                        <Link href="/loja" className="bg-orange-600 text-white px-6 py-3 font-black rounded-full hover:bg-black transition-all">
                            LOJA LIFESTYLE
                        </Link>
                    </nav>

                    {/* BOTÃO MENU MOBILE */}
                    <div className="flex md:hidden items-center">
                        <button onClick={() => setMenuMobileAberto(true)} className="text-orange-600 p-2">
                            <i className="bi bi-list text-3xl"></i>
                        </button>
                    </div>
                </div>

                {/* ESTRUTURA MENU MOBILE (BARRA LATERAL) - Ajustado z-index e comportamento */}
                <div className={`fixed inset-0 z-[1000] transition-all duration-500 ${menuMobileAberto ? 'visible' : 'invisible'}`}>
                    {/* Overlay Escuro */}
                    <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${menuMobileAberto ? 'opacity-100' : 'opacity-0'}`}
                        onClick={() => setMenuMobileAberto(false)}></div>

                    {/* Painel Lateral */}
                    <nav className={`absolute top-0 right-0 w-[100%] h-screen bg-white transition-transform duration-500 ease-in-out shadow-2xl flex flex-col z-[1001] ${menuMobileAberto ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="flex justify-end p-6">
                            <button onClick={() => setMenuMobileAberto(false)} className="text-3xl text-orange-600">
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col justify-center items-center space-y-8 text-center px-10">
                            <Link href="#web3" onClick={() => setMenuMobileAberto(false)} className="text-sm font-black uppercase tracking-[0.2em] hover:text-orange-600 transition-colors">IRÁ DIGITAL GENESIS PASS</Link>
                            <Link href="/" onClick={() => setMenuMobileAberto(false)} className="text-sm font-black uppercase tracking-[0.2em] text-orange-600 hover:text-black transition-colors">COMPRAR PÃO DE QUEIJO</Link>
                            <Link href="/loja" onClick={() => setMenuMobileAberto(false)} className="text-2xl font-black uppercase italic tracking-tighter border-b-4 border-orange-600 pb-1">LOJA LIFESTYLE</Link>

                            <div className="w-full h-px bg-gray-100 my-4"></div>

                            {/* LINKS DE RASTREIO E SUPORTE NO MOBILE */}
                            <div className="flex flex-col space-y-6">
                                <Link href="/pedidos" onClick={() => setMenuMobileAberto(false)} className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:text-orange-600 transition-colors">
                                    <i className="bi bi-box-seam text-xl"></i> Rastrear Pedido
                                </Link>
                                <Link href="/suporte" onClick={() => setMenuMobileAberto(false)} className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:text-orange-600 transition-colors">
                                    <i className="bi bi-arrow-left-right text-xl"></i> Trocas & Devoluções
                                </Link>
                            </div>

                            {/* REDES SOCIAIS MOBILE */}
                            <div className="flex justify-center items-center gap-8 pt-8">
                                <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-3xl text-gray-800 hover:text-orange-600"><i className="bi bi-instagram"></i></a>
                                <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-3xl text-gray-800 hover:text-orange-600"><i className="bi bi-facebook"></i></a>
                                <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-3xl text-gray-800 hover:text-orange-600"><i className="bi bi-youtube"></i></a>
                            </div>
                        </div>

                        <div className="p-8 text-center border-t border-gray-50 bg-gray-50/50">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© Pão de Queijo da Irá</p>
                        </div>
                    </nav>
                </div>
            </header>

            {/*<main className="max-w-2xl mx-auto py-16 px-6">*/}
            <main className="flex-grow py-20 px-6 max-w-4xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic leading-none text-black">
                       TROCAS E <span className="text-orange-600">DEVOLUÇÕES</span>
                    </h1>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-600">
                        Preencha os dados abaixo para iniciar o processo
                    </p>
                </div>

                {!enviado ? (
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow-sm border border-gray-100 rounded-3xl">
                        {/* Campos de Nome e E-mail */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nome Completo</label>
                                <input required type="text" className="w-full border-b-2 border-gray-100 focus:border-orange-600 outline-none py-2 text-sm transition-all"
                                    value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">E-mail</label>
                                <input required type="email" className="w-full border-b-2 border-gray-100 focus:border-orange-600 outline-none py-2 text-sm transition-all"
                                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                            </div>
                        </div>

                        {/* Campos de Pedido e Motivo */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">ID do Pedido (UUID)</label>
                                <input required type="text" placeholder="Cole o código do pedido aqui" className="w-full border-b-2 border-gray-100 focus:border-orange-600 outline-none py-2 text-sm transition-all"
                                    value={form.pedido} onChange={e => setForm({ ...form, pedido: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Motivo</label>
                                <select className="w-full border-b-2 border-gray-100 focus:border-orange-600 outline-none py-2 text-sm bg-transparent"
                                    value={form.motivo} onChange={e => setForm({ ...form, motivo: e.target.value })}>
                                    <option>Troca de Tamanho</option>
                                    <option>Defeito de Fábrica</option>
                                    <option>Produto Errado</option>
                                    <option>Arrependimento</option>
                                </select>
                            </div>
                        </div>

                        {/* Campo de Mensagem */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Detalhes</label>
                            <textarea required rows="4" className="w-full border-2 border-gray-100 focus:border-orange-600 outline-none p-3 text-sm rounded-xl transition-all"
                                value={form.mensagem} onChange={e => setForm({ ...form, mensagem: e.target.value })} />
                        </div>

                        <button disabled={loading} className="w-full bg-black text-white py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-orange-600 transition-all disabled:opacity-50 rounded-full shadow-lg">
                            {loading ? 'Enviando...' : 'Enviar Solicitação'}
                        </button>
                    </form>
                ) : (
                    <div className="text-center bg-white p-12 border border-orange-100 rounded-[40px] shadow-xl">
                        <i className="bi bi-check-circle text-6xl text-orange-600 mb-6 block"></i>
                        <h2 className="text-2xl font-black uppercase italic mb-2">Solicitação Recebida!</h2>
                        <p className="text-sm text-gray-600 mb-8">Entraremos em contato em até 48h úteis.</p>
                        <Link href="/loja" className="bg-black text-white px-8 py-4 font-black uppercase text-[10px] rounded-full hover:bg-orange-600 transition-colors">Voltar para Loja</Link>
                    </div>
                )}
            </main>

            {/* FOOTER */}
            <footer className="py-20 px-6 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                        {/* COLUNA 1: LOGO E REDES SOCIAIS */}
                        <div className="flex flex-col items-center md:items-start space-y-[-2]">
                            <a href="/">
                                <img src="/logo-paodequeijodaira.jpg" className="h-20" alt="Logo" />
                            </a>
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 text-center md:text-left"></h4>
                                <div className="flex gap-6 justify-center md:justify-start space-x-2">
                                    <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-instagram"></i></a>
                                    <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-facebook"></i></a>
                                    <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-youtube"></i></a>
                                </div>
                            </div>
                        </div>

                        {/* COLUNA 2: AJUDA & SUPORTE */}
                        <div className="text-center md:text-left space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Ajuda & Suporte</h4>
                            <div className="space-y-4">
                                <Link href="/pedidos" className="flex items-start justify-center md:justify-start gap-3 group">
                                    <i className="bi bi-box-seam text-orange-600 text-lg"></i>
                                    <p className="text-sm tracking-widest group-hover:text-orange-600 transition-colors leading-tight pt-2">Rastrear Pedido</p>
                                </Link>
                                <Link href="/suporte" className="flex items-start justify-center md:justify-start gap-3 group">
                                    <i className="bi bi-arrow-left-right text-orange-600 text-lg"></i>
                                    <p className="text-sm tracking-widest group-hover:text-orange-600 transition-colors leading-tight pt-2">Trocas e Devoluções</p>
                                </Link>
                                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="flex items-start justify-center md:justify-start gap-3 group">
                                    <i className="bi bi-whatsapp text-orange-600 text-lg"></i>
                                    <p className="text-sm tracking-widest group-hover:text-orange-600 transition-colors leading-tight pt-2">Fale Conosco</p>
                                </a>
                            </div>
                        </div>

                        {/* COLUNA 3: FUNCIONAMENTO & LOCALIZAÇÃO */}
                        <div className="text-center md:text-left space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Funcionamento & Retirada</h4>
                            <div className="flex items-start justify-center md:justify-start gap-3">
                                <i className="bi bi-clock text-orange-600 text-lg"></i>
                                <p className="text-sm text-gray-600 leading-tight">Seg a Sáb: 08:00 às 18:00<br />Dom: 08:00 às 12:00</p>
                            </div>
                            <div className="flex items-start justify-center md:justify-start gap-3 pt-2">
                                <a href="https://maps.app.goo.gl/oGCHp5i9y8HnPutg9" target="_blank" className="text-2xl hover:text-orange-600">
                                    <i className="bi bi-geo-alt text-orange-600 text-lg"></i>
                                </a>
                                <p className="text-sm text-gray-600 leading-relaxed">Quadra 4 Lote 26 Condomínio Flores do Cerrado II<br />Recreio Mossoró - Cidade Ocidental-GO</p>
                            </div>
                        </div>

                        {/* COLUNA 4: INSTITUCIONAL & DIREITOS */}
                        <div className="text-center md:text-right space-y-4 flex flex-col items-center md:items-end">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Institucional</h4>
                            <div className="text-center md:text-right">
                                <h3 className="text-lg font-black uppercase mb-2">Pão de Queijo da Irá</h3>
                                <p className="mt-2 space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    <a href="/termos" className="hover:text-black">Termos de Uso</a><i className="bi bi-file-text text-gray-400 group-hover:text-orange-600 transition-colors"></i>
                                    <span>|</span>
                                    <a href="/privacidade" className="hover:text-black">Privacidade</a>
                                    <i className="bi bi-shield-check text-gray-400 group-hover:text-orange-600 transition-colors"></i></p>
                                <p className="text-[10px] py-2 font-bold text-gray-400 uppercase tracking-widest">© 2026 - Todos os direitos reservados.</p>
                            </div>
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
