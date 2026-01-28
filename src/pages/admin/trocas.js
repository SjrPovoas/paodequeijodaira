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

    // PROTEÇÃO DE ROTA: Apenas o seu e-mail acessa
    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session || session.user.email !== 'sjrpovoas@gmail.com') {
                router.push('/admin/login');
            } else {
                fetchTrocas();
            }
        };
        checkAdmin();
    }, [router]);

    // BUSCA DADOS NO SUPABASE (Tabela: trocas)
    async function fetchTrocas() {
        setLoading(true);
        const { data, error } = await supabase
            .from('trocas')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (!error) setTrocas(data);
        setLoading(false);
    }

    // ATUALIZA STATUS (Autorizado / Recusado)
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

            {/* HEADER SIMPLES */}
            <header className="bg-black text-white p-6 border-b-[8px] border-orange-600 sticky top-0 z-[100]">
                <h1 className="text-xl font-black uppercase italic tracking-tighter">
                    Trocas & <span className="text-orange-600">Devoluções</span>
                </h1>
            </header>

            {/* MENU ADMIN FIXO NO TOPO DIREITO */}
            <div className="fixed top-4 right-4 z-[110] flex items-center bg-black border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(234,88,12,1)]">
                <button onClick={() => router.push('/admin/vendas')} className="px-4 py-3 flex items-center gap-2 border-r-2 border-white/10 text-gray-400 hover:text-white">
                    <i className="bi bi-cart-check-fill"></i>
                    <span className="text-[9px] font-black uppercase hidden md:block">Vendas</span>
                </button>
                <button className="px-4 py-3 flex items-center gap-2 border-r-2 border-white/10 bg-orange-600 text-white">
                    <i className="bi bi-arrow-left-right"></i>
                    <span className="text-[9px] font-black uppercase hidden md:block">Trocas</span>
                </button>
                <button onClick={handleSair} className="px-4 py-3 bg-red-600 text-white flex items-center gap-2">
                    <i className="bi bi-power"></i>
                    <span className="text-[9px] font-black uppercase hidden md:block">Sair</span>
                </button>
            </div>

            <main className="p-4 md:p-10 max-w-6xl mx-auto w-full flex-grow">
                {/* FILTROS */}
                <div className="flex gap-4 mb-10 overflow-x-auto pb-4">
                    {['Pendente', 'Autorizado', 'Recusado'].map((f) => (
                        <button key={f} onClick={() => setFiltro(f)} 
                                className={`px-6 py-2 font-black uppercase text-[10px] border-4 transition-all ${filtro === f ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]' : 'bg-white border-gray-200 text-gray-400'}`}>
                            {f}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center py-20 font-black uppercase italic animate-pulse">Carregando...</div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {trocas.filter(t => t.status === filtro).map((troca) => (
                            <div key={troca.id} className="bg-white border-[6px] border-black p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-xl font-black uppercase italic">{troca.cliente_email}</h2>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Pedido: {troca.pedido_id}</p>
                                    </div>
                                    <span className="bg-black text-white px-3 py-1 text-[9px] font-black uppercase italic">{troca.motivo}</span>
                                </div>
                                <div className="bg-gray-50 border-l-8 border-black p-4 mb-6">
                                    <p className="text-sm italic">"{troca.descricao}"</p>
                                </div>
                                {troca.status === 'Pendente' && (
                                    <div className="flex gap-4">
                                        <button onClick={() => handleStatus(troca.id, 'Autorizado')} className="bg-green-500 text-white px-6 py-2 font-black text-[10px] border-2 border-black">Autorizar</button>
                                        <button onClick={() => handleStatus(troca.id, 'Recusado')} className="bg-red-500 text-white px-6 py-2 font-black text-[10px] border-2 border-black">Recusar</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
                                    }
