import { useState } from 'react';
import { ethers } from 'ethers';
import { converterRealParaPOL } from '../lib/priceService';

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [metodo, setMetodo] = useState('pix'); // 'pix' ou 'pol'
  
  // Estados para os dados sensíveis (pedidos apenas aqui)
  const [dados, setDados] = useState({ cpf: '', numero: '', complemento: '' });

  // Exemplo de itens (isso viria do seu carrinho/contexto)
  const itensNoCarrinho = [{ nome: "Camiseta Pão de Queijo", preco: 150.00, quantidade: 1 }];
  const totalGeral = 150.00;

  const handleInputChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  // LÓGICA MERCADO PAGO
  const checkoutMercadoPago = async () => {
    if (!dados.cpf) return alert("CPF é obrigatório para entrega.");
    setLoading(true);

    try {
      const res = await fetch('/api/checkout-mp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          itens: itensNoCarrinho, 
          total: totalGeral,
          cpf: dados.cpf,
          endereco: dados.numero
        }),
      });
      const data = await res.json();
      if (data.init_point) window.location.href = data.init_point;
    } catch (err) {
      alert("Erro ao iniciar Mercado Pago");
    } finally {
      setLoading(false);
    }
  };

  // LÓGICA BLOCKCHAIN (POL)
  const checkoutCripto = async () => {
    if (!window.ethereum) return alert("Instale a MetaMask!");
    setLoading(true);

    try {
      const valorPOL = await converterRealParaPOL(totalGeral);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: "0xSUA_CARTEIRA_AQUI", // Onde você recebe os POLs
        value: ethers.parseEther(valorPOL)
      });

      alert(`Sucesso! Hash da transação: ${tx.hash}`);
      // Aqui você salvaria o hash + dados de entrega no Supabase
    } catch (err) {
      alert("Falha na transação Web3");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Finalizar Compra</h2>

      {/* Dados de Entrega (Sensíveis) */}
      <div className="space-y-4 mb-8">
        <input name="cpf" placeholder="Seu CPF" onChange={handleInputChange} className="w-full p-3 border rounded" />
        <input name="numero" placeholder="Número da Residência" onChange={handleInputChange} className="w-full p-3 border rounded" />
      </div>

      {/* Seleção de Pagamento */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setMetodo('pix')}
          className={`flex-1 p-4 border rounded ${metodo === 'pix' ? 'border-orange-500 bg-orange-50' : ''}`}
        >
          Pix / Cartão
        </button>
        <button 
          onClick={() => setMetodo('pol')}
          className={`flex-1 p-4 border rounded ${metodo === 'pol' ? 'border-purple-500 bg-purple-50' : ''}`}
        >
          POL (Polygon)
        </button>
      </div>

      <button
        onClick={metodo === 'pix' ? checkoutMercadoPago : checkoutCripto}
        disabled={loading}
        className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:opacity-90 transition"
      >
        {loading ? "Processando..." : `Pagar R$ ${totalGeral.toFixed(2)}`}
      </button>
    </div>
  );
}
