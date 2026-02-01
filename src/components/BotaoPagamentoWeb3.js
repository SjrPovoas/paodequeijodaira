"use client";
  
import { polygon } from 'viem/chains';
import { useState } from 'react';
import { useAccount, useSendTransaction, useSwitchChain, useChainId } from 'wagmi';
import { parseEther } from 'viem';
import { supabase } from '../lib/supabaseClient';

export default function BotaoPagamentoWeb3({ total, pedidoId, onSuccess }) {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [loading, setLoading] = useState(false);

  //  const REDE_CORRETA_ID = 137; // Polygon Mainnet
  const REDE_CORRETA_ID = 80002; // Polygon Amoy Testnet
  const CARTEIRA_DESTINO = "0x9523160C1cAf82358B9a6af332E47d6F5fDb02ac";

  const { sendTransactionAsync } = useSendTransaction();

  const handlePagamentoCripto = async () => {
    console.log("Iniciando pagamento...", { isConnected, chainId, pedidoId, total });

    if (!isConnected) {
      alert("⚠️ Carteira não conectada. Por favor, conecte via RainbowKit.");
      return;
    }
    
    if (chainId !== REDE_CORRETA_ID) {
      alert("🔄 Alterando rede para Polygon...");
      switchChain({ chainId: REDE_CORRETA_ID });
      return;
    }

    if (!pedidoId) {
      alert("❌ Erro técnico: ID do pedido não encontrado no estado.");
      return;
    }

    setLoading(true);

    try {
      // 1. Busca cotação (ou usa fixo para teste rápido)
      const precoPOL = 2.50; // Ajuste conforme a cotação
      const valorEmPOL = (total / precoPOL).toFixed(6);
      
      console.log(`Enviando ${valorEmPOL} POL para ${CARTEIRA_DESTINO}`);

      // 2. DISPARA A CARTEIRA (Aqui é onde o MetaMask/Rainbow deve abrir)
      const txHash = await sendTransactionAsync({
        to: CARTEIRA_DESTINO,
        value: parseEther(valorEmPOL.toString()),
      });

      console.log("Transação assinada! Hash:", txHash);

      // 3. ATUALIZA O SUPABASE
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
      console.error("Erro detalhado:", err);
      alert("Falha no pagamento: " + (err.shortMessage || err.message || "Usuário cancelou ou saldo insuficiente."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // Evita qualquer comportamento estranho de formulário
        handlePagamentoCripto();
      }}
      disabled={loading}
      className={`w-full py-5 rounded-[22px] font-black uppercase text-xs tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 ${
        loading ? 'bg-gray-100 text-gray-400' : 'bg-orange-600 text-white hover:bg-black active:scale-95'
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
