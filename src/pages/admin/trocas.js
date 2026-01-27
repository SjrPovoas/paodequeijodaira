"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function AdminTrocas() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, web3: 0, tradicional: 0 });
    const router = useRouter();

    // 1. PROTEÇÃO DE ROTA (Mesma lógica do seu Login)
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session || session.user.email !== 'sjrpovoas@gmail.com') {
                router.push('/admin'); // Manda de volta pro login se não for você
            } else {
                fetchPedidos();
            }
        };
        checkAuth();
    }, [router]);

    // 2. BUSCA DE PEDIDOS COM FOCO EM WEB3
    const fetchPedidos = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('pedidos')
            .select('*')
            .order('criado_em', { ascending: false });

        if (!error && data) {
            setPedidos(data);
            // Calcula estatísticas rápidas
            const web3Count = data.filter(p => p.transacao_hash).length;
            setStats({
                total: data.length,
                web3: web3Count,
                tradicional: data.length - web3Count
            });
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin');
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] p-4 md:p-10 font-sans">
            <Head>
                <title>Admin Dashboard | Gestão Lifestyle</title>
            </Head>

            <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                    <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
                        GESTÃO DE <span className="text-orange-600">PEDIDOS</span>
                    </h1>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2 italic">
                        Monitoramento Web3 & Slippage (5%)
                    </p>
                </div>
                <div className="flex gap-4">
                    <button onClick={fetchPedidos} className="bg-white border-4 border-black p-3 hover:bg-gray-100 transition-all">
                        <i className="bi bi-arrow-clockwise text-xl"></i>
                    </button>
                    <button onClick={handleLogout} className="bg-black text-white px-6 py-3 font-black uppercase text-[10px] tracking-widest shadow-[6px_6px_0px_0px_rgba(234,88,12,1)]">
                        Sair do Painel
                    </button>
                </div>
            </header>

            {/* CARDS DE RESUMO (ESTILO BRUTALISTA) */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white border-[4px] border-black p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-[10px] font-black uppercase text-gray-400">Total de Vendas</p>
                    <p className="text-4xl font-black italic">{stats.total}</p>
                </div>
                <div className="bg-[#8247E5] border-[4px] border-black p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-white">
                    <p className="text-[10px] font-black uppercase opacity-70">Pedidos Web3 (POL)</p>
                    <p className="text-4xl font-black italic">{stats.web3}</p>
                </div>
                <div className="bg-orange-600 border-[4px] border-black p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-white">
                    <p className="text-[10px] font-black uppercase opacity-70">Pagamentos em BRL</p>
                    <p className="text-4xl font-black italic">{stats.tradicional}</p>
                </div>
            </div>

            {/* TABELA DE PEDIDOS */}
            <main className="max-w-7xl mx-auto bg-white border-[6px] border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black text-white text-[10px] font-black uppercase tracking-widest">
                            <tr>
                                <th className="p-6">ID / Data</th>
                                <th className="p-6">Cliente / E-mail</th>
                                <th className="p-6">Método</th>
                                <th className="p-6">Valor (BRL)</th>
                                <th className="p-6">Status</th>
                                <th className="p-6">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-4 divide-gray-100">
                            {loading ? (
                                <tr><td colSpan="6" className="p-20 text-center font-black animate-pulse">CARREGANDO DADOS...</td></tr>
                            ) : pedidos.map((pedido) => (
                                <tr key={pedido.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-6">
                                        <p className="font-black text-xs">#{pedido.id.slice(0, 8)}</p>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase">{new Date(pedido.criado_em).toLocaleDateString('pt-BR')}</p>
                                    </td>
                                    <td className="p-6">
                                        <p className="font-bold text-xs">{pedido.cliente_nome || 'N/A'}</p>
                                        <p className="text-[9px] text-gray-400">{pedido.cliente_email}</p>
                                    </td>
                                    <td className="p-6">
                                        {pedido.transacao_hash ? (
                                            <div className="flex flex-col">
                                                <span className="bg-[#8247E5] text-white text-[8px] font-black px-2 py-1 rounded-sm uppercase w-fit">POL Network</span>
                                                <span className="text-[8px] text-purple-600 mt-1 font-bold">Inc. 5% Slippage</span>
                                            </div>
                                        ) : (
                                            <span className="bg-gray-200 text-gray-600 text-[8px] font-black px-2 py-1 rounded-sm uppercase w-fit">Mercado Pago</span>
                                        )}
                                    </td>
                                    <td className="p-6 font-black text-sm">
                                        R$ {pedido.total_brl?.toFixed(2)}
                                    </td>
                                    <td className="p-6">
                                        <span className={`text-[9px] font-black uppercase px-3 py-1 border-2 ${
                                            pedido.status.includes('Confirmado') ? 'border-green-600 text-green-600' : 'border-orange-600 text-orange-600'
                                        }`}>
                                            {pedido.status}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <button className="bg-black text-white p-2 hover:bg-orange-600 transition-all">
                                            <i className="bi bi-eye-fill"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
  }
