"use client";
import { useSendTransaction, useAccount, useWaitForTransactionReceipt, useChainId, useSwitchChain } from 'wagmi';
import { parseEther } from 'viem';
import { polygon } from 'viem/chains';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function BotaoPagamentoWeb3({ totalBRL, itens, dadosEntrega }) {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  
  const [hash, setHash] = useState(null);
  const [valorPOL, setValorPOL] = useState('0.00'); // Começa como string válida
  const [carregando, setCarregando] = useState(false);

  const { sendTransactionAsync } = useSendTransaction();
  const { isLoading: confirmando, isSuccess } = useWaitForTransactionReceipt({ hash });

  // LÓGICA DE CONVERSÃO BRL -> POL
  useEffect(() => {
    async function obterPreco() {
      if (!totalBRL || totalBRL <= 0) return;

      try {
        // Tenta buscar preço real
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=brl');
        const data = await res.json();
        const precoAtual = data['matic-network']?.brl;

        if (precoAtual) {
          const calculo = (totalBRL / precoAtual).toFixed(4);
          setValorPOL(calculo);
        } else {
          throw new Error("Preço não encontrado");
        }
      } catch (e) { 
        console.error("Erro ao converter, usando fallback de R$ 3.80");
        // Fallback: Se a API falhar, assume um preço médio para não travar o site
        const fallbackCalculo = (totalBRL / 3.80).toFixed(4);
        setValorPOL(fallbackCalculo);
      }
    }
    obterPreco();
  }, [totalBRL]);

  // Registro no Supabase após sucesso
  useEffect(() => {
    if (isSuccess && hash) {
      const registrar = async () => {
        await supabase.from('pedidos').insert([{
          email: dadosEntrega?.email,
          total_geral: totalBRL,
          itens: itens,
          metodo_pagamento: 'POL (Web3)',
          status: 'pago',
          tx_hash: hash,
          wallet_address: address
        }]);
        window.location.href = "/sucesso";
      };
      registrar();
    }
  }, [isSuccess]);

  const realizarPagamento = async () => {
    if (!isConnected) return alert("Conecte sua carteira no topo!");
    
    if (chainId !== polygon.id) {
      try {
        await switchChain({ chainId: polygon.id });
        return; 
      } catch (e) {
        return alert("Mude para a rede Polygon!");
      }
    }

    try {
      setCarregando(true);
      const tx = await sendTransactionAsync({
        to: process.env.NEXT_PUBLIC_MY_WALLET,
        value: parseEther(valorPOL),
      });
      setHash(tx);
    } catch (e) {
      setCarregando(false);
      // Se der erro de saldo insuficiente, o MetaMask avisará, mas tratamos aqui também
      console.error(e);
      alert("Erro na transação. Verifique se possui saldo em POL e gás para a taxa.");
    }
  };

  return (
    <button 
      onClick={realizarPagamento} 
      disabled={carregando || confirmando || !isConnected || valorPOL === '0.00'}
      className="bg-orange-600 text-white py-4 w-full font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all disabled:opacity-50"
    >
      {!isConnected 
        ? "Conecte no Topo" 
        : chainId !== polygon.id 
          ? "Mudar p/ Polygon" 
          : confirmando 
            ? "Confirmando..." 
            : `Pagar ${valorPOL} POL`
      }
    </button>
  );
}