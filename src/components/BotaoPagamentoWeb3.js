"use client";
  
import { polygon } from 'viem/chains';
import { useState } from 'react';
import { useAccount, useSendTransaction, useSwitchChain, useChainId } from 'wagmi';
import { parseEther } from 'viem';
import { supabase } from '../lib/supabaseClient';

export default function BotaoPagamentoWeb3({ total, pedidoId, onSuccess }) {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [loading, setLoading] = useState(false);

  const REDE_CORRETA_ID = 137; // Polygon Mainnet
  const CARTEIRA_DESTINO = "0x9523160C1cAf82358B9a6af332E47d6F5fDb02ac";

  const { sendTransactionAsync } = useSendTransaction();

  const handlePagamentoCripto = async () => {
    if (!isConnected) {
      alert("⚠️ Conecte sua carteira primeiro.");
      return;
    }
    
    if (chainId !== REDE_CORRETA_ID) {
      alert("🔄 Mudando para a rede Polygon...");
      switchChain({ chainId: REDE_CORRETA_ID });
      return;
    }

    if (!pedidoId) {
      alert("❌ Erro: ID do pedido não encontrado.");
      return;
    }

    setLoading(true);

    try {
      // Valor fixo de conversão (ajustável conforme mercado)
      const precoPOL = 2.50; 
      const valorEmPOL = (total / precoPOL).toFixed(6);

      // A LINHA QUE ESTAVA COM ERRO FOI CORRIGIDA ABAIXO:
      const txHash = await sendTransactionAsync({
        to: CARTEIRA_DESTINO,
        value: parseEther(valorEmPOL.toString()),
      });

      // Atualiza o status no Supabase
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
      console.error("Erro no pagamento:", err);
      alert("Falha: " + (err.shortMessage || err.message || "Erro na transação."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePagamentoCripto}
      disabled={loading}
      className={`w-full py-5 rounded-[22px] font-black uppercase text-xs tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 ${
        loading ? 'bg-gray-100 text-gray-400' : 'bg-orange-600 text-white hover:bg-black'
      }`}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-t-transparent border-orange-500 rounded-full animate-spin"></span>
          Aguardando Carteira...
        </>
      ) : (
        <>Pagar R$ {total.toFixed(2)} com POL <i className="bi bi-shield-check"></i></>
      )}
    </button>
  );
}
