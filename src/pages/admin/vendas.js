"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function AdminVendas() {
    const [loading, setLoading] = useState(true);
    const [pedidos, setPedidos] = useState([]);
    const [statusFiltro, setStatusFiltro] = useState('Pago');
    const router = useRouter();

    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session || session.user.email !== 'sjrpovoas@gmail.com') {
                router.push('/admin/login');
            } else {
                fetchPedidos();
            }
        };
        checkAdmin();
    }, []);

    async function fetchPedidos() {
        setLoading(true);
        const { data, error } = await supabase
            .from('pedidos')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (!error) setPedidos(data);
        setLoading(false);
    }

    const atualizarStatus = async (id, novoStatus) => {
        const { error } = await supabase
            .from('pedidos')
            .update({ status: novoStatus })
            .eq('id', id);
        if (!error) fetchPedidos();
    };

    const handleSair = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] font-sans text-black flex flex-col">
            <Head>
                <title>Gestão de Vendas | Admin</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
            </Head>

            {/* HEADER BRUTALISTA */}
            <header className="bg-black text-white p-6 border-b-[8px] border-orange-600 flex justify-between items-center sticky top-0 z-50">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <h1 className="text-xl font-black uppercase italic tracking-tighter leading-none">
                        Painel de <span className="text-orange-600">Vendas</span>
                    </h1>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => router.push('/admin/trocas')} className="hidden md:block bg-white/10 text-white px-4 py-2 font-black uppercase text-[10px] border border-white/20">Trocas</button>
                    <button onClick={handleSair} className="bg-orange-600 text-white px-4 py-2 font-black uppercase text-[10px] border-2 border-black">Sair</button>
                </div>
            </header>

            <main className="p-4 md:p-10 max-w-7xl mx-auto w-full flex-grow">
                {/* STATUS BAR */}
                <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
                    {['Pago', 'Enviado', 'Entregue', 'Cancelado'].map((s) => (
                        <button 
                            key={s}
                            onClick={() => setStatusFiltro(s)}
                            className={`px-5 py-3 font-black uppercase text-[9px] tracking-widest border-4 transition-all ${statusFiltro === s ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]' : 'bg-white border-gray-200 text-gray-400'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center py-20 font-black uppercase italic animate-pulse">Sincronizando com a Blockchain...</div>
                ) : (
                    <div className="space-y-6">
                        {pedidos.filter(p => p.status === statusFiltro).map((pedido) => (
                            <div key={pedido.id} className="bg-white border-[5px] border-black p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between gap-6">
                                
                                {/* INFO CLIENTE */}
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-orange-600 text-white text-[9px] font-black px-2 py-0.5 italic">ORDEM #{pedido.id.slice(0,8).toUpperCase()}</span>
                                        <span className="text-[9px] font-bold text-gray-400">{new Date(pedido.created_at).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                    <h2 className="text-xl font-black uppercase italic leading-none">{pedido.cliente_nome}</h2>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-tight">
                                        <i className="bi bi-geo-alt-fill text-orange-600"></i> {pedido.endereco_rua}, {pedido.endereco_numero} - {pedido.endereco_cidade}/{pedido.endereco_estado}
                                    </p>
                                    <div className="pt-2">
                                        <p className="text-[10px] font-black uppercase text-gray-400">Produtos:</p>
                                        <p className="text-sm font-bold">{pedido.produtos_resumo || 'Itens da Loja Lifestyle'}</p>
                                    </div>
                                </div>

                                {/* AÇÕES E VALORES */}
                                <div className="md:w-64 flex flex-col justify-between border-t-2 md:border-t-0 md:border-l-2 border-gray-100 pt-4 md:pt-0 md:pl-6">
                                    <div className="mb-4">
                                        <p className="text-[9px] font-black uppercase text-gray-400">Total Pago</p>
                                        <p className="text-2xl font-black italic text-black">R$ {pedido.valor_total?.toFixed(2)}</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2">
                                        {statusFiltro === 'Pago' && (
                                            <button 
                                                onClick={() => atualizarStatus(pedido.id, 'Enviado')}
                                                className="bg-black text-white py-3 font-black uppercase text-[10px] tracking-widest border-2 border-black hover:bg-orange-600 transition-all shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]"
                                            >
                                                Marcar Enviado
                                            </button>
                                        )}
                                        <button className="bg-white text-black py-3 font-black uppercase text-[10px] tracking-widest border-2 border-black flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                                            <i className="bi bi-tag-fill text-orange-600"></i> Etiqueta
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {pedidos.filter(p => p.status === statusFiltro).length === 0 && (
                            <div className="text-center py-20 border-4 border-dashed border-gray-200">
                                <p className="font-black uppercase text-gray-300 italic">Sem vendas com status: {statusFiltro}</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
              }
