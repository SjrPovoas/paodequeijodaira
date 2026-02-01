"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function MeusPedidos() {
    const [cpf, setCpf] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');
    const router = useRouter();
    const { id } = router.query; // Permite buscar um pedido específico vindo do e-mail

    // Se o cliente vier direto do link do e-mail (api/send-email)
    useEffect(() => {
        if (id) {
            buscarPedidoPorId(id);
        }
    }, [id]);

    async function buscarPedidoPorId(orderId) {
        setLoading(true);
        const { data, error } = await supabase
            .from('pedidos')
            .select('*')
            .eq('id', orderId)
            .single();
        
        if (data) setPedidos([data]);
        setLoading(false);
    }

    const buscarPorCpf = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro('');
        const cpfLimpo = cpf.replace(/\D/g, "");

        if (cpfLimpo.length < 11) {
            setErro("Digite um CPF válido.");
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from('pedidos')
            .select('*')
            .or(`cpf.eq.${cpfLimpo},cpf.eq.${cpf}`)
            .order('created_at', { ascending: false });

        if (error || !data.length) {
            setErro('Nenhum pedido encontrado para este CPF.');
        } else {
            setPedidos(data);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-900 p-4 md:p-10">
            <Head>
                <title>Meus Pedidos | Lifestyle</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
            </Head>

            <div className="max-w-3xl mx-auto">
                {/* HEADER VOLTAR */}
                <div className="flex justify-between items-center mb-12">
                    <Link href="/loja" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-orange-600 transition-all flex items-center gap-2">
                        <i className="bi bi-arrow-left"></i> Voltar à Loja
                    </Link>
                    <div className="bg-black text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter">
                        Lifestyle <span className="text-orange-500 text-lg">.</span>
                    </div>
                </div>

                {/* TÍTULO & BUSCA */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-4">
                        Meus <span className="text-orange-600">Pedidos</span>
                    </h1>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">Consulte o status e rastreio da sua compra</p>

                    <form onSubmit={buscarPorCpf} className="max-w-md mx-auto relative group">
                        <input 
                            type="text"
                            placeholder="Digite seu CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            className="w-full bg-white border border-gray-100 rounded-3xl p-5 pr-14 font-bold text-gray-700 shadow-xl shadow-gray-100/40 outline-none focus:ring-4 focus:ring-orange-500/5 transition-all"
                        />
                        <button type="submit" className="absolute right-3 top-3 bottom-3 bg-black text-white w-12 rounded-2xl flex items-center justify-center hover:bg-orange-600 transition-all">
                            {loading ? <i className="bi bi-hourglass-split animate-spin"></i> : <i className="bi bi-search"></i>}
                        </button>
                    </form>
                    {erro && <p className="mt-4 text-red-500 font-bold text-[9px] uppercase tracking-widest">{erro}</p>}
                </div>

                {/* LISTAGEM DE PEDIDOS */}
                <div className="space-y-6">
                    {pedidos.map((pedido) => (
                        <div key={pedido.id} className="bg-white border border-gray-50 rounded-[40px] p-8 shadow-sm hover:shadow-xl transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
                            
                            {/* STATUS & DATA */}
                            <div className="flex flex-col md:flex-row justify-between border-b border-gray-50 pb-6 mb-6 gap-4">
                                <div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">Status Atual</span>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${pedido.status_pagamento.includes('Pago') ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`}></div>
                                        <h2 className="text-xl font-black uppercase italic text-gray-800">{pedido.status_pagamento}</h2>
                                    </div>
                                </div>
                                <div className="md:text-right">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">Ordem de Compra</span>
                                    <p className="font-bold text-sm text-gray-500">#{pedido.id.slice(0, 8).toUpperCase()}</p>
                                </div>
                            </div>

                            {/* BARRA DE PROGRESSO */}
                            <div className="relative h-1 bg-gray-100 rounded-full mb-10 flex items-center">
                                <div className={`h-full bg-orange-600 rounded-full transition-all duration-1000 ${
                                    pedido.status_pagamento.includes('Pago') ? 'w-1/3' : 
                                    pedido.status_pagamento === 'Enviado' ? 'w-2/3' : 
                                    pedido.status_pagamento === 'Entregue' ? 'w-full' : 'w-[10%]'
                                }`}></div>
                                <div className="absolute w-full flex justify-between px-0">
                                    <div className="w-3 h-3 rounded-full bg-orange-600 border-2 border-white shadow-sm"></div>
                                    <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${pedido.status_pagamento === 'Enviado' || pedido.status_pagamento === 'Entregue' ? 'bg-orange-600' : 'bg-gray-200'}`}></div>
                                    <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${pedido.status_pagamento === 'Entregue' ? 'bg-orange-600' : 'bg-gray-200'}`}></div>
                                </div>
                            </div>

                            {/* INFO DE LOGÍSTICA */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">Código de Rastreio</p>
                                    <div className="flex items-center gap-3">
                                        <i className="bi bi-truck text-orange-600 text-xl"></i>
                                        <span className="font-mono font-bold text-sm text-gray-700">
                                            {pedido.rastreio_codigo || 'Preparando para envio'}
                                        </span>
                                    </div>
                                </div>

                                {pedido.rastreio_codigo && (
                                    <a 
                                        href={`https://www.melhorenvio.com.br/rastreio/${pedido.rastreio_codigo}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-black text-white text-center py-5 rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-gray-200"
                                    >
                                        Rastrear Objeto ↗
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* SUPORTE RÁPIDO */}
                <div className="mt-16 p-8 border border-dashed border-gray-200 rounded-[40px] text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Problemas com o pedido?</p>
                    <a href="https://wa.me/SEUNUMERO" className="inline-flex items-center gap-2 text-xs font-black uppercase text-gray-800 hover:text-orange-600 transition-all">
                        <i className="bi bi-whatsapp"></i> Chamar suporte da Irá
                    </a>
                </div>
            </div>
        </div>
    );
                      }
