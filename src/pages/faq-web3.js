import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function FAQWeb3() {
  const router = useRouter();

  const perguntas = [
    {
      pergunta: "O QUE É ESSE TAL DE NFT LIFESTYLE?",
      resposta: "Não é apenas uma imagem. É a sua CARTEIRINHA DE SÓCIO digital do Pão de Queijo da Irá. Quem tem o NFT na carteira prova que faz parte da nossa comunidade e ganha benefícios automáticos no site."
    },
    {
      pergunta: "POR QUE DEVO INSERIR MINHA CARTEIRA?",
      resposta: "Dois motivos reais: 1. DESCONTO DE 5% vitalício em novas compras do mesmo item. 2. ACESSO SECRETO: Junte 4 NFTs iguais, transforme em uma CAMISETA DOURADA e ganhe acesso antecipado à nossa nova plataforma."
    },
    {
      pergunta: "NÃO TENHO CARTEIRA. O QUE EU FAÇO?",
      resposta: "É como criar um e-mail. Baixe o app METAMASK ou PHANTOM no seu celular. Crie sua conta, anote sua 'frase secreta' num papel e copie o endereço que começa com '0x...'. É esse código que você cola no nosso checkout."
    },
    {
      pergunta: "QUAL REDE VOCÊS USAM?",
      resposta: "Usamos a rede POLYGON. Escolhemos ela por ser rápida e ter taxas quase zero, garantindo que o seu brinde chegue sem custos absurdos."
    },
    {
      pergunta: "POSSO VENDER MEU NFT?",
      resposta: "Sim! Ele é seu. Se você decidir vender no OpenSea, o novo dono herdará o desconto de 5%, e você recebe o valor da venda. Nós ficamos com 10% de royalties em cada revenda para manter o projeto crescendo."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-900 p-6 selection:bg-orange-100">
      <Head>
        <title>FAQ WEB3 | Suporte Lifestyle</title>
      </Head>

      <div className="max-w-3xl mx-auto py-12">
        
        {/* BOTÃO VOLTAR - SOFT STYLE */}
        <button 
          onClick={() => router.back()}
          className="mb-12 flex items-center gap-2 bg-white text-gray-500 px-6 py-3 rounded-full font-bold uppercase text-[10px] tracking-widest border border-gray-100 hover:bg-orange-50 hover:text-orange-600 transition-all shadow-sm"
        >
          <i className="bi bi-arrow-left"></i> Voltar para Loja
        </button>

        {/* TÍTULO SOFT & BOLD */}
        <div className="mb-20 text-center md:text-left px-4">
          <span className="text-orange-500 font-black uppercase text-[10px] tracking-[0.4em] mb-4 block">Central de Ajuda</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight tracking-tighter mb-4 text-gray-900">
            Dúvidas <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">Web3</span>
          </h1>
          <div className="h-1.5 w-24 bg-orange-500 rounded-full mx-auto md:mx-0"></div>
        </div>

        {/* LISTA DE PERGUNTAS - CARDS ARREDONDADOS */}
        <div className="space-y-6">
          {perguntas.map((item, index) => (
            <div key={index} className="group">
              <div className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm group-hover:shadow-xl group-hover:shadow-orange-100/50 group-hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-black text-xs">
                    {index + 1}
                  </span>
                  <h2 className="text-xl font-black uppercase leading-tight text-gray-800">
                    {item.pergunta}
                  </h2>
                </div>
                <p className="font-medium text-gray-500 leading-relaxed text-sm md:text-base pl-12">
                  {item.resposta}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA FINAL - SOFT PREMIUM */}
        <div className="mt-24 bg-gradient-to-br from-gray-900 to-black text-white p-12 rounded-[50px] shadow-2xl text-center relative overflow-hidden">
          {/* Círculos decorativos de fundo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          
          <h3 className="text-3xl font-black uppercase italic mb-4 relative z-10">Novo na Web3?</h3>
          <p className="text-xs font-medium uppercase mb-8 text-gray-400 tracking-widest relative z-10">
            Crie sua carteira em minutos e comece a colecionar.
          </p>
          <a 
            href="https://metamask.io/" 
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-block bg-orange-600 text-white px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black hover:scale-105 transition-all shadow-lg shadow-orange-600/20"
          >
            Baixar MetaMask
          </a>
        </div>

        <footer className="mt-20 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">
            Pão de Queijo da Irá // Experiência Digital 2024
          </p>
        </footer>
      </div>
    </div>
  );
}
