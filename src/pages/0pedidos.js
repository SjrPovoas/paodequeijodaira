"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

export default function MeusPedidos() {
    const [busca, setBusca] = useState({ cpf: '', pedidoId: '', hash: '' });
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');
    const [tipoBusca, setTipoBusca] = useState('comum'); // 'comum' ou 'web3'

    const buscarPedido = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro('');
        setPedidos([]);

        try {
            let query = supabase.from('pedidos').select('*');

            if (tipoBusca === 'comum') {
                const cpfLimpo = busca.cpf.replace(/\D/g, "");
                if (cpfLimpo.length < 11 || !busca.pedidoId) {
                    throw new Error("Informe o CPF e o Número do Pedido corretamente.");
                }
                // SEGURANÇA LGPD: O filtro exige que AMBOS os campos coincidam
                query = query
                    .eq('cpf', cpfLimpo)
                    .ilike('id', `%${busca.pedidoId}%`); // Busca parcial do ID para facilitar
            } else {
                if (!busca.hash) throw new Error("Informe a Hash da transação.");
                query = query.eq('hash_transacao', busca.hash);
            }

            const { data, error } = await query;

            if (error || !data || data.length === 0) {
                throw new Error("Pedido não encontrado. Verifique os dados informados.");
            }

            setPedidos(data);
        } catch (err) {
            setErro(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-900 p-6">
            <Head>
                <title>Rastreio Seguro | Lifestyle</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
            </Head>

            <div className="max-w-xl mx-auto pt-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Rastreio <span className="text-orange-600">Seguro</span></h1>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Proteção de dados conforme LGPD</p>
                </div>

                {/* SELETOR DE TIPO DE BUSCA */}
                <div className="flex bg-gray-100 p-1 rounded-2xl mb-8">
                    <button 
                        onClick={() => setTipoBusca('comum')}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tipoBusca === 'comum' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
                    >
                        CPF + Pedido
                    </button>
                    <button 
                        onClick={() => setTipoBusca('web3')}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tipoBusca === 'web3' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400'}`}
                    >
                        Hash Web3
                    </button>
                </div>

                {/* FORMULÁRIO DE BUSCA */}
                <form onSubmit={buscarPedido} className="space-y-4 bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/50 mb-12">
                    {tipoBusca === 'comum' ? (
                        <>
                            <input 
                                type="text" placeholder="CPF do Comprador"
                                value={busca.cpf} onChange={e => setBusca({...busca, cpf: e.target.value})}
                                className="w-full bg-gray-50 rounded-2xl p-4 font-bold outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                            />
                            <input 
                                type="text" placeholder="Número do Pedido (Ex: #8a2f)"
                                value={busca.pedidoId} onChange={e => setBusca({...busca, pedidoId: e.target.value})}
                                className="w-full bg-gray-50 rounded-2xl p-4 font-bold outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                            />
                        </>
                    ) : (
                        <input 
                            type="text" placeholder="Cole sua Transaction Hash (0x...)"
                            value={busca.hash} onChange={e => setBusca({...busca, hash: e.target.value})}
                            className="w-full bg-gray-50 rounded-2xl p-4 font-bold outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-mono text-sm"
                        />
                    )}
                    
                    <button type="submit" disabled={loading} className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-orange-600 transition-all">
                        {loading ? 'Validando Dados...' : 'Verificar Status'}
                    </button>
                    {erro && <p className="text-center text-red-500 text-[9px] font-bold uppercase tracking-widest">{erro}</p>}
                </form>

                {/* RESULTADO (EXIBIÇÃO SEGURA) */}
                <div className="space-y-6">
                    {pedidos.map((pedido) => (
                        <div key={pedido.id} className="bg-white border-2 border-orange-500/10 rounded-[40px] p-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-[9px] font-black uppercase bg-orange-100 text-orange-600 px-4 py-1 rounded-full">Status: {pedido.status_pagamento}</span>
                                <span className="text-[9px] font-bold text-gray-400">ID: {pedido.id.slice(0, 8)}</span>
                            </div>

                            <div className="space-y-4 mb-8">
                                <p className="text-sm font-bold text-gray-700">Olá, {pedido.nome.split(' ')[0]}!</p>
                                <p className="text-xs text-gray-500 leading-relaxed">Seu pacote está sendo processado. Abaixo você encontra o link oficial de rastreio.</p>
                            </div>

                            {pedido.rastreio_codigo ? (
                                <a 
                                    href={`https://www.melhorenvio.com.br/rastreio/${pedido.rastreio_codigo}`}
                                    target="_blank" rel="noopener noreferrer"
                                    className="block w-full text-center bg-gray-50 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all"
                                >
                                    Abrir Rastreio Oficial ↗
                                </a>
                            ) : (
                                <div className="p-4 bg-gray-50 rounded-2xl text-center">
                                    <p className="text-[9px] font-black text-gray-400 uppercase">Aguardando Postagem pela Logística</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
                            }
