"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function AdminVendas() {
    const [loading, setLoading] = useState(true);
    const [pedidos, setPedidos] = useState([]);
    const [statusFiltro, setStatusFiltro] = useState('Pago via MP');
    const router = useRouter();

    // 1. PROTEÇÃO E CARREGAMENTO
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

    // 2. CÁLCULO DE MÉTRICAS (Faturamento e Pendências)
    const metrics = {
        totalFaturado: pedidos
            .filter(p => p.status_pagamento?.includes('Pago'))
            .reduce((acc, curr) => acc + (curr.total_geral || 0), 0),
        pendentesEnvio: pedidos.filter(p => p.status_pagamento?.includes('Pago')).length,
        totalPedidos: pedidos.length
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-900 flex flex-col">
            <Head><title>Admin | Gestão de Vendas</title></Head>

            {/* NAVBAR INTEGRADA */}
            <header className="bg-black text-white p-6 sticky top-0 z-[100] flex justify-between items-center shadow-2xl">
                <div className="flex items-center gap-6">
                    <h1 className="text-xl font-black uppercase italic tracking-tighter">
                        Painel <span className="text-orange-600">Admin</span>
                    </h1>
                    <nav className="flex bg-white/10 rounded-full p-1">
                        <button className="px-6 py-2 rounded-full text-[10px] font-black uppercase bg-orange-600 shadow-lg shadow-orange-600/20">Vendas</button>
                        <button onClick={() => router.push('/admin/trocas')} className="px-6 py-2 rounded-full text-[10px] font-black uppercase text-gray-400 hover:text-white transition-all">Trocas</button>
                    </nav>
                </div>
                <button onClick={() => supabase.auth.signOut().then(() => router.push('/admin/login'))} className="bg-red-600/20 text-red-500 p-2 px-4 rounded-full text-[10px] font-black uppercase transition-all">Sair</button>
            </header>

            <main className="p-4 md:p-10 max-w-7xl mx-auto w-full">
                
                {/* 3. PAINEL DE MÉTRICAS (CARDS) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Faturamento Total</p>
                        <h3 className="text-3xl font-black italic text-gray-900">R$ {metrics.totalFaturado.toFixed(2)}</h3>
                    </div>
                    <div className="bg-orange-600 p-8 rounded-[40px] shadow-lg shadow-orange-100 text-white">
                        <p className="text-[10px] font-black text-orange-200 uppercase tracking-widest mb-2">Aguardando Envio</p>
                        <h3 className="text-3xl font-black italic">{metrics.pendentesEnvio} Pedidos</h3>
                    </div>
                    <div className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total de Ordens</p>
                        <h3 className="text-3xl font-black italic text-gray-800">{metrics.totalPedidos}</h3>
                    </div>
                </div>

                {/* FILTROS DE STATUS */}
                <div className="flex gap-2 mb-10 overflow-x-auto pb-4 custom-scrollbar">
                    {['Aguardando Pagamento', 'Pago via Cripto', 'Pago via MP', 'Enviado'].map((s) => (
                        <button key={s} onClick={() => setStatusFiltro(s)}
                            className={`px-6 py-3 rounded-full font-black uppercase text-[9px] tracking-widest border transition-all ${statusFiltro === s ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100'}`}>
                            {s}
                        </button>
                    ))}
                </div>

                {/* LISTAGEM DE PEDIDOS (RESUMIDA) */}
                <div className="space-y-4">
                    {pedidos.filter(p => p.status_pagamento === statusFiltro).map((pedido) => (
                        <div key={pedido.id} className="bg-white border border-gray-100 p-6 rounded-[30px] flex justify-between items-center shadow-sm">
                            <div>
                                <h4 className="font-black uppercase italic text-gray-800">{pedido.nome}</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">{pedido.email}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-black text-lg text-orange-600">R$ {pedido.total_geral?.toFixed(2)}</p>
                                <button className="text-[9px] font-black uppercase tracking-tighter text-blue-500 underline">Ver Detalhes</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
