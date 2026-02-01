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

    async function fetchTrocas() {
        setLoading(true);
        const { data, error } = await supabase
            .from('trocas')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (!error) setTrocas(data);
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-900 flex flex-col">
            <Head><title>Admin | Gestão de Trocas</title></Head>

            {/* NAVBAR INTEGRADA (PAINEL DE NAVEGAÇÃO) */}
            <header className="bg-black text-white p-6 sticky top-0 z-[100] flex justify-between items-center shadow-2xl">
                <div className="flex items-center gap-6">
                    <h1 className="text-xl font-black uppercase italic tracking-tighter">
                        Painel <span className="text-orange-600">Admin</span>
                    </h1>
                    <nav className="flex bg-white/10 rounded-full p-1">
                        <button onClick={() => router.push('/admin/vendas')} className="px-6 py-2 rounded-full text-[10px] font-black uppercase text-gray-400 hover:text-white transition-all">Vendas</button>
                        <button className="px-6 py-2 rounded-full text-[10px] font-black uppercase bg-orange-600 shadow-lg shadow-orange-600/20">Trocas</button>
                    </nav>
                </div>
                <button onClick={() => supabase.auth.signOut().then(() => router.push('/admin/login'))} className="bg-red-600/20 text-red-500 p-2 px-4 rounded-full text-[10px] font-black uppercase transition-all">Sair</button>
            </header>

            <main className="p-4 md:p-10 max-w-5xl mx-auto w-full">
                <div className="mb-10">
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter">Trocas & <span className="text-orange-600">Suporte</span></h2>
                </div>

                {/* FILTROS DE TROCA */}
                <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
                    {['Pendente', 'Autorizado', 'Recusado'].map((f) => (
                        <button key={f} onClick={() => setFiltro(f)} 
                            className={`px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest border transition-all shadow-sm ${filtro === f ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100'}`}>
                            {f}
                        </button>
                    ))}
                </div>

                {/* LISTAGEM DE TROCAS */}
                <div className="grid grid-cols-1 gap-6">
                    {trocas.filter(t => t.status === filtro).map((troca) => (
                        <div key={troca.id} className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm">
                            <h3 className="text-lg font-black uppercase italic text-gray-800">{troca.cliente_email}</h3>
                            <div className="bg-gray-50 rounded-2xl p-4 mt-4 mb-6 italic text-sm text-gray-600">
                                "{troca.descricao}"
                            </div>
                            <span className="text-[10px] font-black uppercase bg-orange-50 text-orange-600 px-3 py-1 rounded-full">Motivo: {troca.motivo}</span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
    }
