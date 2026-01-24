"use client";
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function FormularioTroca({ pedido, onFechar }) {
  const [motivo, setMotivo] = useState('Defeito de fabricação (Camiseta/Caneca)');
  const [descricao, setDescricao] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const enviarSolicitacao = async (e) => {
    e.preventDefault();
    setEnviando(true);

    try {
      // 1. Inserir na tabela 'trocas' usando os dados do pedido (já que não há login)
      const { error: trocaError } = await supabase.from('trocas').insert([
        {
          pedido_id: pedido.id,
          cliente_email: pedido.email, // Usa o e-mail que já está no objeto do pedido
          motivo: motivo,
          descricao: descricao,
          status: 'Pendente'
        }
      ]);

      if (trocaError) throw trocaError;

      // 2. Atualizar o status do pedido para manter o cliente informado no rastreio
      const { error: pedidoError } = await supabase
        .from('pedidos')
        .update({ status: 'Em Análise de Troca' })
        .eq('id', pedido.id);

      if (pedidoError) throw pedidoError;

      // 3. Disparar e-mail de notificação (Opcional)
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pedidoId: pedido.id,
          clienteEmail: pedido.email,
          motivo: motivo,
          descricao: descricao
        }),
      }).catch(err => console.error("Erro ao disparar e-mail:", err));

      setSucesso(true);

      // 4. Fechar após o sucesso
      setTimeout(() => {
        onFechar();
        if (typeof window !== 'undefined') window.location.reload();
      }, 3000);

    } catch (err) {
      alert("Erro ao processar solicitação: " + err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onFechar} />
      
      <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Cabeçalho */}
        <div className="bg-orange-600 p-8 text-white">
          <button onClick={onFechar} className="absolute top-6 right-8 text-2xl hover:scale-110 transition-transform">
            <i className="bi bi-x-lg"></i>
          </button>
          <h2 className="text-3xl font-black uppercase italic leading-none tracking-tighter">
            Solicitar <br/><span className="text-black">Troca / Devolução</span>
          </h2>
          <p className="text-[10px] mt-2 font-bold opacity-80 uppercase tracking-widest">
            ID DO PEDIDO: {pedido.id.slice(0, 8)}
          </p>
        </div>

        <div className="p-8">
          {sucesso ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-black uppercase italic">Solicitação Enviada!</h3>
              <p className="text-gray-500 mt-2 text-sm px-4 font-medium">
                Analisaremos seu caso e responderemos em {pedido.email} em até 48h.
              </p>
            </div>
          ) : (
            <form onSubmit={enviarSolicitacao} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Qual o motivo?</label>
                <select 
                  value={motivo} 
                  onChange={(e) => setMotivo(e.target.value)}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl bg-gray-50 font-bold text-sm focus:border-orange-600 outline-none transition-all"
                  required
                >
                  <option>Defeito de fabricação (Camiseta/Caneca)</option>
                  <option>Tamanho incorreto</option>
                  <option>Produto danificado no transporte</option>
                  <option>Arrependimento (7 dias)</option>
                  <option>Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Descreva o ocorrido</label>
                <textarea 
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl h-32 font-medium text-sm focus:border-orange-600 outline-none transition-all resize-none"
                  placeholder="Conte-nos o que aconteceu..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={enviando}
                className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-orange-600 transition-all shadow-xl disabled:bg-gray-300"
              >
                {enviando ? 'Processando...' : 'Confirmar Troca'}
              </button>
              
              <p className="text-[9px] text-center text-gray-400 font-bold uppercase tracking-widest px-6 leading-relaxed">
                A equipe do Pão de Queijo da Irá entrará em contato para os próximos passos.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}