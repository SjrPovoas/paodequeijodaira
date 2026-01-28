"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function AdminTrocas() {
    const [loading, setLoading] = useState(true);
    const [trocas, setTrocas] = useState([]);
    const [filtro, setFiltro] = useState('Pendente');
    const router = useRouter();

    // Proteção de Rota: Verifica se o admin está logado
    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session || session.user.email !== 'sjrpovoas@gmail.com') {
                router.push('/admin/login'); // ou o nome do seu arquivo de login
            } else {
                fetchTrocas();
            }
        };
        checkAdmin();
    }, []);

    async function fetchTrocas() {
        setLoading(true);
        const { data, error } = await supabase
            .from('trocas')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (!error) setTrocas(data);
        setLoading(false);
    }

    const handleStatus = async (id, novoStatus) => {
        const { error } = await supabase
            .from('trocas')
            .update({ status: novoStatus })
            .eq('id', id);

        if (!error) fetchTrocas();
    };

    const handleSair = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] font-sans text-black flex flex-col selection:bg-orange-200">
            <Head>
                <title>Gestão de Trocas | Admin</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
            </Head>

            {/* HEADER BRUTALISTA */}
            <header className="bg-black text-white p-6 border-b-[8px] border-orange-600 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <div className="bg-orange-600 px-3 py-1 font-black italic uppercase text-[10px]">Gerência</div>
                    <h1 className="text-xl font-black uppercase italic tracking-tighter">Trocas & <span className="text-orange-600">Devoluções</span></h1>
                </div>
                <button onClick={handleSair} className="bg-white text-black px-4 py-2 font-black uppercase text-[10px] hover:bg-orange-600 hover:text-white transition-all border-2 border-black">
                    Sair [×]
                </button>
            </header>

            <main className="p-4 md:p-10 max-w-6xl mx-auto w-full flex-grow">
                {/* FILTROS RAPIDOS */}
                <div className="flex gap-4 mb-10 overflow-x-auto pb-4">
                    {['Pendente', 'Autorizado', 'Recusado'].map((f) => (
                        <button 
                            key={f}
                            onClick={() => setFiltro(f)}
                            className={`px-6 py-2 font-black uppercase text-[10px] tracking-[0.2em] border-4 transition-all whitespace-nowrap ${filtro === f ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]' : 'bg-white border-gray-200 text-gray-400 hover:border-black'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center py-20 font-black uppercase italic animate-pulse text-2xl">Acessando Database...</div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {trocas.filter(t => t.status === filtro).map((troca) => (
                            <div key={troca.id} className="bg-white border-[6px] border-black p-6 md:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[16px_16px_0px_0px_rgba(234,88,12,1)] transition-all">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                                    <div>
                                        <p className="text-[10px] font-black text-orange-600 uppercase mb-1">Solicitação #{troca.id.slice(0,8)}</p>
                                        <h2 className="text-2xl font-black uppercase italic leading-none">{troca.cliente_email}</h2>
                                        <p className="text-xs font-bold text-gray-400 mt-2 uppercase">Pedido: {troca.pedido_id}</p>
                                    </div>
                                    <div className="bg-black text-white px-4 py-2 text-[10px] font-black uppercase italic tracking-widest">
                                        Motivo: {troca.motivo}
                                    </div>
                                </div>

                                <div className="bg-gray-50 border-l-8 border-black p-4 mb-8">
                                    <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Relato do Cliente:</p>
                                    <p className="text-sm font-medium italic text-gray-700 leading-relaxed">"{troca.descricao}"</p>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    {troca.status === 'Pendente' && (
                                        <>
                                            <button onClick={() => handleStatus(troca.id, 'Autorizado')} className="bg-green-500 text-white px-8 py-3 font-black uppercase text-[10px] tracking-widest border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                                                ✓ Autorizar Troca
                                            </button>
                                            <button onClick={() => handleStatus(troca.id, 'Recusado')} className="bg-red-500 text-white px-8 py-3 font-black uppercase text-[10px] tracking-widest border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                                                ✕ Recusar
                                            </button>
                                        </>
                                    )}
                                    <button className="bg-white text-black px-8 py-3 font-black uppercase text-[10px] tracking-widest border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all flex items-center gap-2">
                                        <i className="bi bi-printer-fill"></i> Gerar Etiqueta
                                    </button>
                                </div>
                            </div>
                        ))}

                        {trocas.filter(t => t.status === filtro).length === 0 && (
                            <div className="text-center py-20 border-4 border-dashed border-gray-200">
                                <p className="font-black uppercase text-gray-300 italic">Nenhuma solicitação nesta categoria</p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* MENU FLUTUANTE DE NAVEGAÇÃO ADMIN */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center bg-black border-4 border-orange-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-1">
                <button 
                    onClick={() => router.push('/admin/vendas')}
                    className={`px-4 py-3 flex flex-col items-center gap-1 transition-all ${router.pathname.includes('vendas') ? 'bg-orange-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    <i className="bi bi-cart-check-fill text-lg"></i>
                    <span className="text-[8px] font-black uppercase tracking-tighter">Vendas</span>
                </button>

                <div className="w-[2px] h-8 bg-orange-600/30 mx-1"></div>

                <button 
                    onClick={() => router.push('/admin/trocas')}
                    className={`px-4 py-3 flex flex-col items-center gap-1 transition-all ${router.pathname.includes('trocas') ? 'bg-orange-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    <i className="bi bi-arrow-left-right text-lg"></i>
                    <span className="text-[8px] font-black uppercase tracking-tighter">Trocas</span>
                </button>

                <div className="w-[2px] h-8 bg-orange-600/30 mx-1"></div>

                <button 
                    onClick={handleSair}
                    className="px-4 py-3 flex flex-col items-center gap-1 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                >
                    <i className="bi bi-power text-lg"></i>
                    <span className="text-[8px] font-black uppercase tracking-tighter">Sair</span>
                </button>
            </div>

            <footer className="p-8 text-center text-[9px] font-black uppercase tracking-[0.5em] text-gray-400">
                Admin System v2.0 // Pão de Queijo da Irá Lifestyle
            </footer>
        </div>
    );
                                        }
