"use client";
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Sucesso() {
  const router = useRouter();
  const { tx, payment_id } = router.query;

  useEffect(() => {
    // ESSENCIAL: Limpa o carrinho local para evitar duplicidade
    localStorage.removeItem('carrinho_ira');
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6 font-sans selection:bg-orange-100">
      <Head>
        <title>Pedido Confirmado | Loja Lifestyle</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
      </Head>

      <div className="max-w-md w-full bg-white border border-gray-100 p-10 md:p-14 text-center rounded-[50px] shadow-xl shadow-orange-100/20 animate-in fade-in zoom-in duration-500">
        
        {/* ÍCONE DE SUCESSO SOFT */}
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <i className="bi bi-check-circle-fill text-5xl text-orange-500"></i>
        </div>

        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-gray-900 mb-4 leading-none">
          {tx ? "Transação \n Enviada!" : "Pedido \n Confirmado!"}
        </h1>

        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">
            Seu Lifestyle está a caminho.
        </p>

        {tx ? (
          /* MENSAGEM WEB3 (POLYGON) */
          <div className="mb-8">
            <p className="text-gray-500 text-sm mb-6 leading-relaxed font-medium">
              Sua transação na rede <span className="text-purple-600 font-bold">Polygon</span> foi processada. O recibo blockchain está disponível abaixo:
            </p>
            <div className="bg-purple-50 rounded-3xl p-5 border border-purple-100 text-left overflow-hidden">
              <h3 className="text-[9px] font-black uppercase tracking-widest text-purple-400 mb-2">Transaction Hash</h3>
              <a
                href={`https://polygonscan.com/tx/${tx}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono break-all text-purple-700 hover:text-purple-900 flex items-center gap-2"
              >
                {tx.slice(0, 30)}... <i className="bi bi-box-arrow-up-right"></i>
              </a>
            </div>
          </div>
        ) : (
          /* MENSAGEM MERCADO PAGO / PIX */
          <div className="mb-8">
            <p className="text-gray-500 text-sm leading-relaxed font-medium px-4">
              Obrigado por fortalecer nossa comunidade. Seu pagamento via 
              <span className="text-orange-600 font-bold"> {payment_id ? 'Mercado Pago' : 'Sistema'}</span> foi validado com sucesso.
            </p>
          </div>
        )}

        {/* BOTÕES DE AÇÃO SOFT */}
        <div className="space-y-3">
          <Link href="/loja" className="block w-full py-5 bg-black text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-orange-600 hover:scale-[1.02] transition-all shadow-lg shadow-gray-200">
            Voltar para a Loja
          </Link>
          
          <Link href="/faq-web3" className="block w-full py-4 text-[9px] text-gray-400 font-black uppercase tracking-widest hover:text-orange-600 transition-colors">
            Entender meus benefícios Web3
          </Link>
        </div>

        {/* SUPORTE */}
        <div className="mt-12 pt-8 border-t border-gray-50">
          <div className="flex items-center justify-center gap-2 text-gray-300">
             <i className="bi bi-whatsapp text-lg"></i>
             <p className="text-[9px] font-bold uppercase tracking-widest leading-loose">
               Dúvidas? Suporte via WhatsApp
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
