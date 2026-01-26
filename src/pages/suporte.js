"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

export default function Suporte() {
    // ESTADOS DE INTERFACE
    const [loading, setLoading] = useState(false);
    const [enviado, setEnviado] = useState(false);
    const [menuMobileAberto, setMenuMobileAberto] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [faqAberto, setFaqAberto] = useState(null); // Controla qual pergunta do FAQ está aberta

    const WHATSAPP_NUMBER = "5561982777196";
    
    // ESTADO DO FORMULÁRIO
    const [form, setForm] = useState({ 
        nome: '', 
        email: '', 
        pedido: '', 
        motivo: 'Troca de Tamanho', 
        mensagem: '' 
    });

    // Lógica para mostrar/esconder botão de voltar ao topo
    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Função para abrir/fechar o FAQ
    const toggleFaq = (index) => {
        setFaqAberto(faqAberto === index ? null : index);
    };

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
        <div className="min-h-screen bg-[#FFFDF5] font-sans text-black overflow-x-hidden flex flex-col">
            <Head>
                <title>Suporte: Trocas & Devoluções | Loja Lifestyle e Acessórios | Pão de Queijo da Irá</title>
                <link rel="canonical" href="https://paodequeijodaira.vercel.app/suporte" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
            </Head>

            {/* 1. BARRA DE ANÚNCIO TOPO */}
            <div className="bg-orange-600 text-white py-2 text-center text-[10px] font-black uppercase tracking-widest sticky top-0 z-[120]">
                • Entrega em todo Brasil • Frete Grátis acima de R$ 500,00 •
            </div>

            {/* 2. HEADER FIXO */}
            <header className="py-4 px-6 sticky top-[28px] bg-white/95 backdrop-blur-md z-[110] border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/">
                        <img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto cursor-pointer" />
                    </Link>

                    {/* Navegação Desktop */}
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

                    {/* Menu Mobile Button */}
                    <div className="flex md:hidden items-center">
                        <button onClick={() => setMenuMobileAberto(true)} className="text-orange-600 p-2">
                            <i className="bi bi-list text-3xl"></i>
                        </button>
                    </div>
                </div>

                {/* ESTRUTURA MENU MOBILE */}
                <div className={`fixed inset-0 z-[1000] transition-all duration-500 ${menuMobileAberto ? 'visible' : 'invisible'}`}>
                    <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${menuMobileAberto ? 'opacity-100' : 'opacity-0'}`}
                        onClick={() => setMenuMobileAberto(false)}></div>
                    <nav className={`absolute top-0 right-0 w-[100%] h-screen bg-white transition-transform duration-500 ease-in-out shadow-2xl flex flex-col z-[1001] ${menuMobileAberto ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="flex justify-end p-6">
                            <button onClick={() => setMenuMobileAberto(false)} className="text-3xl text-orange-600">
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <div className="flex-1 flex flex-col justify-center items-center space-y-8 text-center px-10">
                            <Link href="#web3" onClick={() => setMenuMobileAberto(false)} className="text-sm font-black uppercase tracking-[0.2em]">IRÁ DIGITAL GENESIS PASS</Link>
                            <Link href="/" onClick={() => setMenuMobileAberto(false)} className="text-sm font-black uppercase tracking-[0.2em] text-orange-600">COMPRAR PÃO DE QUEIJO</Link>
                            <Link href="/loja" onClick={() => setMenuMobileAberto(false)} className="text-2xl font-black uppercase italic tracking-tighter border-b-4 border-orange-600 pb-1">LOJA LIFESTYLE</Link>
                            <div className="w-full h-px bg-gray-100 my-4"></div>
                            <div className="flex flex-col space-y-6">
                                <Link href="/pedidos" className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3"><i className="bi bi-box-seam text-xl"></i> Rastrear Pedido</Link>
                                <Link href="/suporte" className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3"><i className="bi bi-arrow-left-right text-xl"></i> Trocas & Devoluções</Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            {/* 3. CONTEÚDO PRINCIPAL (FORMULÁRIO) */}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nome Completo</label>
                                <input required type="text" className="w-full border-b-2 border-gray-100 focus:border-orange-600 outline-none py-2 text-sm"
                                    value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">E-mail</label>
                                <input required type="email" className="w-full border-b-2 border-gray-100 focus:border-orange-600 outline-none py-2 text-sm"
                                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">ID do Pedido (UUID)</label>
                                <input required type="text" placeholder="Cole o código do pedido aqui" className="w-full border-b-2 border-gray-100 focus:border-orange-600 outline-none py-2 text-sm"
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

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Detalhes</label>
                            <textarea required rows="4" className="w-full border-2 border-gray-100 focus:border-orange-600 outline-none p-3 text-sm rounded-xl"
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

                {/* 4. SEÇÃO FAQ COM BOTÕES RETRÁTEIS (NOVA) */}
                <section className="mt-20 border-t border-gray-100 pt-16">
                    <div className="text-center mb-10">
                        <h4 className="font-black uppercase text-[10px] tracking-[0.3em] text-orange-600 mb-2">Dúvidas Frequentes</h4>
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter">Central de Transparência</h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                pergunta: "Qual o prazo para desistência da compra?",
                                resposta: "Conforme o Artigo 49 do Código de Defesa do Consumidor (Lei 8.078/90), você tem o 'Direito de Arrependimento', que permite desistir da compra em até 7 dias corridos após o recebimento, com reembolso total, inclusive do frete."
                            },
                            {
                                pergunta: "Como funciona a troca por defeito de fabricação?",
                                resposta: "Para produtos duráveis com defeito, a Lei vigente estabelece um prazo de até 90 dias para reclamação. Após o envio para análise e constatação do defeito, realizaremos a troca por um novo item ou o reparo em até 30 dias."
                            },
                            {
                                pergunta: "Posso trocar um tamanho que ficou apertado?",
                                resposta: "Sim! Embora a lei não obrigue a troca por motivos de gosto ou tamanho, a Loja Lifestyle e Acessórios | Pão de Queijo da Irá oferece essa cortesia em até 7 dias, desde que a etiqueta esteja fixada e o produto sem sinais de uso."
                            },
                            {
                                pergunta: "Quem paga o frete na devolução?",
                                resposta: "Em casos de arrependimento (dentro dos 7 dias) ou defeito de fabricação, os custos de frete de retorno e reenvio são integralmente por nossa conta, conforme prevê a legislação nacional de consumo (Lei 8.078/90)."
                            }
                        ].map((item, index) => (
                            <div key={index} className="border border-gray-100 rounded-2xl overflow-hidden bg-white transition-all hover:border-orange-200 shadow-sm">
                                <button 
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex justify-between items-center p-5 text-left transition-colors"
                                >
                                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-800">{item.pergunta}</span>
                                    <i className={`bi bi-chevron-down text-orange-600 transition-transform duration-300 ${faqAberto === index ? 'rotate-180' : ''}`}></i>
                                </button>
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${faqAberto === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-5 pt-0 text-xs text-gray-500 leading-relaxed border-t border-gray-50">
                                        {item.resposta}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* 5. FOOTER PERSONALIZADO */}
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
