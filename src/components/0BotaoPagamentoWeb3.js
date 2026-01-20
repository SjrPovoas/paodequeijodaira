import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSendTransaction, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; // Importe seu cliente supabase

export default function BotaoPagamentoWeb3({ totalBRL, itens, dadosEntrega }) {
  const { isConnected, address } = useAccount();
  const [hash, setHash] = useState(null);
  const [valorPOL, setValorPOL] = useState('0');
  const [carregando, setCarregando] = useState(false);

  const { sendTransactionAsync } = useSendTransaction();

  // 1. Monitoriza o status da transação na Blockchain
  const { isLoading: confirmando, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // 2. Cálculo da cotação (mantido)
  useEffect(() => {
    async function obterPreco() {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=brl');
        const data = await res.json();
        setValorPOL((totalBRL / data['matic-network'].brl).toFixed(6));
      } catch (e) { console.error("Erro cotação"); }
    }
    if (totalBRL > 0) obterPreco();
  }, [totalBRL]);

  // 3. Função para salvar no Supabase após o pagamento
  const salvarPedidoWeb3 = async (txHash) => {
    try {
      const { error } = await supabase.from('pedidos').insert([{
        email: dadosEntrega.email,
        cpf: dadosEntrega.cpf,
        cep: dadosEntrega.cep,
        endereco: dadosEntrega.endereco,
        total_geral: totalBRL,
        itens: itens,
        metodo_pagamento: 'POL (Polygon)',
        status: 'pago', // Já entra como pago pois a transação foi confirmada
        tx_hash: txHash, // Guardamos o comprovativo da blockchain
        wallet_address: address
      }]);

      if (error) throw error;
      alert("Pagamento confirmado e pedido registado!");
      window.location.href = "/sucesso";
    } catch (err) {
      console.error("Erro ao salvar pedido:", err);
      alert("Pagamento feito, mas erro ao registar. Contacte o suporte com o seu Hash: " + txHash);
    }
  };

  // 4. Executa o salvamento assim que a blockchain confirmar
  useEffect(() => {
    if (isSuccess && hash) {
      salvarPedidoWeb3(hash);
    }
  }, [isSuccess]);

  const realizarPagamento = async () => {
    if (!dadosEntrega.email || !dadosEntrega.endereco) return alert("Preencha os dados de entrega no carrinho!");
    
    try {
      setCarregando(true);
      const tx = await sendTransactionAsync({
        to: process.env.NEXT_PUBLIC_MY_WALLET,
        value: parseEther(valorPOL),
      });
      
      setHash(tx); // Define o hash para o useWaitForTransactionReceipt começar a vigiar
    } catch (error) {
      console.error("Erro na transação:", error);
      alert("Transação cancelada.");
      setCarregando(false);
    }
  };

  return (
    <div className="w-full">
      {!isConnected ? (
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <button onClick={openConnectModal} className="bg-[#2D3134] text-white py-4 font-black uppercase text-[12px] w-full flex flex-col items-center">
              <i className="bi bi-wallet2 text-lg"></i>
              <span>Conectar Carteira (POL)</span>
            </button>
          )}
        </ConnectButton.Custom>
      ) : (
        <button 
          onClick={realizarPagamento} 
          disabled={carregando || confirmando}
          className="bg-purple-600 text-white py-4 font-black uppercase text-[12px] w-full flex flex-col items-center disabled:opacity-50"
        >
          <i className="bi bi-currency-bitcoin text-lg"></i>
          <span>
            {confirmando ? "Confirmando na Blockchain..." : 
             carregando ? "Aguardando Assinatura..." : `Pagar ${valorPOL} POL`}
          </span>
        </button>
      )}
    </div>
  );
}
