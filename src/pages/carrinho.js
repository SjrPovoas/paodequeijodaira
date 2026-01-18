import { useState } from 'react';
import Frete from '../components/Frete';

export default function Carrinho() {
  const [subtotal, setSubtotal] = useState(150.00); // Ex: Valor dos produtos
  const [valorFrete, setValorFrete] = useState(0);
  const [dadosEntrega, setDadosEntrega] = useState(null);

  const handleFreteCalculado = (dados) => {
    setValorFrete(dados.valor);
    setDadosEntrega(dados);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Meu Carrinho 🛒</h1>
      
      {/* Lista de Produtos (Simulação) */}
      <div className="mb-6 border-b pb-4">
        <p>1x Camiseta Pão de Queijo da Irá - R$ 150,00</p>
      </div>

      <Frete onFreteCalculado={handleFreteCalculado} />

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between text-lg">
          <span>Subtotal:</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg text-green-600">
          <span>Frete:</span>
          <span>{valorFrete > 0 ? `R$ ${valorFrete.toFixed(2)}` : 'Calcule o frete'}</span>
        </div>
        <div className="flex justify-between text-2xl font-black mt-2">
          <span>Total:</span>
          <span>R$ {(subtotal + valorFrete).toFixed(2)}</span>
        </div>
      </div>

      <button 
        disabled={valorFrete === 0}
        className="w-full mt-6 bg-green-600 text-white py-4 rounded-2xl font-bold text-xl disabled:bg-gray-400"
      >
        Finalizar Compra
      </button>
    </div>
  );
}
