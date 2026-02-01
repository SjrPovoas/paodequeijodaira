"use client";

import { useState } from 'react';
import { useAccount, useSendTransaction, useSwitchChain, useChainId } from 'wagmi';
import { parseEther } from 'viem';
import { supabase } from '../lib/supabaseClient';

export default function BotaoPagamentoWeb3({ total, pedidoId, onSuccess }) {
  // Hooks do Wagmi para gerenciar a carteira
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain(); // Usando versão Async para melhor controle
  const [loading, setLoading] = useState(false);

  // Configurações Fixas
  const REDE_CORRETA_ID = 137; // ID da Polygon Mainnet
  const CARTEIRA_DESTINO = "0x9523160C1cAf82358B9a6af332E47d6F5fDb02ac";

  // Hook que dispara a janela da MetaMask
  const { sendTransactionAsync } = useSendTransaction();

  const handlePagamentoCripto = async () => {
    // 1. Verifica conexão básica
    if (!isConnected || !address) {
      alert("⚠️ Carteira não detectada. Por favor, conecte-se.");
      return;
    }

    setLoading(true);

    try {
      // 2. Verificação de Rede com tentativa de correção automática
      // Se o ID da rede no código for diferente de 137, tentamos forçar a troca
      if (chainId !== REDE_CORRETA_ID) {
        try {
          console.log("Tentando trocar de rede para 137...");
          await switchChainAsync({ chainId: REDE_CORRETA_ID });
        } catch (switchError) {
          console.error("Erro ao trocar rede:", switchError);
          // Se falhar a troca, não travamos o código, tentamos prosseguir
        }
      }

      // 3. Cálculo do Valor (Exemplo: R$ 2.50 por 1 POL)
      // Ajuste o valor de precoPOL conforme a cotação do dia
      const precoPOL = 2.50; 
      const valorEmPOL = (total / precoPOL).toFixed(6);

      console.log(`Solicitando assinatura: ${valorEmPOL} POL`);

      // 4. DISPARO DA METAMASK (Assinar Contrato/Taxa)
      // Esta função DEVE abrir o pop-up da MetaMask
      const txHash = await sendTransactionAsync({
        to: CARTEIRA_DESTINO,
        value: parseEther(valorEmPOL.toString()),
      });

      console.log("Transação enviada! Hash:", txHash);

      // 5. ATUALIZAÇÃO DO SUPABASE
      // Só chegamos aqui se o usuário clicar em "Confirmar" na MetaMask
      const { error } = await supabase
        .from('pedidos')
        .update({ 
          status_pagamento: 'Pago via Cripto', 
          hash_transacao: txHash,
          pago_em: new Date().toISOString()
        })
        .eq('id', pedidoId);

      if (error) throw error;

      // 6. SUCESSO FINAL
      onSuccess(txHash);

    } catch (err) {
      console.error("Erro no processo Web3:", err);
      
      // Tratamento de erro amigável
      if (err.message.includes("User rejected")) {
        alert("❌ Você recusou a transação na MetaMask.");
      } else {
        alert("Falha no pagamento: " + (err.shortMessage || "Verifique seu saldo de POL para taxas de gás."));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-2">
      <button
        onClick={handlePagamentoCripto}
        disabled={loading}
        className={`w-full py-5 rounded-[22px] font-black uppercase text-xs tracking-[0.1em] transition-all shadow-xl flex items-center justify-center gap-3 ${
          loading 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-orange-600 text-white hover:bg-black active:scale-95 shadow-orange-200'
        }`}
      >
        {loading ? (
          <>
            <span className="w-5 h-5 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></span>
            Processando...
          </>
        ) : (
          <>
            Pagar R$ {total.toFixed(2)} com POL
            <i className="bi bi-shield-lock-fill text-lg"></i>
          </>
        )}
      </button>
      
      {/* Aviso auxiliar para o usuário */}
      <p className="text-[9px] text-center text-gray-400 mt-3 font-bold uppercase tracking-tighter">
        Certifique-se de ter saldo em POL para cobrir as taxas de rede (gas).
      </p>
    </div>
  );
}
