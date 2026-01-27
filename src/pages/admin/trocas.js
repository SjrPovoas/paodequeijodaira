"use client"; // Define que o componente roda no lado do cliente

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function AdminTrocas() {
    // ESTADOS DO DASHBOARD
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, web3: 0, tradicional: 0 });
    const router = useRouter();

    // ESTADOS DA LOGÍSTICA (MELHOR ENVIO)
    const [modalFrete, setModalFrete] = useState({ aberto: false, pedido: null });
    const [cotacoes, setCotacoes] = useState([]);
    const [calculando, setCalculando] = useState(false);

    // 1. PROTEÇÃO DE ACESSO E CARREGAMENTO INICIAL
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            // Valida se o e-mail é o administrativo permitido
            if (!session || session.user.email !== 'sjrpovoas@gmail.com') {
                router.push('/admin'); 
            } else {
                fetchPedidos();
            }
        };
        checkAuth();
    }, [router]);

    // 2. BUSCA DE PEDIDOS NO SUPABASE
    const fetchPedidos = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('pedidos')
            .select('*')
            .order('criado_em', { ascending: false });

        if (!error && data) {
            setPedidos(data);
            // Separa estatísticas Web3 vs Tradicional
            const web3Count = data.filter(p => p.transacao_hash).length;
            setStats({
                total: data.length,
                web3: web3Count,
                tradicional: data.length - web3Count
            });
        }
        setLoading(false);
    };

    // 3. LOGÍSTICA: CONSULTAR FRETE (MELHOR ENVIO)
    const abrirLogistica = async (pedido) => {
        setModalFrete({ aberto: true, pedido });
        setCalculando(true);
        setCotacoes([]); // Limpa cotações anteriores
        
        try {
            const res = await fetch('/api/logistica', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    cep_destino: pedido.cliente_cep, 
                    produtos: pedido.itens || [] 
                })
            });
            const data = await res.json();
            setCotacoes(data);
        } catch (err) {
            console.error("Erro ao buscar frete:", err);
        } finally {
            setCalculando(false);
        }
    };

    // 4. LOGÍSTICA: COMPRAR E GERAR ETIQUETA
    const comprarFrete = async (opcao) => {
        const confirmar = confirm(`Deseja gerar a etiqueta via ${opcao.name} por R$ ${opcao.price}?`);
        
        if (confirmar) {
            try {
                const res = await fetch('/api/logistica', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        service_id: opcao.id,
                        pedido_id: modalFrete.pedido.id 
                    })
                });
                
                if (res.ok) {
                    alert("Etiqueta gerada com sucesso! Verifique seu painel do Melhor Envio.");
                    setModalFrete({ aberto: false, pedido: null });
                }
            } catch (err) {
                alert("Erro ao processar a etiqueta.");
            }
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin');
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] p-4 md:p-10 font-sans">
            <Head>
                <title>Admin Dashboard | Pão de Queijo da Irá</title>
            </Head>

            {/* HEADER DO PAINEL */}
            <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                    <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none text-black">
                        GERÊNCIA <span className="text-orange-600">LIFESTYLE</span>
                    </h1>
                </div>
                <div className="flex gap-4">
                    <button onClick={fetchPedidos} className="bg-white border-4 border-black p-3 hover:bg-orange-600 hover:text-white transition-all">
                        <i className="bi bi-arrow-clockwise text-xl"></i>
                    </button>
                    <button onClick={handleLogout} className="bg-black text-white px-6 py-3 font-black uppercase text-[10px] tracking-widest shadow-[6px_6px_0px_0px_rgba(234,88,12,1)] active:translate-y-1 active:shadow-none transition-all">
                        Encerrar Sessão
                    </button>
                </div>
            </header>

            {/* TABELA DE PEDIDOS BRUTALISTA */}
            <main className="max-w-7xl mx-auto bg-white border-[6px] border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black text-white text-[10px] font-black uppercase tracking-[0.2em]">
                            <tr>
                                <th className="p-6">Data / Pedido</th>
                                <th className="p-6">Cliente</th>
                                <th className="p-6">Pagamento</th>
                                <th className="p-6">Total</th>
                                <th className="p-6">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-4 divide-gray-100 font-bold">
                            {loading ? (
                                <tr><td colSpan="5" className="p-20 text-center animate-pulse uppercase tracking-widest font-black">Sincronizando Dados...</td></tr>
                            ) : pedidos.map((pedido) => (
                                <tr key={pedido.id} className="hover:bg-gray-50">
                                    <td className="p-6">
                                        <div className="text-xs uppercase">#{pedido.id.slice(0, 8)}</div>
                                        <div className="text-[9px] text-gray-400">{new Date(pedido.criado_em).toLocaleString()}</div>
                                    </td>
                                    <td className="p-6 uppercase text-xs">
                                        {pedido.cliente_email}
                                    </td>
                                    <td className="p-6">
                                        {pedido.transacao_hash ? (
                                            <span className="bg-purple-100 text-[#8247E5] text-[9px] px-2 py-1 border border-[#8247E5]">POL WEB3</span>
                                        ) : (
                                            <span className="bg-orange-100 text-orange-600 text-[9px] px-2 py-1 border border-orange-600">TRADICIONAL</span>
                                        )}
                                    </td>
                                    <td className="p-6 text-sm">R$ {pedido.total_brl?.toFixed(2)}</td>
                                    <td className="p-6">
                                        <button 
                                            onClick={() => abrirLogistica(pedido)}
                                            className="bg-black text-white p-3 hover:bg-orange-600 transition-all border-2 border-black"
                                            title="Gerenciar Envio"
                                        >
                                            <i className="bi bi-truck"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* MODAL DE LOGÍSTICA MELHOR ENVIO */}
            {modalFrete.aberto && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-white border-[6px] border-black p-8 max-w-lg w-full shadow-[20px_20px_0px_0px_rgba(234,88,12,1)]">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black uppercase italic italic tracking-tighter">MELHOR <span className="text-orange-600">ENVIO</span></h3>
                            <button onClick={() => setModalFrete({ aberto: false })} className="text-2xl font-black">✕</button>
                        </div>

                        {calculando ? (
                            <div className="py-12 text-center font-black uppercase animate-bounce tracking-widest text-orange-600">Calculando Fretes...</div>
                        ) : (
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                {cotacoes.length > 0 ? cotacoes.map((opt) => (
                                    <div key={opt.id} className="p-4 border-4 border-gray-100 hover:border-black transition-all flex justify-between items-center bg-gray-50">
                                        <div>
                                            <p className="font-black text-[10px] uppercase">{opt.company.name} - {opt.name}</p>
                                            <p className="text-[9px] text-gray-500 font-bold uppercase">Prazo: {opt.delivery_range.max} dias</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-sm mb-2">R$ {opt.price}</p>
                                            <button 
                                                onClick={() => comprarFrete(opt)}
                                                className="text-[8px] font-black uppercase bg-black text-white px-3 py-2 hover:bg-orange-600 transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
                                            >
                                                Gerar Etiqueta
                                            </button>
                                        </div>
                                    </div>
                                )) : <p className="text-center font-bold text-gray-400 py-10">Nenhuma transportadora disponível para este CEP.</p>}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
