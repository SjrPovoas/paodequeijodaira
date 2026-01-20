"use client";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSendTransaction, useAccount, useWaitForTransactionReceipt, useChainId, useSwitchChain } from 'wagmi';
import { parseEther } from 'viem';
import { polygon } from 'viem/chains'; // Importação corrigida para o build
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function BotaoPagamentoWeb3({ totalBRL, itens, dadosEntrega }) {
  const [montado, setMontado] = useState(false);
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  
  const [hash, setHash] = useState(null);
  const [valorPOL, setValorPOL] = useState('0');
  const [cotacao, setCotacao] = useState(0);
  const [carregando, setCarregando] = useState(false);

  const { sendTransactionAsync } = useSendTransaction();
  const { isLoading: confirmando, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    setMontado(true);
  }, []);

  useEffect(() => {
    async function obterPreco() {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=brl');
        const data = await res.json();
        const preco = data['matic-network'].brl;
        setCotacao(preco);
        if (totalBRL > 0) setValorPOL((totalBRL / preco).toFixed(6));
      } catch (e) { 
        setCotacao(3.80);
      }
    }
    if (montado) obterPreco();
  }, [totalBRL, montado]);

  useEffect(() => {
    if (isSuccess && hash) {
      const salvar = async () => {
        await supabase.from('pedidos').insert([{
          email: dadosEntrega?.email,
          total_geral: totalBRL,
          itens: itens,
          metodo_pagamento: 'POL',
          status: 'pago',
          tx_hash: hash,
          wallet_address: address
        }]);
        window.location.href = "/sucesso";
      };
      salvar();
    }
  }, [isSuccess]);

  const realizarPagamento = async () => {
    if (!dadosEntrega?.email) return alert("Preencha os dados de entrega!");
    if (chainId !== polygon.id) {
      try {
        await switchChain({ chainId: polygon.id });
        return;
      } catch (e) { return alert("Mude para a rede Polygon!"); }
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
      alert("Transação cancelada.");
    }
  };

  if (!montado) return null;

  return (
    <div className="w-full">
      {!isConnected ? (
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <button onClick={openConnectModal} type="button" className="bg-black text-white p-4 w-full font-bold rounded-sm uppercase text-xs shadow-lg">
              Conectar Carteira (Polygon)
            </button>
          )}
        </ConnectButton.Custom>
      ) : chainId !== polygon.id ? (
        <button onClick={() => switchChain({ chainId: polygon.id })} className="bg-red-600 text-white p-4 w-full font-bold rounded-sm animate-pulse">
          Mudar para Rede Polygon
        </button>
      ) : (
        <button onClick={realizarPagamento} disabled={carregando || confirmando} className="bg-orange-600 text-white p-4 w-full font-bold rounded-sm shadow-lg disabled:opacity-50">
          {confirmando ? "Processando..." : carregando ? "Assine na Carteira..." : `Pagar ${valorPOL} POL`}
        </button>
      )}
    </div>
  );
    }
