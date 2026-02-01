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
  const [pedidoIdAtivo, setPedidoIdAtivo] = useState(null);
  
//  const REDE_CORRETA_ID = 137; // Polygon Mainnet
  const REDE_CORRETA_ID = 80002; // Polygon Amoy Testnet
  const CARTEIRA_DESTINO = "0x9523160C1cAf82358B9a6af332E47d6F5fDb02ac";

  const { sendTransactionAsync } = useSendTransaction();

  // Função para buscar preço atual da POL em Reais
  const obterPrecoPOL = async () => {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=brl');
      const data = await res.json();
      return data['matic-network'].brl;
    } catch (e) {
      console.error("Erro ao buscar cotação, usando fallback.");
      return 2.50; // Valor de segurança caso a API falhe
    }
  };

  const handlePagamentoCripto = async () => {
    if (!isConnected) return alert("Conecte sua carteira!");
    
    if (chainId !== REDE_CORRETA_ID) {
      switchChain({ chainId: REDE_CORRETA_ID });
      return;
    }

    setLoading(true);

    try {
      // 1. Busca cotação em tempo real
      const precoAtualBRL = await obterPrecoPOL();
      const valorEmPOL = (total / precoAtualBRL).toFixed(6);

      // 2. Envia Transação
      const txHash = await sendTransactionAsync({
        to: CARTEIRA_DESTINO,
        value: parseEther(valorEmPOL),
      });

      // 3. Atualiza Supabase
      const { error } = await supabase
        .from('pedidos')
        .update({ 
          status_pagamento: 'Pago via Cripto', 
          hash_transacao: txHash,
          valor_pago_crypto: valorEmPOL 
        })
        .eq('id', pedidoId);

      if (error) throw error;

      onSuccess(txHash);

    } catch (err) {
      console.error("Erro:", err);
      alert("Falha no pagamento: " + (err.shortMessage || "Verifique seu saldo ou rede."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePagamentoCripto}
      disabled={loading}
      className={`w-full py-5 rounded-[22px] font-black uppercase text-xs tracking-widest transition-all shadow-xl ${
        loading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-orange-600 text-white hover:bg-black shadow-orange-200'
      }`}
    >
      {loading ? 'Processando na Blockchain...' : `Pagar R$ ${total.toFixed(2)} com POL`}
    </button>
  );
}
