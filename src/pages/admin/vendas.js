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
    }, [router]);

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

            <header className="bg-black text-white p-6 border-b-[8px] border-orange-600 sticky top-0 z-[100]">
                <h1 className="text-xl font-black uppercase italic tracking-tighter">
                    Painel de <span className="text-orange-600">Vendas</span>
                </h1>
            </header>

            {/* MENU ADMIN FIXO NO TOPO DIREITO */}
            <div className="fixed top-4 right-4 z-[110] flex items-center bg-black border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(234,88,12,1)]">
                <button className="px-4 py-3 flex items-center gap-2 border-r-2 border-white/10 bg-orange-600 text-white">
                    <i className="bi bi-cart-check-fill"></i>
                    <span className="text-[9px] font-black uppercase hidden md:block">Vendas</span>
                </button>
                <button onClick={() => router.push('/admin/trocas')} className="px-4 py-3 flex items-center gap-2 border-r-2 border-white/10 text-gray-400 hover:text-white">
                    <i className="bi bi-arrow-left-right"></i>
                    <span className="text-[9px] font-black uppercase hidden md:block">Trocas</span>
                </button>
                <button onClick={handleSair} className="px-4 py-3 bg-red-600 text-white flex items-center gap-2">
                    <i className="bi bi-power"></i>
                    <span className="text-[9px] font-black uppercase hidden md:block">Sair</span>
                </button>
            </div>

            <main className="p-4 md:p-10 max-w-7xl mx-auto w-full flex-grow">
                <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
                    {['Pago', 'Enviado', 'Entregue', 'Cancelado'].map((s) => (
                        <button key={s} onClick={() => setStatusFiltro(s)}
                                className={`px-5 py-3 font-black uppercase text-[9px] border-4 transition-all ${statusFiltro === s ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]' : 'bg-white border-gray-200 text-gray-400'}`}>
                            {s}
                        </button>
                    ))}
                </div>

                <div className="space-y-6">
                    {pedidos.filter(p => p.status === statusFiltro).map((pedido) => (
                        <div key={pedido.id} className="bg-white border-[5px] border-black p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex-1 space-y-3">
                                <h2 className="text-xl font-black uppercase italic leading-none">{pedido.cliente_nome}</h2>
                                <p className="text-xs font-bold text-gray-500 uppercase">
                                    <i className="bi bi-geo-alt-fill text-orange-600"></i> {pedido.endereco_rua}, {pedido.endereco_numero} - {pedido.endereco_cidade}/{pedido.endereco_estado}
                                </p>
                            </div>
                            <div className="md:w-48 flex flex-col gap-2">
                                <p className="text-xl font-black italic">R$ {pedido.valor_total?.toFixed(2)}</p>
                                {statusFiltro === 'Pago' && (
                                    <button onClick={() => atualizarStatus(pedido.id, 'Enviado')} className="bg-black text-white py-2 font-black uppercase text-[9px] border-2 border-black">Enviar Ordem</button>
                                )}
                                <button className="bg-white border-2 border-black py-2 font-black text-[9px] uppercase hover:bg-orange-600 hover:text-white transition-all">Etiqueta</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
