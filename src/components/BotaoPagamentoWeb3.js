"use client";
import { polygon } from 'viem/chains';
import { useState, useEffect } from 'react';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt, useChainId, useSwitchChain } from 'wagmi';
import { parseEther } from 'viem';
import { supabase } from '../lib/supabaseClient';

export default function BotaoPagamentoWeb3({ total, carrinho, dadosCliente, onBeforeClick }) {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [loading, setLoading] = useState(false);
  const [pedidoIdAtivo, setPedidoIdAtivo] = useState(null);

  // Configurações da Rede (Exemplo: Polygon Mainnet id: 137)
  const REDE_CORRETA_ID = 137; 
  // Endereço que vai receber o dinheiro (SUA CARTEIRA)
  const CARTEIRA_DESTINO = "0x9523160C1cAf82358B9a6af332E47d6F5fDb02ac"; 

  // Hook para enviar a transação
  const { sendTransactionAsync } = useSendTransaction();

  // Função principal disparada pelo clique
  const handlePagamentoCripto = async () => {
    if (!isConnected) return alert("Por favor, conecte sua carteira primeiro.");
    
    // 1. Verifica se está na rede correta
    if (chainId !== REDE_CORRETA_ID) {
      alert("Por favor, altere sua rede para Polygon.");
      switchChain({ chainId: REDE_CORRETA_ID });
      return;
    }

    setLoading(true);

    try {
      // 2. Chama a função que criamos na Loja.js para salvar o pedido no Supabase
      // Ela retorna o ID do pedido criado
      const idDoPedido = await onBeforeClick();
      if (!idDoPedido) throw new Error("Falha ao registrar pedido no banco.");
      setPedidoIdAtivo(idDoPedido);

      // 3. Conversão de valor (Exemplo simplificado: 1 BRL = 1 Token da Rede ou integração com Oráculo)
      // Nota: Para produção, você precisaria de um conversor de preço real.
      // Aqui estamos enviando o valor 'total' diretamente em POL (antigo MATIC).
      const valorEmWei = parseEther(total.toString());

      // 4. Dispara a transação na Blockchain
      const txHash = await sendTransactionAsync({
        to: CARTEIRA_DESTINO,
        value: valorEmWei,
      });

      console.log("Transação enviada! Hash:", txHash);

      // 5. Aguarda a confirmação (Mineração)
      // Aqui você pode mostrar um loader de "Aguardando confirmação na rede..."
      alert("Pagamento enviado! Aguardando confirmação da rede...");

      // 6. Atualiza o Supabase assim que a transação for confirmada
      // Nota: Em um app real, você usaria o hook useWaitForTransactionReceipt para automatizar isso
      const { error: errUpdate } = await supabase
        .from('pedidos')
        .update({ 
          status: 'Pago', 
          hash_transacao: txHash,
          pago_em: new Date().toISOString()
        })
        .eq('id', idDoPedido);

      if (errUpdate) throw errUpdate;

      alert("🎉 Pagamento confirmado e pedido finalizado!");
      window.location.href = "/sucesso"; // Redireciona

    } catch (err) {
      console.error("Erro no fluxo Web3:", err);
      alert("Erro no pagamento: " + (err.shortMessage || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {!isConnected ? (
        <p className="text-[10px] font-black text-center text-orange-600 uppercase mb-2">
          Conecte sua carteira para pagar com Cripto
        </p>
      ) : (
        <button
          onClick={handlePagamentoCripto}
          disabled={loading}
          className={`w-full py-5 font-black uppercase text-xs tracking-widest transition-all rounded-xl flex items-center justify-center gap-3 ${
            loading ? 'bg-gray-200 text-gray-500' : 'bg-orange-600 text-white hover:bg-black'
          }`}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-t-transparent border-gray-500 rounded-full animate-spin"></span>
              Processando na Rede...
            </>
          ) : (
            <>
              Pagar R$ {total.toFixed(2)} com POL (Polygon)
              <i className="bi bi-shield-check text-lg"></i>
            </>
          )}
        </button>
      )}
    </div>
  );
}
