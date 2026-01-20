import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSendTransaction, useAccount, useWaitForTransactionReceipt, useChainId, useSwitchChain } from 'wagmi';
import { parseEther } from 'viem';
import { polygon } from 'wagmi/chains';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function BotaoPagamentoWeb3({ totalBRL, itens, dadosEntrega }) {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  
  const [hash, setHash] = useState(null);
  const [valorPOL, setValorPOL] = useState('0');
  const [cotacao, setCotacao] = useState(0);
  const [carregando, setCarregando] = useState(false);

  const { sendTransactionAsync } = useSendTransaction();

  // 1. Monitora a confirmação da transação na Blockchain
  const { isLoading: confirmando, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // 2. Busca cotação em tempo real (POL/BRL) via CoinGecko
  useEffect(() => {
    async function obterPreco() {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=brl');
        const data = await res.json();
        const preco = data['matic-network'].brl;
        setCotacao(preco);
        
        if (totalBRL > 0) {
          const calculo = (totalBRL / preco).toFixed(6);
          setValorPOL(calculo);
        }
      } catch (e) { 
        console.error("Erro ao buscar cotação");
        setCotacao(3.85); // Valor de segurança caso a API falhe
      }
    }
    obterPreco();
  }, [totalBRL]);

  // 3. Salva no Supabase apenas após a confirmação do sucesso na rede
  const salvarPedidoWeb3 = async (txHash) => {
    try {
      const { error } = await supabase.from('pedidos').insert([{
        email: dadosEntrega?.email,
        cpf: dadosEntrega?.cpf,
        endereco: dadosEntrega?.endereco,
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
      console.error("Erro no registro:", err);
      alert("Pagamento processado, mas erro ao salvar pedido. Comprovante (Hash): " + txHash);
    }
  };

  useEffect(() => {
    if (isSuccess && hash) {
      salvarPedidoWeb3(hash);
    }
  }, [isSuccess]);

  // 4. Função Principal de Pagamento
  const realizarPagamento = async () => {
    // Validação de dados básicos
    if (!dadosEntrega?.email || !dadosEntrega?.endereco) {
      return alert("Por favor, preencha os dados de entrega no formulário.");
    }

    // TRAVA DE REDE: Se estiver conectado mas na rede errada, tenta trocar antes de pagar
    if (chainId !== polygon.id) {
      try {
        await switchChain({ chainId: polygon.id });
        return; // Para aqui para o usuário clicar novamente após a troca ser aprovada
      } catch (error) {
        return alert("Você precisa mudar para a rede Polygon para realizar o pagamento.");
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
      console.error("Erro na transação:", error);
      alert("Transação cancelada na carteira.");
      setCarregando(false);
    }
  };

  // Verifica se a carteira está na rede errada
  const redeIncorreta = isConnected && chainId !== polygon.id;

  return (
    <div className="w-full flex flex-col gap-2">
      {!isConnected ? (
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <button 
              onClick={openConnectModal} 
              className="bg-[#2D3134] text-white py-4 font-black uppercase text-[12px] w-full flex flex-col items-center hover:bg-black transition-all shadow-lg rounded-sm"
            >
              <i className="bi bi-wallet2 text-lg mb-1"></i>
              <span>Conectar Carteira (POL)</span>
            </button>
          )}
        </ConnectButton.Custom>
      ) : redeIncorreta ? (
        <button 
          onClick={() => switchChain({ chainId: polygon.id })}
          className="bg-red-600 text-white py-4 font-black uppercase text-[12px] w-full flex flex-col items-center animate-pulse shadow-lg rounded-sm"
        >
          <i className="bi bi-arrow-left-right text-lg mb-1"></i>
          <span>Mudar para Rede Polygon</span>
          <small className="text-[9px] opacity-80 text-white">Rede atual incorreta</small>
        </button>
      ) : (
        <button 
          onClick={realizarPagamento} 
          disabled={carregando || confirmando || valorPOL === '0'}
          className="bg-purple-600 text-white py-4 font-black uppercase text-[12px] w-full flex flex-col items-center hover:bg-purple-700 transition-all shadow-lg rounded-sm disabled:opacity-50"
        >
          <i className="bi bi-currency-bitcoin text-lg mb-1"></i>
          <span>
            {confirmando ? "Confirmando na Rede..." : 
             carregando ? "Aguardando Assinatura..." : `Pagar ${valorPOL} POL`}
          </span>
          <div className="flex gap-2 text-[8px] opacity-80">
            <span>Total: R$ {totalBRL.toFixed(2)}</span>
            <span>•</span>
            <span>1 POL = R$ {cotacao.toFixed(2)}</span>
          </div>
        </button>
      )}
    </div>
  );
    }
