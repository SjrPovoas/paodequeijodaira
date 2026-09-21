// pages/suporte.js

"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function SuporteTrocas() {
    // Estados do formulário de envio
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [pedidoId, setPedidoId] = useState('');
    const [motivo, setMotivo] = useState('Arrependimento');
    const [descricao, setDescricao] = useState('');

    // Estados de feedback e consulta
    const [loading, setLoading] = useState(false);
    const [mensagemEnvio, setMensagemEnvio] = useState('');

    // Estados para o resultado da consulta ("Ver Solicitação")
    const [resultadoConsulta, setResultadoConsulta] = useState(null);
    const [erroConsulta, setErroConsulta] = useState('');

    // Função para enviar a nova solicitação
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setMensagemEnvio('');

        const { error } = await supabase.from('trocas').insert([
            {
                nome_completo: nomeCompleto,
                email: email,
                pedido_id: pedidoId,
                motivo: motivo,
                descricao: descricao,
                status_pedido: 'Pendente'
            }
        ]);

        if (error) {
            setMensagemEnvio("Erro ao enviar solicitação: " + error.message);
        } else {
            setMensagemEnvio("Solicitação enviada com sucesso! Você já pode consultá-la abaixo.");
            setNomeCompleto('');
            setEmail('');
            setPedidoId('');
            setDescricao('');
        }
        setLoading(false);
    }

    // Função para consultar a solicitação existente
    async function handleVerSolicitacao(e) {
        e.preventDefault();
        setErroConsulta('');
        setResultadoConsulta(null);

        // Validação estrita: exige obrigatoriamente os dois dados para fins de segurança
        if (!email || !pedidoId) {
            setErroConsulta("Por segurança, preencha tanto o E-mail quanto o ID do Pedido para consultar.");
            return;
        }

        setLoading(true);
        
        // Consulta segura combinando E-mail e ID do Pedido
        const { data, error } = await supabase
            .from('trocas')
            .select('*')
            .ilike('email', email.trim())
            .eq('pedido_id', pedidoId.trim())
            .maybeSingle();

        if (error || !data) {
            setErroConsulta("Nenhuma solicitação encontrada com esta combinação de E-mail e ID de Pedido. Verifique se os dados estão corretos.");
        } else {
            setResultadoConsulta(data);
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-900 py-10 px-4">
            <Head><title>Trocas e Devoluções | Suporte</title></Head>

            <div className="max-w-xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
                        Trocas e <span className="text-orange-600">Devoluções</span>
                    </h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">
                        Preencha os dados abaixo para iniciar o processo ou consultar
                    </p>
                </div>

                {/* FORMULÁRIO DE ENVIO */}
                <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Nome Completo</label>
                            <input
                                type="text"
                                required
                                value={nomeCompleto}
                                onChange={(e) => setNomeCompleto(e.target.value)}
                                placeholder="Seu nome completo"
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-black transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">E-mail</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-black transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">ID do Pedido (UUID)</label>
                            <input
                                type="text"
                                required
                                value={pedidoId}
                                onChange={(e) => setPedidoId(e.target.value)}
                                placeholder="Cole o código do pedido aqui"
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-black transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Motivo</label>
                            <select
                                value={motivo}
                                onChange={(e) => setMotivo(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-black transition-all">
                                <option value="Arrependimento">Arrependimento</option>
                                <option value="Troca de Tamanho">Troca de Tamanho</option>
                                <option value="Produto Defeituoso">Produto Defeituoso</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Detalhes</label>
                        <textarea
                            rows="4"
                            required
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Descreva o motivo da troca..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-black transition-all"
                        />
                    </div>

                    {mensagemEnvio && (
                        <p className={`text-xs font-bold text-center p-3 rounded-xl ${mensagemEnvio.includes('Erro') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                            {mensagemEnvio}
                        </p>
                    )}

                    {/* BOTÃO ENVIAR SOLICITAÇÃO (Fica dentro do form) */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white hover:bg-orange-600 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-lg">
                        {loading ? 'A processar...' : 'Enviar Solicitação'}
                    </button>
                </form>

                {/* BOTÃO VER SOLICITAÇÃO (FORA DA TAG </form>) */}
                <button
                    type="button"
                    onClick={handleVerSolicitacao}
                    disabled={loading}
                    className="w-full mt-4 bg-gray-100 text-gray-700 hover:bg-gray-200 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all">
                    Ver Solicitação / Consultar Status
                </button>

                {/* EXIBIÇÃO DO RESULTADO DA CONSULTA */}
                {erroConsulta && (
                    <div className="mt-6 bg-red-50 border border-red-100 p-6 rounded-3xl text-center text-red-600 text-xs font-bold">
                        {erroConsulta}
                    </div>
                )}

                {resultadoConsulta && (
                    <div className="mt-6 bg-white border border-orange-200 p-8 rounded-[40px] shadow-sm flex flex-col gap-4">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                            <h3 className="text-sm font-black uppercase italic text-gray-800">Resultado da Consulta</h3>
                            <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${resultadoConsulta.status_pedido === 'Autorizado' ? 'bg-green-100 text-green-700' :
                                resultadoConsulta.status_pedido === 'Recusado' ? 'bg-red-100 text-red-700' :
                                    'bg-orange-100 text-orange-700'
                                }`}>
                                Status: {resultadoConsulta.status_pedido}
                            </span>
                        </div>
                        <div className="text-xs text-gray-600 space-y-2">
                            <p><strong>Pedido:</strong> {resultadoConsulta.pedido_id}</p>
                            <p><strong>Motivo:</strong> {resultadoConsulta.motivo}</p>
                            <p><strong>Descrição:</strong> "{resultadoConsulta.descricao}"</p>
                        </div>

                        {resultadoConsulta.resposta_admin ? (
                            <div className="bg-gray-50 p-4 rounded-2xl mt-2 border border-gray-200">
                                <p className="text-[10px] font-black uppercase text-orange-600 mb-1">Resposta do Administrador:</p>
                                <p className="text-sm italic text-gray-800">"{resultadoConsulta.resposta_admin}"</p>
                            </div>
                        ) : (
                            <p className="text-xs text-gray-400 italic mt-2">Ainda não há resposta do administrador para este pedido.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}