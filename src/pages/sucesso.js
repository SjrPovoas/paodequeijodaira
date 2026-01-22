"use client";
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Sucesso() {
  const router = useRouter();
  const { tx, payment_id } = router.query;

  useEffect(() => {
    // ESSENCIAL: Limpa o carrinho para o cliente não comprar os mesmos itens por engano
    localStorage.removeItem('carrinho_ira');
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center p-6 font-sans">
      <Head>
        <title>Pedido Confirmado | Loja Lifestyle do Pão de Queijo da Irá</title>
      </Head>

      <div className="max-w-md w-full bg-white border border-orange-100 p-10 text-center shadow-sm">
        {/* ÍCONE DE CELEBRAÇÃO */}
        <div className="text-6xl mb-6">🎉</div>

        <h1 className="text-4xl font-black uppercase italic tracking-tighter text-[#3D2B1F] mb-4">
          {tx ? "Transação Enviada!" : "Pedido Recebido!"}
        </h1>

        {tx ? (
          /* MENSAGEM WEB3 (POL) */
          <div className="mb-8">
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Sua transação na rede Polygon foi processada com sucesso. A confirmação final ocorre em instantes.
            </p>
            <div className="bg-purple-50 border border-purple-100 p-4 rounded-sm mb-6 text-left">
              <h3 className="text-[9px] font-black uppercase tracking-widest text-purple-400 mb-2">Comprovante Blockchain</h3>
              <a
                href={`https://polygonscan.com/tx/${tx}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono break-all text-purple-700 underline hover:text-purple-900"
              >
                {tx} ↗
              </a>
            </div>
          </div>
        ) : (
          /* MENSAGEM MERCADO PAGO */
          <div className="mb-8 text-gray-600 text-sm leading-relaxed">
            <p className="mb-4">Obrigado por fortalecer nossa comunidade.</p>
            <p>Seu pagamento via <strong>{payment_id ? 'Mercado Pago' : 'Cartão/Pix'}</strong> foi confirmado e já estamos preparando sua entrega.</p>
          </div>
        )}

        {/* BOTÕES DE AÇÃO */}
        <div className="space-y-4">
          <Link href="/loja" className="block w-full py-4 bg-[#3D2B1F] text-white font-black uppercase text-[10px] tracking-[0.2em] hover:bg-orange-600 transition-all">
            Voltar para a Loja
          </Link>
          
          <Link href="/" className="block text-[9px] text-gray-400 font-black uppercase tracking-widest hover:text-orange-600 transition-colors">
            Voltar ao Início
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-orange-50">
          <p className="text-[9px] text-gray-300 uppercase tracking-widest leading-loose">
            Dúvidas sobre o rastreio? <br />
            Chame no WhatsApp do Pão de Queijo da Irá.
          </p>
        </div>
      </div>
    </div>
  );
}