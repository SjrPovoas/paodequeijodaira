"use client";
import { polygon } from 'viem/chains';
import { useState, useEffect } from 'react';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt, useChainId, useSwitchChain } from 'wagmi';
import { parseEther } from 'viem';
import { supabase } from '../lib/supabaseClient';
import { converterRealParaPOL } from '../lib/priceService';

/**
 * @param {number} total - Valor total em BRL
 * @param {object} dadosCliente - Objeto com nome, email, cep, etc.
 * @param {function} onBeforeClick - Função que registra o pedido no Supabase e retorna o ID
 */
export default function BotaoPagamentoWeb3({ total, dadosCliente, onBeforeClick }) {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [loading, setLoading] = useState(false);

  // Configurações da Rede Polygon Mainnet
  const REDE_CORRETA_ID = 137; 
  const CARTEIRA_DESTINO = "0x9523160C1cAf82358B9a6af332E47d6F5fDb02ac"; 

  const { sendTransactionAsync } = useSendTransaction();

  const handlePagamentoCripto = async () => {
    // 1. Validações de conexão
    if (!isConnected) {
      alert("Por favor, conecte sua carteira primeiro.");
      return;
    }
    
    if (chainId !== REDE_CORRETA_ID) {
      alert("Por favor, altere sua rede para Polygon.");
      if (switchChain) switchChain({ chainId: REDE_CORRETA_ID });
      return;
    }

    setLoading(true);

    try {
      // 2. Registrar o pedido no Supabase antes de cobrar
      // Esta função vem da Loja.js e já valida os campos
      const pedidoId = await onBeforeClick();
      
      if (!pedidoId) {
        setLoading(false);
        return; 
      }

      // 3. Converter BRL para POL usando seu PriceService
      const quantidadePOL = await converterRealParaPOL(total);

      if (!quantidadePOL) {
        throw new Error("Erro ao obter cotação. Verifique sua conexão.");
      }

      // 4. Executar a transação na Blockchain
      const txHash = await sendTransactionAsync({
        to: CARTEIRA_DESTINO,
        value: parseEther(quantidadePOL),
      });

      // 5. Atualizar o pedido para "Pago" no Supabase com o Hash da transação
      const { error: errUpdate } = await supabase
        .from('pedidos')
        .update({ 
          status: 'Pago', 
          hash_transacao: txHash,
          pago_em: new Date().toISOString(),
          metodo_pagamento: 'Web3 Cripto (POL)',
          wallet_address: address // Salva a carteira que pagou para auditoria
        })
        .eq('id', pedidoId);

      if (errUpdate) {
        console.error("Erro ao atualizar banco:", errUpdate.message);
        // O pagamento foi feito, mas o banco falhou. Logamos o erro.
      }

      alert(`🎉 Sucesso! Pagamento de ${quantidadePOL} POL enviado.`);
      
      // 6. Redirecionar para página de sucesso
      window.location.href = `/sucesso?id=${pedidoId}&tx=${txHash}`;

    } catch (err) {
      console.error("Erro no fluxo Web3:", err);
      // Tratamento amigável de erro (Rejeição do usuário ou erro de rede)
      const msg = err.shortMessage || err.message || "Erro desconhecido";
      if (msg.includes("User rejected")) {
        alert("Transação cancelada pelo usuário.");
      } else {
        alert("Falha no pagamento: " + msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full group">
      <button
        onClick={handlePagamentoCripto}
        disabled={loading}
        className={`w-full py-5 font-black uppercase text-xs tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg ${
          loading 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-black text-white hover:bg-orange-600 active:scale-95'
        }`}
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
            Processando Blockchain...
          </>
        ) : (
          <>
            <i className="bi bi-currency-bitcoin text-lg text-orange-500"></i>
            Pagar com Cripto (POL)
          </>
        )}
      </button>
      
      <p className="text-[8px] text-center mt-3 font-bold text-gray-400 uppercase tracking-tighter">
        Pagamento processado via rede Polygon (POL)
      </p>
    </div>
  );
}         
