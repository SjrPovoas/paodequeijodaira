"use client";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

export default function Erro() {
  const router = useRouter();
  const { mensagem } = router.query; // Captura um erro específico se houver
  const WHATSAPP_NUMBER = "5561982777196";

  return (
    <div className="min-h-screen bg-[#FFF8F8] flex items-center justify-center p-6 font-sans">
      <Head>
        <title>Ops! Algo deu errado | Loja Lifestyle</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
      </Head>

      <div className="max-w-md w-full bg-white border border-red-50 p-10 md:p-14 text-center rounded-[50px] shadow-xl shadow-red-100/20">

        {/* ÍCONE DE ERRO MAIS REFINADO */}
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <i className="bi bi-exclamation-triangle-fill text-4xl text-red-500"></i>
        </div>

        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-gray-900 mb-4 leading-none">
          Houve um <br /> Imprevisto
        </h1>

        <p className="text-gray-500 text-sm leading-relaxed font-medium mb-8">
          {mensagem || "Não conseguimos processar seu pedido. Verifique os dados do cartão, conexão com a carteira ou se todos os campos (como CPF e endereço) estão corretos."}
        </p>

        {/* BOTÕES DE AÇÃO */}
        <div className="space-y-3">
          <Link
            href="/checkout"
            className="block w-full py-5 bg-red-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-black transition-all shadow-lg shadow-red-200"
          >
            Tentar Novamente
          </Link>

          <Link
            href="/loja"
            className="block w-full py-4 text-[9px] text-gray-400 font-black uppercase tracking-widest hover:text-red-600 transition-colors"
          >
            Cancelar e Voltar à Loja
          </Link>
        </div>

        {/* SUPORTE DIRETO */}
        <div className="mt-12 pt-8 border-t border-gray-50">
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-300 mb-4">
            Precisa de ajuda imediata?
          </p>
          <Link
            href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="inline-flex items-center gap-2 text-red-400 hover:text-red-600 transition-colors">
            <i className="bi bi-whatsapp text-lg"></i>
            <span className="text-[10px] font-black uppercase tracking-tighter">Suporte via WhatsApp</span>
          </Link>
        </div>
      </div>
    </div>
  );
}