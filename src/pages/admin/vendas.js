"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function AdminVendas() {
    const [loading, setLoading] = useState(true);
    const [pedidos, setPedidos] = useState([]);
    const [statusFiltro, setStatusFiltro] = useState('Aguardando Pagamento');
    const router = useRouter();

    // 1. PROTEÇÃO DE ROTA E CARREGAMENTO
    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            // Acesso restrito ao seu e-mail
            if (!session || session.user.email !== 'sjrpovoas@gmail.com') {
                router.push('/admin/login');
            } else {
                fetchPedidos();
            }
        };
        checkAdmin();
    }, [router]);

    // 2. BUSCA PEDIDOS NO SUPABASE
    async function fetchPedidos() {
        setLoading(true);
        const { data, error } = await supabase
            .from('pedidos')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (!error) setPedidos(data);
        setLoading(false);
    }

    // 3. ATUALIZAÇÃO DE STATUS (Ex: Pago -> Enviado)
    const atualizarStatus = async (id, novoStatus) => {
        const { error } = await supabase
            .from('pedidos')
            .update({ status_pagamento: novoStatus })
            .eq('id', id);
        if (!error) fetchPedidos();
    };

    // 4. GERAÇÃO DE ETIQUETA DE ENVIO (FORMATO IMPRESSÃO)
    const gerarEtiqueta = (pedido) => {
        const win = window.open('', '_blank');
        win.document.write(`
            <html>
                <head><title>Etiqueta - ${pedido.nome}</title></head>
                <style>
                    body { font-family: sans-serif; padding: 40px; display: flex; justify-content: center; }
                    .etiqueta { border: 3px solid black; padding: 30px; width: 450px; border-radius: 15px; }
                    .logo { font-weight: 900; text-transform: uppercase; font-style: italic; margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
                    .info p { margin: 5px 0; font-size: 14px; font-weight: bold; text-transform: uppercase; }
                    .badge { display: inline-block; background: black; color: white; padding: 4px 10px; font-size: 10px; margin-top: 15px; }
                </style>
                <body>
                    <div class="etiqueta">
                        <div class="logo">Pão de Queijo da Irá <span style="color: orange;">//</span> Lifestyle</div>
                        <div class="info">
                            <p style="font-size: 10px; color: #888;">Destinatário:</p>
                            <p style="font-size: 18px;">${pedido.nome}</p>
                            <p>${pedido.endereco}</p>
                            <p>${pedido.complemento || 'Sem Complemento'}</p>
                            <p>CEP: ${pedido.cep}</p>
                        </div>
                        <div class="badge">ENVIO PRIORITÁRIO</div>
                    </div>
                    <script>window.print();</script>
                </body>
            </html>
        `);
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-900 flex flex-col">
            <Head>
                <title>Admin Vendas | Lifestyle</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
            </Head>

            {/* NAVBAR INTEGRADA (PAINEL DE COMUNICAÇÃO) */}
            <header className="bg-black text-white p-6 sticky top-0 z-[100] flex justify-between items-center shadow-2xl">
                <div className="flex items-center gap-6">
                    <h1 className="text-xl font-black uppercase italic tracking-tighter">
                        Painel <span className="text-orange-600">Admin</span>
                    </h1>
                    {/* Botões de Navegação entre Arquivos */}
                    <nav className="hidden md:flex bg-white/10 rounded-full p-1">
                        <button className="px-6 py-2 rounded-full text-[10px] font-black uppercase bg-orange-600 shadow-lg shadow-orange-600/20 transition-all">
                            Vendas
                        </button>
                        <button 
                            onClick={() => router.push('/admin/trocas')} 
                            className="px-6 py-2 rounded-full text-[10px] font-black uppercase text-gray-400 hover:text-white transition-all"
                        >
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

            <main className="p-4 md:p-10 max-w-7xl mx-auto w-full flex-grow">
                {/* FILTROS DE STATUS */}
                <div className="flex gap-2 mb-10 overflow-x-auto pb-4 custom-scrollbar">
                    {['Aguardando Pagamento', 'Pago via Cripto', 'Pago via MP', 'Enviado'].map((s) => (
                        <button 
                            key={s} 
                            onClick={() => setStatusFiltro(s)}
                            className={`px-6 py-3 rounded-full font-black uppercase text-[9px] tracking-widest transition-all border shadow-sm whitespace-nowrap ${
                                statusFiltro === s 
                                ? 'bg-black text-white border-black' 
                                : 'bg-white border-gray-100 text-gray-400 hover:border-orange-200'
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {/* LISTA DE CARDS */}
                <div className="space-y-6">
                    {pedidos.filter(p => p.status_pagamento === statusFiltro).length === 0 && (
                        <div className="text-center py-20 text-gray-300 font-black uppercase italic tracking-widest">Nenhum pedido encontrado</div>
                    )}

                    {pedidos.filter(p => p.status_pagamento === statusFiltro).map((pedido) => (
                        <div key={pedido.id} className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row gap-8">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl font-black uppercase italic">{pedido.nome}</h2>
                                    {pedido.hash_transacao && <span className="bg-blue-50 text-blue-500 text-[8px] font-black px-2 py-1 rounded-full uppercase">Blockchain</span>}
                                </div>
                                
                                {/* Lista de Itens do JSONB */}
                                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                    <p className="text-[9px] font-black text-gray-400 uppercase mb-2">Itens:</p>
                                    {pedido.itens?.map((item, i) => (
                                        <div key={i} className="text-[11px] font-bold text-gray-700 flex justify-between border-b border-gray-200 py-1 last:border-0">
                                            <span>{item.nome} {item.tam && `(${item.tam})`}</span>
                                            <span className="text-orange-600">R$ {item.preco.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-[11px] font-bold text-gray-500 uppercase italic">
                                    <i className="bi bi-geo-alt-fill text-orange-600"></i> {pedido.endereco} - CEP: {pedido.cep}
                                </p>
                            </div>

                            <div className="md:w-64 flex flex-col justify-between items-end">
                                <div className="text-right">
                                    <p className="text-3xl font-black italic">R$ {pedido.total_geral?.toFixed(2)}</p>
                                    <p className="text-[10px] font-bold text-gray-400">FRETE: R$ {pedido.valor_frete?.toFixed(2)}</p>
                                </div>

                                <div className="w-full space-y-2 mt-6">
                                    {pedido.status_pagamento.includes('Pago') && (
                                        <button 
                                            onClick={() => atualizarStatus(pedido.id, 'Enviado')}
                                            className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all shadow-lg shadow-orange-100"
                                        >
                                            Marcar como Enviado
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => gerarEtiqueta(pedido)}
                                        className="w-full bg-white border border-gray-200 py-4 rounded-2xl font-black text-[10px] uppercase hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        <i className="bi bi-printer"></i> Imprimir Etiqueta
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
