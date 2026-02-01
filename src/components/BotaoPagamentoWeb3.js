"use client";
import { useState } from 'react';
import { useAccount, useSendTransaction, useSwitchChain, useChainId } from 'wagmi';
import { parseEther } from 'viem';
import { supabase } from '../lib/supabaseClient';

export default function BotaoPagamentoWeb3({ total, pedidoId, onSuccess }) {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [loading, setLoading] = useState(false);

  const REDE_CORRETA_ID = 137; // Polygon Mainnet
  const CARTEIRA_DESTINO = "0x9523160C1cAf82358B9a6af332E47d6F5fDb02ac";

  const { sendTransactionAsync } = useSendTransaction();

  const handlePagamentoCripto = async () => {
    if (!isConnected) {
      alert("⚠️ Carteira não detectada. Conecte-se pelo botão no topo.");
      return;
    }
    
    if (chainId !== REDE_CORRETA_ID) {
      alert("🔄 Solicitando troca de rede para Polygon...");
      switchChain({ chainId: REDE_CORRETA_ID });
      return;
    }

    if (!pedidoId) {
      alert("❌ Erro: ID do pedido não encontrado. Tente gerar o pedido novamente.");
      return;
    }

    setLoading(true);

    try {
      // Conversão simples (Ex: 1 POL = R$ 2.50)
      const precoPOL = 2.50; 
      const valorEmPOL = (total / precoPOL).toFixed(6);

      // Chamada que abre o pop-up da MetaMask
      const txHash = await sendTransactionAsync({
        to: CARTEIRA_DESTINO,
        value: parseEther(valorEmPOL.toString()),
      });

      // Atualiza o Supabase com o recibo da transação
      const { error } = await supabase
        .from('pedidos')
        .update({ 
          status_pagamento: 'Pago via Cripto', 
          hash_transacao: txHash 
        })
        .eq('id', pedidoId);

      if (error) throw error;

      onSuccess(txHash);

    } catch (err) {
      console.error("Erro na transação:", err);
      alert("Falha: " + (err.shortMessage || "A transação foi cancelada ou falhou."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePagamentoCripto}
      disabled={loading}
      className={`w-full py-5 rounded-[22px] font-black uppercase text-xs tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 ${
        loading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-orange-600 text-white hover:bg-black active:scale-95'
      }`}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-t-transparent border-orange-500 rounded-full animate-spin"></span>
          Aguardando Assinatura...
        </>
      ) : (
        <>Pagar R$ {total.toFixed(2)} com POL <i className="bi bi-shield-check"></i></>
      )}
    </button>
  );
}
