"use client";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSendTransaction, useAccount, useWaitForTransactionReceipt, useChainId, useSwitchChain } from 'wagmi';
import { parseEther } from 'viem';
import { polygon } from 'wagmi/chains';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; // Caminho relativo corrigido

export default function BotaoPagamentoWeb3({ totalBRL, itens, dadosEntrega }) {
  // --- SEGURANÇA CONTRA CLIENT-SIDE EXCEPTION (HYDRATION FIX) ---
  const [montado, setMontado] = useState(false);
  
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  
  const [hash, setHash] = useState(null);
  const [valorPOL, setValorPOL] = useState('0');
  const [cotacao, setCotacao] = useState(0);
  const [carregando, setCarregando] = useState(false);

  const { sendTransactionAsync } = useSendTransaction();

  // 1. Monitora confirmação
  const { isLoading: confirmando, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Só ativa o componente após o carregamento total no navegador
  useEffect(() => {
    setMontado(true);
  }, []);

  // 2. Busca cotação real
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

  // 3. Salva no Supabase
  const salvarPedidoWeb3 = async (txHash) => {
    try {
      const { error } = await supabase.from('pedidos').insert([{
        email: dadosEntrega?.email,
        cpf: dadosEntrega?.cpf,
        total_geral: totalBRL,
        itens: itens,
        metodo_pagamento: 'POL (Polygon)',
        status: 'pago',
        tx_hash: txHash,
        wallet_address: address
      }]);
      if (error) throw error;
      window.location.href = "/sucesso";
    } catch (err) {
      alert("Erro ao salvar pedido. Hash: " + txHash);
    }
  };

  useEffect(() => {
    if (isSuccess && hash) salvarPedidoWeb3(hash);
  }, [isSuccess]);

  // 4. Lógica de Pagamento
  const realizarPagamento = async () => {
    if (!dadosEntrega?.email) return alert("Preencha os dados de entrega!");

    if (chainId !== polygon.id) {
      try {
        await switchChain({ chainId: polygon.id });
        return;
      } catch (error) {
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
    } catch (error) {
      setCarregando(false);
      alert("Transação cancelada.");
    }
  };

  // --- TRAVA DE RENDERIZAÇÃO ---
  if (!montado) return null;

  const redeIncorreta = isConnected && chainId !== polygon.id;

  return (
    <div className="w-full flex flex-col gap-2">
      {!isConnected ? (
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <button onClick={openConnectModal} type="button" className="bg-[#2D3134] text-white py-4 font-black uppercase text-[12px] w-full flex flex-col items-center shadow-lg">
              <i className="bi bi-wallet2 text-lg"></i>
              <span>Conectar Carteira (POL)</span>
            </button>
          )}
        </ConnectButton.Custom>
      ) : redeIncorreta ? (
        <button onClick={() => switchChain({ chainId: polygon.id })} className="bg-red-600 text-white py-4 font-black uppercase text-[12px] w-full flex flex-col items-center animate-pulse shadow-lg">
          <i className="bi bi-arrow-left-right text-lg"></i>
          <span>Mudar para Rede Polygon</span>
        </button>
      ) : (
        <button 
          onClick={realizarPagamento} 
          disabled={carregando || confirmando || valorPOL === '0'}
          className="bg-purple-600 text-white py-4 font-black uppercase text-[12px] w-full flex flex-col items-center shadow-lg disabled:opacity-50"
        >
          <i className="bi bi-currency-bitcoin text-lg"></i>
          <span>
            {confirmando ? "Confirmando..." : carregando ? "Assine na Carteira..." : `Pagar ${valorPOL} POL`}
          </span>
          <small className="text-[8px] opacity-70">R$ {cotacao.toFixed(2)} / POL</small>
        </button>
      )}
    </div>
  );
}
