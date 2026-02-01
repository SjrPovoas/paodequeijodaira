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

    // 1. PROTEÇÃO DE ROTA (sjrpovoas@gmail.com)
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

    // 2. BUSCA SOLICITAÇÕES DE TROCA
    async function fetchTrocas() {
        setLoading(true);
        const { data, error } = await supabase
            .from('trocas')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (!error) setTrocas(data);
        setLoading(false);
    }

    // 3. ATUALIZA STATUS DA SOLICITAÇÃO
    const handleStatus = async (id, novoStatus) => {
        const { error } = await supabase
            .from('trocas')
            .update({ status: novoStatus })
            .eq('id', id);

        if (!error) fetchTrocas();
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-900 flex flex-col selection:bg-orange-200">
            <Head>
                <title>Admin Trocas | Lifestyle</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
            </Head>

            {/* NAVBAR INTEGRADA (IDÊNTICA AO VENDAS.JS) */}
            <header className="bg-black text-white p-6 sticky top-0 z-[100] flex justify-between items-center shadow-2xl">
                <div className="flex items-center gap-6">
                    <h1 className="text-xl font-black uppercase italic tracking-tighter">
                        Painel <span className="text-orange-600">Admin</span>
                    </h1>
                    {/* Botões de Navegação entre Arquivos */}
                    <nav className="hidden md:flex bg-white/10 rounded-full p-1">
                        <button 
                            onClick={() => router.push('/admin/vendas')} 
                            className="px-6 py-2 rounded-full text-[10px] font-black uppercase text-gray-400 hover:text-white transition-all"
                        >
                            Vendas
                        </button>
                        <button className="px-6 py-2 rounded-full text-[10px] font-black uppercase bg-orange-600 shadow-lg shadow-orange-600/20 transition-all">
                            Trocas
                        </button>
                    </nav>
                </div>
                <button 
                    onClick={async () => { await supabase.auth.signOut(); router.push('/admin/login'); }}
                    className="bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white p-2 px-4 rounded-full text-[10px] font-black uppercase transition-all flex items-center gap-2"
                >
                    <i className="bi bi-power"></i> Sair
                </button>
            </header>

            <main className="p-4 md:p-10 max-w-5xl mx-auto w-full flex-grow">
                <div className="mb-12">
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter text-gray-900">Suporte & <span className="text-orange-600">Trocas</span></h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Logística Reversa e Satisfação do Cliente</p>
                </div>

                {/* FILTROS DE STATUS */}
                <div className="flex gap-3 mb-10 overflow-x-auto pb-2 custom-scrollbar">
                    {['Pendente', 'Autorizado', 'Recusado'].map((f) => (
                        <button 
                            key={f} 
                            onClick={() => setFiltro(f)} 
                            className={`px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest border transition-all shadow-sm whitespace-nowrap ${
                                filtro === f 
                                ? 'bg-black text-white border-black' 
                                : 'bg-white border-gray-100 text-gray-400 hover:border-orange-300'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* LISTA DE SOLICITAÇÕES */}
                {loading ? (
                    <div className="text-center py-20 animate-pulse font-black text-orange-600 uppercase tracking-widest">Sincronizando...</div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {trocas.filter(t => t.status === filtro).length === 0 && (
                            <div className="text-center py-20 text-gray-300 font-black uppercase italic">Nenhuma solicitação {filtro}</div>
                        )}

                        {trocas.filter(t => t.status === filtro).map((troca) => (
                            <div key={troca.id} className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm hover:shadow-xl transition-all group">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                                    <div>
                                        <h3 className="text-xl font-black uppercase italic text-gray-800">{troca.cliente_email}</h3>
                                        <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mt-1">Pedido Ref: #{troca.pedido_id?.slice(0, 8)}</p>
                                    </div>
                                    <span className="bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-[10px] font-black uppercase italic border border-orange-100">
                                        Motivo: {troca.motivo}
                                    </span>
                                </div>
                                
                                <div className="bg-gray-50 rounded-[24px] p-6 mb-8 border border-gray-100 relative">
                                    <i className="bi bi-quote absolute top-2 left-2 text-gray-200 text-4xl"></i>
                                    <p className="text-sm font-medium text-gray-600 italic leading-relaxed relative z-10">
                                        {troca.descricao || "Nenhuma descrição fornecida."}
                                    </p>
                                </div>

                                {troca.status === 'Pendente' && (
                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => handleStatus(troca.id, 'Autorizado')} 
                                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-green-100"
                                        >
                                            <i className="bi bi-check-lg mr-2"></i> Autorizar
                                        </button>
                                        <button 
                                            onClick={() => handleStatus(troca.id, 'Recusado')} 
                                            className="flex-1 bg-white border border-red-200 text-red-500 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all"
                                        >
                                            <i className="bi bi-x-lg mr-2"></i> Recusar
                                        </button>
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
