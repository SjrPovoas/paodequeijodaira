import { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import FormularioTroca from '../components/FormularioTroca';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [pedidoParaTrocar, setPedidoParaTrocar] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      // 1. Verifica se há um usuário logado
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // 2. Busca pedidos vinculados ao email ou à carteira web3 salva no metadado
        const { data, error } = await supabase
          .from('pedidos')
          .select('*')
          .or(`cliente_email.eq.${user.email},wallet_address.eq.${user.user_metadata?.wallet || 'none'}`)
          .order('created_at', { ascending: false });

        if (!error) setPedidos(data);
      }
      setLoading(false);
    }

    carregarDados();
  }, []);

  // Componente interno para a etiqueta de status
  const StatusBadge = ({ status }) => {
    const estilos = {
      'Preparando': 'bg-blue-100 text-blue-700',
      'Saiu para Entrega': 'bg-orange-100 text-orange-700',
      'Entregue': 'bg-green-100 text-green-700',
      'Cancelado': 'bg-red-100 text-red-700',
      'Em Análise de Troca': 'bg-purple-100 text-purple-700'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${estilos[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <Head>
        <title>Meus Pedidos | Pão de Queijo da Irá</title>
      </Head>

      <div className="max-w-3xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black uppercase tracking-tighter">Meus Pedidos 📦</h1>
          <p className="text-gray-500">Acompanhe suas compras de camisetas e acessórios.</p>
        </header>

        {!user ? (
          <div className="bg-white p-10 rounded-3xl text-center shadow-sm">
            <p className="text-gray-600 mb-6">Você precisa estar logado para ver seu histórico.</p>
            <button className="bg-black text-white px-8 py-3 rounded-full font-bold">Fazer Login</button>
          </div>
        ) : pedidos.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl text-center shadow-sm">
            <p className="text-gray-500 italic">Nenhum pedido encontrado.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">ID: {pedido.id.slice(0, 8)}</span>
                    <p className="text-sm text-gray-500">
                      {new Date(pedido.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <StatusBadge status={pedido.status} />
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="font-bold text-lg">{pedido.resumo_itens || 'Produtos da Loja Irá'}</h3>
                    <p className="text-orange-600 font-black text-xl">R$ {pedido.total.toFixed(2)}</p>
                  </div>

                  <div className="flex gap-2">
                    {/* Botão de Troca só aparece se o produto foi entregue */}
                    {pedido.status === 'Entregue' && (
                      <button 
                        onClick={() => setPedidoParaTrocar(pedido)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold transition"
                      >
                        Trocar / Devolver
                      </button>
                    )}
                    <button className="border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-xl text-sm font-bold transition">
                      Ver Detalhes
                    </button>
                  </div>
                </div>

                {/* Exibição de comprovante Blockchain se houver */}
                {pedido.tx_hash && (
                  <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-mono">HASH: {pedido.tx_hash.slice(0, 16)}...</span>
                    <a 
                      href={`https://polygonscan.com/tx/${pedido.tx_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-600 font-bold hover:underline"
                    >
                      Ver na PolygonScan ↗
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Troca/Devolução */}
      {pedidoParaTrocar && (
        <FormularioTroca 
          pedido={pedidoParaTrocar} 
          onFechar={() => setPedidoParaTrocar(null)} 
        />
      )}
    </div>
  );
                        }
