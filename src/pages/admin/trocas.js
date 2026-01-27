"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function AdminTrocas() {
    const [modalFrete, setModalFrete] = useState({ aberto: false, pedido: null });
    const [cotacoes, setCotacoes] = useState([]);
    const [calculando, setCalculando] = useState(false);

    const abrirLogistica = async (pedido) => {
        setModalFrete({ aberto: true, pedido });
        setCalculando(true);
        
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
            console.error("Erro frete");
        } finally {
            setCalculando(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] p-10">
            {/* ... (Tabela de pedidos anterior) ... */}
            {/* Na célula de Ações da tabela, troque pelo botão abaixo: */}
            <button 
                onClick={() => abrirLogistica(pedido)}
                className="bg-black text-white p-2 hover:bg-orange-600 transition-all border-2 border-black"
            >
                <i className="bi bi-truck"></i>
            </button>

            {/* MODAL DE LOGÍSTICA BRUTALISTA */}
            {modalFrete.aberto && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-white border-[6px] border-black p-8 max-w-lg w-full shadow-[20px_20px_0px_0px_rgba(234,88,12,1)] animate-in zoom-in duration-300">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-3xl font-black uppercase italic tracking-tighter">Logística <span className="text-orange-600">Express</span></h3>
                            <button onClick={() => setModalFrete({ aberto: false })} className="text-2xl font-black">✕</button>
                        </div>

                        <p className="text-[10px] font-black uppercase text-gray-400 mb-6">
                            Destino: {modalFrete.pedido.cliente_cep} | Pedido: #{modalFrete.pedido.id.slice(0,8)}
                        </p>

                        {calculando ? (
                            <div className="py-10 text-center font-black uppercase animate-pulse">Consultando Melhor Envio...</div>
                        ) : (
                            <div className="space-y-4">
                                {cotacoes.map((opt) => (
                                    <div key={opt.id} className="flex items-center justify-between p-4 border-4 border-gray-100 hover:border-black transition-all group cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <img src={opt.company.picture} alt={opt.company.name} className="h-8 w-8 grayscale group-hover:grayscale-0" />
                                            <div>
                                                <p className="font-black text-xs uppercase">{opt.name}</p>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase">{opt.delivery_range.min}-{opt.delivery_range.max} dias úteis</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-orange-600">R$ {opt.price}</p>
                                            <button className="text-[8px] font-black uppercase bg-black text-white px-2 py-1 mt-1">Gerar Etiqueta</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

                                    
