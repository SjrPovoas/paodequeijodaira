// pages/admin/vendas.js

"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function AdminVendas() {
    const [loading, setLoading] = useState(true);
    const [pedidos, setPedidos] = useState([]);
    const [statusFiltro, setStatusFiltro] = useState('Aguardando Pagamento');
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
    const [dataEnvio, setDataEnvio] = useState('');
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
        
        if (!error && data) setPedidos(data);
        setLoading(false);
    }

    const abrirModalEnvio = (pedido) => {
        setPedidoSelecionado(pedido);
        const hoje = new Date().toISOString().split('T')[0];
        setDataEnvio(hoje);
    };

    async function confirmarEnvio(id) {
        const { error } = await supabase
            .from('pedidos')
            .update({ 
                status_pedido: 'Enviado',
                data_envio: dataEnvio 
            })
            .eq('id', id);

        if (!error) {
            setPedidoSelecionado(null);
            fetchPedidos();
        } else {
            alert('Erro ao atualizar status do pedido.');
        }
    }

    const formatarItensParaLista = (itens) => {
        if (!itens) return <p className="text-xs font-bold text-gray-700">Item padrão da Loja</p>;
        
        let parsedItens = itens;
        if (typeof itens === 'string') {
            try {
                parsedItens = JSON.parse(itens);
            } catch {
                return <p className="text-xs font-bold text-gray-700">{itens}</p>;
            }
        }

        if (Array.isArray(parsedItens)) {
            return parsedItens.map((i, index) => (
                <div key={index} className="text-xs font-bold text-gray-700 flex items-center gap-1.5 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block"></span>
                    <span>{i.quantidade || 1}x {i.nome || i.title || 'Produto'} {i.tamanho ? `(${i.tamanho})` : ''}</span>
                </div>
            ));
        }

        if (typeof parsedItens === 'object') {
            return (
                <div className="text-xs font-bold text-gray-700 flex items-center gap-1.5 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block"></span>
                    <span>{parsedItens.quantidade || 1}x {parsedItens.nome || parsedItens.title || 'Produto'} {parsedItens.tamanho ? `(${parsedItens.tamanho})` : ''}</span>
                </div>
            );
        }

        return <p className="text-xs font-bold text-gray-700">{String(itens)}</p>;
    };

    const faturamentoPol = pedidos
        .filter(p => p.hash_transacao_crypto && (p.status_pedido === 'pago' || p.status_pedido === 'Enviado'))
        .reduce((acc, curr) => acc + (parseFloat(curr.valor_total_pol) || 0), 0);

    const faturamentoReal = pedidos
        .filter(p => !p.hash_transacao_crypto && p.status_pedido === 'pago')
        .reduce((acc, curr) => acc + (parseFloat(curr.valor_total_pol || curr.valor_reais || 50.00) || 0), 0);

    const metrics = {
        faturamentoPol,
        faturamentoReal,
        pendentesEnvio: pedidos.filter(p => (p.hash_transacao_crypto && p.status_pedido !== 'Enviado')).length,
        totalPedidos: pedidos.length
    };

    const pedidosFiltrados = pedidos.filter(p => {
        const statusPagamento = (p.status_pagamento || '').toLowerCase();
        const statusPedido = (p.status_pedido || '').toLowerCase();
        const temHash = Boolean(p.hash_transacao_crypto);

        if (statusFiltro === 'Aguardando Pagamento') {
            return statusPagamento.includes('aguardando') || statusPagamento.includes('pending') || (!temHash && statusPedido === 'recebido');
        }
        if (statusFiltro === 'Pago via Cripto') {
            return temHash && statusPedido !== 'enviado';
        }
        if (statusFiltro === 'Pago via MP') {
            return !temHash && (statusPagamento.includes('pago') || statusPagamento.includes('aprovado') || statusPedido === 'pago');
        }
        if (statusFiltro === 'Enviado') {
            return statusPedido === 'enviado';
        }
        return true;
    });

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-900 flex flex-col relative">
            <Head><title>Admin | Gestão de Vendas</title></Head>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />

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
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white border border-gray-100 p-6 rounded-[35px] shadow-sm">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Faturamento (POL)</p>
                        <h3 className="text-2xl font-black italic text-gray-900">{metrics.faturamentoPol.toFixed(4)} POL</h3>
                    </div>
                    <div className="bg-white border border-gray-100 p-6 rounded-[35px] shadow-sm">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Faturamento (R$)</p>
                        <h3 className="text-2xl font-black italic text-gray-900">R$ {metrics.faturamentoReal.toFixed(2)}</h3>
                    </div>
                    <div className="bg-orange-600 p-6 rounded-[35px] shadow-lg shadow-orange-100 text-white">
                        <p className="text-[9px] font-black text-orange-200 uppercase tracking-widest mb-1">Aguardando Envio</p>
                        <h3 className="text-2xl font-black italic">{metrics.pendentesEnvio} Pedidos</h3>
                    </div>
                    <div className="bg-white border border-gray-100 p-6 rounded-[35px] shadow-sm">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Total de Ordens</p>
                        <h3 className="text-2xl font-black italic text-gray-800">{metrics.totalPedidos}</h3>
                    </div>
                </div>

                <div className="flex gap-2 mb-10 overflow-x-auto pb-4 custom-scrollbar">
                    {['Aguardando Pagamento', 'Pago via Cripto', 'Pago via MP', 'Enviado'].map((s) => (
                        <button key={s} onClick={() => setStatusFiltro(s)}
                            className={`px-6 py-3 rounded-full font-black uppercase text-[9px] tracking-widest border transition-all ${statusFiltro === s ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100'}`}>
                            {s}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <p className="text-center font-bold text-gray-400 uppercase text-xs py-10">Carregando pedidos...</p>
                    ) : pedidosFiltrados.length === 0 ? (
                        <p className="text-center font-bold text-gray-400 uppercase text-xs py-10">Nenhum pedido encontrado nesta categoria.</p>
                    ) : (
                        pedidosFiltrados.map((pedido) => (
                            <div key={pedido.id} className="bg-white border border-gray-100 p-6 rounded-[30px] flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm gap-4">
                                <div className="space-y-2 max-w-xl">
                                    <div>
                                        <h4 className="font-black uppercase italic text-gray-800">{pedido.nome_completo || pedido.nome || 'Cliente'}</h4>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">E-mail: {pedido.email || 'N/A'} • Tel: {pedido.telefone || 'N/A'}</p>
                                    </div>

                                    <div className="bg-orange-50/50 p-3 rounded-2xl border border-orange-100/50">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-orange-600 mb-0.5"><i className="bi bi-geo-alt-fill mr-1"></i> Endereço de Entrega:</p>
                                        <p className="text-xs font-bold text-gray-800">
                                            {pedido.endereco_rua || 'Rua não informada'}, Nº {pedido.endereco_numero || 'S/N'} 
                                            {pedido.endereco_complemento ? ` — ${pedido.endereco_complemento}` : ''}
                                        </p>
                                        <p className="text-[11px] font-medium text-gray-600">
                                            {pedido.cidade_estado || ''} • CEP: {pedido.cep || 'Não informado'}
                                        </p>
                                    </div>
                                    
                                    <div className="bg-gray-50 p-3 rounded-2xl space-y-1">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-orange-600 mb-1"><i className="bi bi-box-seam mr-1"></i> Itens do Pedido:</p>
                                        {formatarItensParaLista(pedido.itens || pedido.produto)}
                                    </div>

                                    {pedido.hash_transacao_crypto && (
                                        <p className="text-[9px] font-mono text-purple-600 mt-1">Hash: {pedido.hash_transacao_crypto}</p>
                                    )}

                                    {/* EXIBIÇÃO DA DATA DE ENVIO NA LISTAGEM PRINCIPAL */}
                                    {pedido.data_envio && (
                                        <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mt-1">
                                            <i className="bi bi-calendar-check-fill"></i> Enviado em: {new Date(pedido.data_envio + 'T00:00:00').toLocaleDateString('pt-BR')}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                    <div className="text-right">
                                        <p className="font-black text-lg text-orange-600">
                                            {pedido.hash_transacao_crypto ? `${Number(pedido.valor_total_pol || 0).toFixed(4)} POL` : `R$ ${Number(pedido.valor_total_pol || 50.00).toFixed(2)}`}
                                        </p>
                                        <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400">ID: {String(pedido.id).slice(0, 8)}</span>
                                    </div>
                                    
                                    {statusFiltro === 'Pago via Cripto' && (
                                        <button 
                                            onClick={() => abrirModalEnvio(pedido)}
                                            className="bg-black text-white px-5 py-3 rounded-2xl font-black uppercase text-[9px] tracking-widest hover:bg-orange-600 transition-all shadow-md whitespace-nowrap"
                                        >
                                            Marcar como Enviado ↗
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            {pedidoSelecionado && (
                <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-[40px] p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black uppercase italic tracking-tighter text-gray-900">
                                Confirmar <span className="text-orange-600">Envio</span>
                            </h3>
                            <button onClick={() => setPedidoSelecionado(null)} className="text-2xl text-gray-400 hover:text-black">
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>

                        <div className="space-y-4 mb-8 bg-gray-50 p-6 rounded-3xl">
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Cliente</p>
                                <p className="text-sm font-bold text-gray-800">{pedidoSelecionado.nome_completo || pedidoSelecionado.nome}</p>
                            </div>
                            
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Endereço de Entrega</p>
                                <p className="text-xs font-bold text-gray-800 mt-0.5">
                                    {pedidoSelecionado.endereco_rua || 'Rua não informada'}, Nº {pedidoSelecionado.endereco_numero || 'S/N'} 
                                    {pedidoSelecionado.endereco_complemento ? ` — ${pedidoSelecionado.endereco_complemento}` : ''}
                                </p>
                                <p className="text-xs font-semibold text-gray-600 mt-0.5">
                                    {pedidoSelecionado.cidade_estado || ''} • CEP: {pedidoSelecionado.cep || 'Não informado'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-orange-600 mb-1">Produtos a Enviar</p>
                                <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-1 mt-1">
                                    {formatarItensParaLista(pedidoSelecionado.itens || pedidoSelecionado.produto)}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Data de Envio</label>
                                <input 
                                    type="date"
                                    value={dataEnvio}
                                    onChange={(e) => setDataEnvio(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-2xl p-3 font-bold text-sm text-gray-800 outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                                />
                            </div>

                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Valor Recebido</p>
                                <p className="text-sm font-black text-orange-600">
                                    {pedidoSelecionado.hash_transacao_crypto ? `${Number(pedidoSelecionado.valor_total_pol || 0).toFixed(4)} POL` : `R$ ${Number(pedidoSelecionado.valor_total_pol || 50.00).toFixed(2)}`}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button 
                                onClick={() => setPedidoSelecionado(null)}
                                className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-all"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={() => confirmarEnvio(pedidoSelecionado.id)}
                                className="flex-1 bg-black text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-orange-600 transition-all shadow-lg"
                            >
                                Confirmar Envio ✓
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}