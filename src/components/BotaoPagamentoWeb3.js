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
    // Verificação forçada de endereço
    if (!address) {
      alert("Sua carteira parece desconectada. Clique em 'Conectar' no topo do site.");
      return;
    }

    setLoading(true);
    try {
      // Força a atualização do estado da rede antes de enviar
      if (chainId !== REDE_CORRETA_ID) {
        await switchChain({ chainId: REDE_CORRETA_ID });
        setLoading(false); // Para o loading para o usuário clicar de novo após trocar
        return;
      }

      const precoPOL = 2.50; 
      const valorEmPOL = (total / precoPOL).toFixed(6);

      // Chamada direta que DEVE abrir a MetaMask
      const tx = await sendTransactionAsync({
        to: CARTEIRA_DESTINO,
        value: parseEther(valorEmPOL),
      });

      console.log("Sucesso! Hash:", tx);
  

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
