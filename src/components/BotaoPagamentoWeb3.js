import { useState } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { converterRealParaPOL } from '../lib/priceService';
import { supabase } from '../lib/supabaseClient';

export default function BotaoPagamentoWeb3({ totalBRL, itens, dadosEntrega }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const realizarPagamentoCripto = async () => {
    // 1. Verificações Iniciais
    if (!window.ethereum) {
      alert("Por favor, instale a MetaMask para pagar com POL.");
      return;
    }

    const carteiraDestino = process.env.NEXT_PUBLIC_WALLET_DESTINO;
    if (!carteiraDestino) {
      alert("Erro técnico: Carteira de destino não configurada.");
      return;
    }

    setLoading(true);

    try {
      // 2. Conexão com a Carteira do Cliente
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();

      // 3. Conversão de Preço (Oráculo)
      const valorEmPOL = await converterRealParaPOL(totalBRL);
      if (!valorEmPOL) throw new Error("Não foi possível obter a cotação do POL.");

      // 4. Execução da Transação
      const tx = await signer.sendTransaction({
        to: carteiraDestino,
        value: ethers.parseEther(valorEmPOL)
      });

      // 5. Registro no Banco de Dados (Supabase)
      // Salvamos o hash IMEDIATAMENTE após o envio
      await supabase.from('pedidos').insert([{
        cliente_email: dadosEntrega.email,
        wallet_address: walletAddress,
        total: totalBRL,
        resumo_itens: itens.map(i => `${i.quantidade}x ${i.nome}`).join(", "),
        status: 'Aguardando Confirmação',
        tx_hash: tx.hash,
        cep: dadosEntrega.cep,
        endereco_completo: dadosEntrega.endereco
      }]);

      // 6. Aguarda a confirmação da Blockchain
      await tx.wait();

      // 7. Sucesso!
      router.push(`/sucesso?tx=${tx.hash}`);

    } catch (error) {
      console.error("Erro na transação:", error);
      alert("A transação foi cancelada ou falhou. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={realizarPagamentoCripto}
      disabled={loading}
      className="w-full bg-[#8247E5] text-white pt-4 px-4 py-4 font-bold hover:shadow-purple-500/50 shadow-lg transition-all flex items-center justify-center gap-3"
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Validando na Blockchain...</span>
        </div>
      ) : (
        <>
          <span>Pagar com Polygon (POL)</span>
        </>
      )}
    </button>
  );
}