import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';
import Head from 'next/head';

export default function AdminTrocas() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({ pendentes: 0, aprovadas: 0, total: 0 });

  useEffect(() => {
    const verificarAcessoEBuscarDados = async () => {
      // 1. Verifica sessão e e-mail do admin
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || session.user.email !== 'sjrpovoas@gmail.com') {
        window.location.href = '/admin/login';
        return;
      }

      setIsAdmin(true);
      await buscarTrocas();
    };

    verificarAcessoEBuscarDados();
  }, []);

  async function buscarTrocas() {
    setLoading(true);
    try {
      // Busca trocas e faz o "join" básico com pedidos para pegar itens/valor
      const { data, error } = await supabase
        .from('trocas')
        .select(`
          *,
          pedidos (
            resumo_itens,
            total,
            status
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setSolicitacoes(data);
        // Atualiza contadores
        const pendentes = data.filter(s => s.status === 'Pendente').length;
        const aprovadas = data.filter(s => s.status === 'Aprovada').length;
        setStats({ pendentes, aprovadas, total: data.length });
      }
    } catch (err) {
      console.error("Erro ao buscar dados:", err.message);
    } finally {
      setLoading(false);
    }
  }

  async function atualizarStatus(id, novoStatus, pedidoId) {
    if (!confirm(`Deseja marcar esta solicitação como ${novoStatus.toUpperCase()}?`)) return;

    setLoading(true);
    try {
      // 1. Atualiza a tabela de trocas
      const { error: erroTroca } = await supabase
        .from('trocas')
        .update({ status: novoStatus })
        .eq('id', id);

      if (erroTroca) throw erroTroca;

      // 2. Atualiza a tabela de pedidos para o cliente ver o status novo
      const statusFinalPedido = novoStatus === 'Aprovada' ? 'Troca Aprovada' : 'Troca Negada';
      const { error: erroPedido } = await supabase
        .from('pedidos')
        .update({ status: statusFinalPedido })
        .eq('id', pedidoId);

      if (erroPedido) throw erroPedido;

      alert(`Sucesso: Solicitação ${novoStatus}!`);
      await buscarTrocas(); // Recarrega a lista e stats
    } catch (err) {
      alert("Erro na operação: " + err.message);
    } finally {
      setLoading(false);
    }
  }

async function handleLogout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert("Erro ao sair: " + error.message);
  } else {
    window.location.href = '/admin/login';
  }
}

  if (!isAdmin) return null; // Evita "flicker" de conteúdo antes do redirecionamento

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-black font-sans p-4 md:p-12">
      <Head>
        <title>Painel Admin | Trocas da Loja Lifestyle do Pão de Queijo da Irá</title>
      </Head>

      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="flex gap-4 mb-2">
              <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-orange-600 transition-colors">
                ← Ver Loja
              </Link>
              <button onClick={handleLogout} className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline">
                Sair do Sistema
              </button>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
              GERÊNCIA DE <span className="text-orange-600">TROCAS</span>
            </h1>
          </div>
          
          <div className="bg-black text-white p-6 border-b-8 border-orange-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
            <p className="text-[9px] font-black uppercase opacity-50 tracking-widest mb-1">Operador Logado</p>
            <p className="font-black italic text-sm">sjrpovoas@gmail.com</p>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-yellow-400 border-[4px] border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-[11px] font-black uppercase tracking-tighter">Aguardando Análise</h3>
            <p className="text-6xl font-black italic">{stats.pendentes}</p>
          </div>
          <div className="bg-green-400 border-[4px] border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-[11px] font-black uppercase tracking-tighter">Trocas Aprovadas</h3>
            <p className="text-6xl font-black italic">{stats.aprovadas}</p>
          </div>
          <div className="bg-white border-[4px] border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-[11px] font-black uppercase tracking-tighter">Total Histórico</h3>
            <p className="text-6xl font-black italic">{stats.total}</p>
          </div>
        </div>

        {/* LISTA DE SOLICITAÇÕES */}
        <div className="space-y-8">
          {loading && solicitacoes.length === 0 ? (
            <div className="text-center py-20 font-black uppercase animate-pulse text-gray-400 text-2xl italic">Sincronizando Banco de Dados...</div>
          ) : solicitacoes.length === 0 ? (
            <div className="bg-white border-4 border-black p-20 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-black uppercase italic text-gray-300 text-4xl">Nenhuma solicitação encontrada</p>
            </div>
          ) : (
            solicitacoes.map((item) => (
              <div key={item.id} className="bg-white border-[4px] border-black p-6 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
                
                <div className="flex flex-col lg:flex-row justify-between gap-10 relative z-10">
                  
                  {/* Informações da Troca */}
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <span className={`px-5 py-1 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-black ${
                        item.status === 'Pendente' ? 'bg-yellow-400' : 
                        item.status === 'Aprovada' ? 'bg-green-400' : 'bg-red-400 text-white'
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                        {new Date(item.created_at).toLocaleDateString('pt-BR')} — {new Date(item.created_at).toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}
                      </span>
                    </div>

                    <h2 className="text-3xl font-black uppercase italic leading-none mb-2 break-all">
                      {item.cliente_email}
                    </h2>
                    <p className="text-sm font-bold text-orange-600 uppercase mb-6 flex items-center gap-2">
                      <span className="bg-orange-100 px-2 py-0.5 border border-orange-200">PEDIDO: #{item.pedido_id.slice(0, 8)}</span>
                      <span className="text-black/40">—</span>
                      <span>{item.pedidos?.resumo_itens || 'Itens não listados'}</span>
                    </p>
                    
                    <div className="bg-gray-50 p-6 border-l-[10px] border-black">
                      <div className="mb-4">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Motivo Alegado:</p>
                        <p className="font-black text-sm uppercase underline decoration-orange-500 decoration-2 underline-offset-4">{item.motivo}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Descrição Detalhada:</p>
                        <p className="text-lg font-medium italic text-gray-700 leading-relaxed">"{item.descricao}"</p>
                      </div>
                    </div>
                  </div>

                  {/* Ações Administrativas */}
                  <div className="flex flex-col gap-3 min-w-[240px] justify-center">
                    {item.status === 'Pendente' && (
                      <>
                        <button 
                          onClick={() => atualizarStatus(item.id, 'Aprovada', item.pedido_id)}
                          className="w-full bg-green-500 hover:bg-black text-white p-5 font-black uppercase text-xs tracking-widest transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                        >
                          ✓ Aprovar Solicitação
                        </button>
                        <button 
                          onClick={() => atualizarStatus(item.id, 'Negada', item.pedido_id)}
                          className="w-full bg-red-500 hover:bg-black text-white p-5 font-black uppercase text-xs tracking-widest transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                        >
                          ✕ Negar Solicitação
                        </button>
                      </>
                    )}
                    <button className="w-full bg-white hover:bg-orange-600 hover:text-white p-4 font-black uppercase text-[10px] tracking-widest transition-all border-2 border-black group">
                      Visualizar Pedido Completo
                    </button>
                  </div>
                </div>

                {/* Marca d'água de fundo brutalista */}
                <div className="absolute right-[-20px] bottom-[-20px] text-gray-50 text-9xl font-black italic pointer-events-none -z-0 select-none uppercase">
                  {item.id.slice(0,4)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <footer className="mt-20 pt-10 border-t-2 border-gray-200 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.6em] text-gray-300">
            Loja Lifestyle e Acessórios do Pão de Queijo da Irá | Admin — Sistema de Controle de Qualidade v1.0
          </p>
        </footer>
      </div>
    </div>
  );
}