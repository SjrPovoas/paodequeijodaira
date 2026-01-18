import { useState } from 'react';
import { ethers } from 'ethers'; // npm install ethers

export default function Checkout({ total, itens, enderecoCep }) {
  const [metodo, setMetodo] = useState('pix'); // pix ou cripto
  const [loading, setLoading] = useState(false);

  // --- FUNÇÃO PARA PAGAR COM MERCADO PAGO ---
  const pagarMercadoPago = async () => {
    setLoading(true);
    const res = await fetch('/api/checkout-mp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itens, total, email: 'cliente@email.com' })
    });
    const data = await res.json();
    window.location.href = data.init_point; // Redireciona para o Google Pay/Pix/Cartão
  };

  // --- FUNÇÃO PARA PAGAR COM POL (POLYGON) ---
  const pagarComPOL = async () => {
    if (!window.ethereum) return alert("Instale a MetaMask!");
    
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Supondo que 1 POL = R$ 3.00 (Você precisaria de um oráculo de preço aqui)
      const valorEmPOL = (total / 3.00).toFixed(4); 

      const tx = await signer.sendTransaction({
        to: "0xSUA_CARTEIRA_AQUI", // Sua carteira que recebe os POLs
        value: ethers.parseEther(valorEmPOL)
      });

      alert(`Pagamento enviado! Hash: ${tx.hash}`);
      // Aqui você salvaria o tx.hash no Supabase junto com o pedido
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-2xl rounded-3xl border border-gray-100">
      <h2 className="text-xl font-black mb-4">Finalizar Pedido 🏁</h2>
      
      {/* SELEÇÃO DE MÉTODO */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button 
          onClick={() => setMetodo('pix')}
          className={`p-4 rounded-xl border-2 transition ${metodo === 'pix' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}
        >
          💳 Pix / Cartão / G-Pay
        </button>
        <button 
          onClick={() => setMetodo('cripto')}
          className={`p-4 rounded-xl border-2 transition ${metodo === 'cripto' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
        >
          💜 POL (Polygon)
        </button>
      </div>

      {/* FORMULÁRIO DE ENTREGA FINAL */}
      <div className="space-y-3 mb-6">
        <input className="w-full border p-3 rounded-lg" placeholder="CPF do Recebedor" />
        <input className="w-full border p-3 rounded-lg" placeholder="Número da Casa / Apto" />
        <input className="w-full border p-3 rounded-lg" placeholder="Complemento (Opcional)" />
      </div>

      <div className="bg-gray-100 p-4 rounded-xl mb-6">
        <p className="flex justify-between font-bold text-lg">
          <span>Total a Pagar:</span>
          <span>R$ {total.toFixed(2)}</span>
        </p>
      </div>

      {metodo === 'pix' ? (
        <button 
          onClick={pagarMercadoPago}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          {loading ? 'Processando...' : 'Pagar com Mercado Pago'}
        </button>
      ) : (
        <button 
          onClick={pagarComPOL}
          className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold hover:bg-purple-700 transition"
        >
          {loading ? 'Conectando Blockchain...' : 'Pagar em POL'}
        </button>
      )}
    </div>
  );
            }
