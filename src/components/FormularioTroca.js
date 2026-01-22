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
      // 1. Pegar dados do usuário logado de forma segura
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Você precisa estar logado para solicitar uma troca.");

      // 2. Inserir na nova tabela 'trocas'
      const { error: trocaError } = await supabase.from('trocas').insert([
        {
          pedido_id: pedido.id,
          cliente_id: user.id,
          cliente_email: user.email, // Importante para o seu dashboard e e-mail
          motivo: motivo,
          descricao: descricao
        }
      ]);

      if (trocaError) throw trocaError;

      // 3. Atualizar o status do pedido para "Em Análise de Troca"
      const { error: pedidoError } = await supabase
        .from('pedidos')
        .update({ status: 'Em Análise de Troca' })
        .eq('id', pedido.id);

      if (pedidoError) throw pedidoError;

      // 4. Disparar e-mail via API Route (Next.js)
      // Note: Esta chamada não deve travar o processo se o e-mail falhar
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pedidoId: pedido.id,
          clienteEmail: user.email,
          motivo: motivo,
          descricao: descricao
        }),
      }).catch(err => console.error("Erro ao disparar e-mail:", err));

      setSucesso(true);

      // 5. Fechar e atualizar após o sucesso
      setTimeout(() => {
        onFechar();
        window.location.reload();
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
      
      <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden">
        {/* Cabeçalho Estilo Lifestyle */}
        <div className="bg-orange-600 p-8 text-white">
          <button onClick={onFechar} className="absolute top-6 right-8 text-2xl hover:scale-110 transition-transform">
            <i className="bi bi-x-lg"></i>
          </button>
          <h2 className="text-3xl font-black uppercase italic leading-none tracking-tighter">
            Solicitar <br/><span className="text-black">Troca / Devolução</span>
          </h2>
          <p className="text-[10px] mt-2 font-bold opacity-80 uppercase tracking-widest">
            Protocolo Pedido: {pedido.id.slice(0, 8)}
          </p>
        </div>

        <div className="p-8">
          {sucesso ? (
            <div className="text-center py-10 animate-in fade-in zoom-in">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-black uppercase italic">Pedido Enviado!</h3>
              <p className="text-gray-500 mt-2 text-sm px-4">
                Analisaremos os detalhes e entraremos em contato com você em até 48h úteis através do seu e-mail.
              </p>
            </div>
          ) : (
            <form onSubmit={enviarSolicitacao} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Qual o motivo?</label>
                <select 
                  value={motivo} 
                  onChange={(e) => setMotivo(e.target.value)}
                  className="w-full border-2 border-gray-100 p-4 rounded-2xl bg-gray-50 font-bold text-sm focus:border-orange-600 outline-none transition-all cursor-pointer"
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
                  placeholder="Ex: A estampa veio com falha..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={enviando}
                className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-orange-600 transition-all shadow-xl active:scale-95 disabled:bg-gray-300"
              >
                {enviando ? 'Enviando Solicitação...' : 'Confirmar Troca'}
              </button>
              
              <p className="text-[9px] text-center text-gray-400 font-bold uppercase tracking-widest px-6">
                Ao clicar em confirmar, você declara estar ciente das políticas de troca da Loja Irá.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}