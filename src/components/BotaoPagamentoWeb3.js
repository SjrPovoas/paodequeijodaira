// src/components/BotaoPagamentoWeb3.js

"use client";

import { useState, useMemo, useEffect } from 'react';
import { useAccount, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';

export default function BotaoPagamentoWeb3({ total, disabled, criarPedidoNoSupabase, onSuccess }) {
  const [loadingLocal, setLoadingLocal] = useState(false);
  // Começa com um preço estimado de segurança (R$ 3.50) caso a API demore a responder
  const [precoTokenEmBrl, setPrecoTokenEmBrl] = useState(3.50); 
  const [buscandoPreco, setBuscandoPreco] = useState(true);
  
  const { address: carteiraCliente, isConnected } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();

  // --- BUSCA DO PREÇO DA CRIPTO EM TEMPO REAL ---
  useEffect(() => {
    async function obterPrecoAtual() {
      try {
        setBuscandoPreco(true);
        // Consulta a API global da CoinGecko buscando o preço do token POL (antigo MATIC) em Reais (BRL)
        const resposta = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=polygon-ecosystem-token&vs_currencies=brl"
        );
        const dados = await resposta.json();
        
        if (dados && dados["polygon-ecosystem-token"] && dados["polygon-ecosystem-token"].brl) {
          const precoRealTime = dados["polygon-ecosystem-token"].brl;
          console.log(`🌐 Preço da POL atualizado em tempo real: R$ ${precoRealTime}`);
          setPrecoTokenEmBrl(precoRealTime);
        }
      } catch (erro) {
        console.error("Erro ao buscar cotação em tempo real, usando valor padrão:", erro);
      } finally {
        setBuscandoPreco(false);
      }
    }

    obterPrecoAtual();
    
    // Opcional: Atualiza o preço a cada 30 segundos enquanto o usuário estiver com a página aberta
    const intervalo = setInterval(obterPrecoAtual, 30000);
    return () => clearInterval(intervalo);
  }, []);

  // --- CÁLCULO DE CONVERSÃO MATEMÁTICA ---
  const valorConvertidoCripto = useMemo(() => {
    if (!total || total <= 0) return "0.0000";
    // Divide o valor em Reais pelo preço atual da moeda na blockchain
    return (total / precoTokenEmBrl).toFixed(4);
  }, [total, precoTokenEmBrl]);

  const realizarPagamentoCripto = async () => {
    if (!isConnected || !carteiraCliente) {
      alert("Por favor, conecte sua carteira digital usando o botão de conexão!");
      return;
    }

    setLoadingLocal(true);

    try {
      console.log("Registrando intenção de pedido no Supabase...");
      const pedidoCriado = await criarPedidoNoSupabase(null, null);
      
      console.log("Resultado retornado do banco pelo componente pai:", pedidoCriado);
      
      if (!pedidoCriado || !pedidoCriado.id) {
        throw new Error("Não foi possível gerar o número do pedido no banco de dados. O retorno veio vazio.");
      }

      const enderecoSuaCarteira = "0x9523160C1cAf82358B9a6af332E47d6F5fDb02ac"; 
      console.log(`Enviando ${valorConvertidoCripto} POL para ${enderecoSuaCarteira}...`);
      
      const txHash = await sendTransactionAsync({
        to: enderecoSuaCarteira,
        value: parseEther(valorConvertidoCripto),
      });

      console.log("Transação confirmada na Blockchain! Hash:", txHash);

      const { supabase } = await import('../lib/supabaseClient');
      const { error: updateError } = await supabase
        .from('pedidos')
        .update({
          status_pagamento: 'pago',
          hash_transacao_crypto: txHash,
          carteira_blockchain_cliente: carteiraCliente,
          pago_em: new Date().toISOString()
        })
        .eq('id', pedidoCriado.id);

      if (updateError) {
        console.error("Erro crítico ao atualizar status para pago no Supabase:", updateError);
      }

      onSuccess(txHash);

    } catch (err) {
      console.error("Erro no fluxo de pagamento Web3:", err);
      
      if (err.message?.includes("User rejected the request") || err.shortMessage?.includes("User rejected the request")) {
        alert("A transação foi cancelada por você na sua carteira digital.");
      } else {
        alert("Falha no pagamento cripto: " + (err.shortMessage || err.message || "Erro desconhecido"));
      }
    } finally {
      setLoadingLocal(false);
    }
  };

  return (
    <button
      type="button"
      onClick={realizarPagamentoCripto}
      disabled={disabled || loadingLocal || buscandoPreco}
      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-wider disabled:opacity-50 transition-colors"
    >
      {loadingLocal 
        ? "Aguardando Confirmação..." 
        : buscandoPreco 
          ? "Sincronizando cotação real..." 
          : `Pagar ${valorConvertidoCripto} POL (~ R$ ${total.toFixed(2)})`
      }
    </button>
  );
}