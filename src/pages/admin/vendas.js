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

    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            // Segurança: Apenas seu email acessa
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
            .update({ status_pagamento: novoStatus })
            .eq('id', id);
        if (!error) fetchPedidos();
    };

    const gerarEtiqueta = (pedido) => {
        const win = window.open('', '_blank');
        win.document.write(`
            <html>
                <head><title>Etiqueta - ${pedido.nome}</title></head>
                <style>
                    body { font-family: sans-serif; padding: 40px; }
                    .etiqueta { border: 4px solid black; padding: 20px; width: 400px; border-radius: 20px; }
                    .remetente { font-size: 10px; border-bottom: 1px dashed #ccc; margin-bottom: 15px; padding-bottom: 10px; }
                    .destinatario h1 { font-size: 12px; margin: 0; }
                    .destinatario p { font-size: 16px; font-weight: bold; margin: 5px 0; }
                </style>
                <body>
                    <div class="etiqueta">
                        <div class="remetente">REMETENTE: Pão de Queijo da Irá - Lifestyle HQ</div>
                        <div class="destinatario">
                            <h1>DESTINATÁRIO:</h1>
                            <p>${pedido.nome.toUpperCase()}</p>
                            <p>${pedido.endereco}</p>
                            <p>${pedido.complemento || ''}</p>
                            <p>CEP: ${pedido.cep}</p>
                        </div>
                    </div>
                    <script>window.print();</script>
                </body>
            </html>
        `);
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] font-sans text-black flex flex-col selection:bg-orange-200">
            <Head>
                <title>Gestão de Vendas | Admin</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
            </Head>

            {/* HEADER COM STATUS DO SISTEMA */}
            <header className="bg-black text-white p-6 border-b-[8px] border-orange-600 sticky top-0 z-[100] flex justify-between items-center">
                <h1 className="text-xl font-black uppercase italic tracking-tighter">
                    Painel de <span className="text-orange-600">Vendas</span>
                </h1>
                <div className="flex gap-4">
                     <button onClick={() => router.push('/loja')} className="text-[10px] font-bold uppercase bg-white/10 px-3 py-1 rounded-full">Ver Loja</button>
                     <button onClick={async () => { await supabase.auth.signOut(); router.push('/admin/login'); }} className="text-[10px] font-bold uppercase bg-red-600 px-3 py-1 rounded-full">Sair</button>
                </div>
            </header>

            <main className="p-4 md:p-10 max-w-7xl mx-auto w-full flex-grow">
                {/* FILTROS DE STATUS ARREDONDADOS SOFT */}
                <div className="flex gap-2 mb-10 overflow-x-auto pb-4 custom-scrollbar">
                    {['Aguardando Pagamento', 'Pago via Cripto', 'Pago via MP', 'Enviado', 'Cancelado'].map((s) => (
                        <button key={s} onClick={() => setStatusFiltro(s)}
                                className={`px-6 py-3 rounded-full font-black uppercase text-[9px] tracking-widest transition-all whitespace-nowrap shadow-sm border ${statusFiltro === s ? 'bg-orange-600 text-white border-orange-600 shadow-orange-200' : 'bg-white border-gray-100 text-gray-400 hover:border-orange-300'}`}>
                            {s}
                        </button>
                    ))}
                </div>

                <div className="space-y-6">
                    {pedidos.filter(p => p.status_pagamento === statusFiltro).map((pedido) => (
                        <div key={pedido.id} className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row justify-between gap-8 group">
                            
                            {/* DADOS DO CLIENTE E ITENS */}
                            <div className="flex-1 space-y-4">
                                <div>
                                    <span className="text-[9px] font-black text-orange-600 uppercase tracking-widest bg-orange-50 px-2 py-1 rounded">Pedido Web3</span>
                                    <h2 className="text-2xl font-black uppercase italic mt-2">{pedido.nome}</h2>
                                    <p className="text-[11px] font-bold text-gray-400">{pedido.email}</p>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Itens do Pedido:</p>
                                    <div className="text-xs font-bold text-gray-700">
                                        {pedido.itens?.map((item, idx) => (
                                            <div key={idx} className="flex justify-between border-b border-gray-200 py-1 last:border-0">
                                                <span>{item.nome} {item.tam ? `(${item.tam})` : ''}</span>
                                                <span className="text-orange-600">R$ {item.preco.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-[11px] font-bold text-gray-500 uppercase">
                                    <i className="bi bi-geo-alt-fill text-orange-600"></i> {pedido.endereco} <br/>
                                    <span className="ml-4">CEP: {pedido.cep} {pedido.complemento && ` - ${pedido.complemento}`}</span>
                                </p>
                            </div>

                            {/* FINANCEIRO E AÇÕES */}
                            <div className="md:w-64 flex flex-col justify-between items-end border-l border-gray-100 pl-0 md:pl-8">
                                <div className="text-right">
                                    <p className="text-3xl font-black italic text-gray-900 leading-none">R$ {pedido.total_geral?.toFixed(2)}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Frete: R$ {pedido.valor_frete?.toFixed(2)}</p>
                                </div>

                                <div className="w-full space-y-2 mt-6">
                                    {pedido.status_pagamento.includes('Pago') && (
                                        <button 
                                            onClick={() => atualizarStatus(pedido.id, 'Enviado')} 
                                            className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-gray-200"
                                        >
                                            Marcar Enviado
                                        </button>
                                    )}
                                    
                                    <button 
                                        onClick={() => gerarEtiqueta(pedido)}
                                        className="w-full bg-white border border-gray-200 py-4 rounded-2xl font-black text-[10px] uppercase hover:bg-gray-50 flex items-center justify-center gap-2"
                                    >
                                        <i className="bi bi-printer"></i> Imprimir Etiqueta
                                    </button>

                                    {pedido.hash_transacao && (
                                        <a 
                                            href={`https://polygonscan.com/tx/${pedido.hash_transacao}`} 
                                            target="_blank" 
                                            className="block text-center text-[9px] font-bold text-blue-500 uppercase hover:underline"
                                        >
                                            Ver na Blockchain <i className="bi bi-box-arrow-up-right"></i>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
    }
