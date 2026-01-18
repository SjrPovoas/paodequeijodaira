import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function FormularioTroca({ pedido, onFechar }) {
  const [motivo, setMotivo] = useState('Defeito de fabricação');
  const [descricao, setDescricao] = useState('');
  const [enviando, setEnviando] = useState(false);

  const enviarSolicitacao = async (e) => {
    e.preventDefault();
    setEnviando(true);

    const { error } = await supabase.from('trocas').insert([
      {
        pedido_id: pedido.id,
        motivo: motivo,
        descricao: descricao,
        cliente_id: (await supabase.auth.getUser()).data.user.id
      }
    ]);

    // Atualiza o status do pedido para que o cliente saiba que está em análise
    await supabase
      .from('pedidos')
      .update({ status: 'Em Análise de Troca' })
      .eq('id', pedido.id);

    if (!error) {
      alert("Solicitação enviada com sucesso! Analisaremos em até 48h.");
      onFechar();
      window.location.reload(); // Atualiza a tela para mostrar o novo status
    } else {
      alert("Erro ao enviar. Tente novamente.");
    }
    setEnviando(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-3xl max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-orange-600">Solicitar Troca ou Devolução</h2>
        <p className="text-sm text-gray-500 mb-6">Pedido: #{pedido.id.slice(0, 8)}</p>
        
        <form onSubmit={enviarSolicitacao} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Motivo principal:</label>
            <select 
              value={motivo} 
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full border p-3 rounded-xl bg-gray-50"
            >
              <option>Defeito de fabricação (Camiseta/Caneca)</option>
              <option>Tamanho incorreto</option>
              <option>Produto danificado no transporte</option>
              <option>Arrependimento (7 dias)</option>
              <option>Outros</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Detalhes (Opcional):</label>
            <textarea 
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full border p-3 rounded-xl h-32"
              placeholder="Explique o que aconteceu..."
            ></textarea>
          </div>

          <div className="flex gap-3">
            <button 
              type="button" 
              onClick={onFechar}
              className="flex-1 py-3 font-bold text-gray-500"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={enviando}
              className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 disabled:bg-gray-400"
            >
              {enviando ? 'Enviando...' : 'Enviar Pedido'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
