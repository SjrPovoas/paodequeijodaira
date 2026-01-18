import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Head from 'next/head';

export default function HistoricoPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      // 1. Pega o usuário logado (via Supabase Auth)
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // 2. Busca pedidos vinculados ao email OU à carteira (se salvou no profile)
        const { data, error } = await supabase
          .from('pedidos')
          .select('*')
          .or(`cliente_email.eq.${user.email},wallet_address.eq.${user.user_metadata.wallet}`)
          .order('created_at', { ascending: false });

        if (!error) setPedidos(data);
      }
      setLoading(false);
    };

    fetchUserAndOrders();
  }, []);

  if (loading) return <div className="text-center p-20">Carregando seus pedidos...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Head><title>Meus Pedidos | Pão de Queijo da Irá</title></Head>
      
      <h1 className="text-3xl font-black mb-8 uppercase tracking-tighter">📦 Meus Pedidos</h1>

      {!user ? (
        <div className="bg-orange-50 p-8 rounded-3xl text-center">
          <p className="mb-4">Você precisa estar logado para ver seus pedidos.</p>
          <button className="bg-black text-white px-6 py-2 rounded-full">Fazer Login</button>
        </div>
      ) : pedidos.length === 0 ? (
        <p className="text-gray-500 italic">Você ainda não realizou compras na nossa loja.</p>
      ) : (
        <div className="space-y-6">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="border rounded-3xl p-6 hover:shadow-md transition bg-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">Pedido #{pedido.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-500">{new Date(pedido.created_at).toLocaleDateString('pt-BR')}</p>
                </div>
                <StatusBadge status={pedido.status} />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold">{pedido.itens_resumo || "Produtos Diversos"}</p>
                  <p className="text-orange-600 font-black text-lg">R$ {pedido.total.toFixed(2)}</p>
                </div>
                
                {/* Botão de Rastreio ou Troca */}
                <div className="flex gap-2">
                   <button className="text-sm border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50">
                    Detalhes
                  </button>
                  {pedido.status === 'Entregue' && (
                    <button className="text-sm bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200">
                      Trocar / Devolver
                    </button>
                  )}
                </div>
              </div>

              {/* Se for pagamento Web3, mostra o link da Blockchain */}
              {pedido.tx_hash && (
                <div className="mt-4 pt-4 border-t text-xs">
                  <a 
                    href={`https://polygonscan.com/tx/${pedido.tx_hash}`} 
                    target="_blank" 
                    className="text-purple-600 hover:underline flex items-center gap-1"
                  >
                    🔗 Ver comprovante na Polygon Scan
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Pequeno componente para as etiquetas de status
function StatusBadge({ status }) {
  const cores = {
    'Preparando': 'bg-blue-100 text-blue-700',
    'Saiu para Entrega': 'bg-orange-100 text-orange-700',
    'Entregue': 'bg-green-100 text-green-700',
    'Cancelado': 'bg-red-100 text-red-700',
    'Em Análise de Troca': 'bg-purple-100 text-purple-700'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${cores[status] || 'bg-gray-100'}`}>
      {status}
    </span>
  );
}
