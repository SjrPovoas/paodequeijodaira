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
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-black p-6 selection:bg-orange-200">
      <Head>
        <title>FAQ WEB3 | Loja Lifestyle</title>
      </Head>

      <div className="max-w-3xl mx-auto py-12">
        
        {/* BOTÃO VOLTAR */}
        <button 
          onClick={() => router.back()}
          className="mb-8 bg-black text-white px-4 py-2 font-black uppercase text-[10px] tracking-widest border-2 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]"
        >
          ← Voltar para Loja
        </button>

        {/* TÍTULO BRUTALISTA */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-8xl font-black uppercase italic leading-[0.8] tracking-tighter mb-4">
            WEB3 <br />
            <span className="text-orange-600">DÚVIDAS</span>
          </h1>
          <div className="h-4 w-48 bg-black"></div>
        </div>

        {/* LISTA DE PERGUNTAS */}
        <div className="space-y-12">
          {perguntas.map((item, index) => (
            <div key={index} className="group">
              <h2 className="text-2xl font-black uppercase italic leading-none mb-4 group-hover:text-orange-600 transition-colors">
                <span className="text-orange-600 mr-2">0{index + 1}.</span> {item.pergunta}
              </h2>
              <div className="bg-white border-[4px] border-black p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[10px_10px_0px_0px_rgba(234,88,12,1)] transition-all">
                <p className="font-bold text-gray-700 leading-relaxed uppercase text-sm italic">
                  {item.resposta}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA FINAL */}
        <div className="mt-20 bg-black text-white p-10 border-[6px] border-orange-600 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] text-center">
          <h3 className="text-3xl font-black uppercase italic mb-6">Pronto para o próximo nível?</h3>
          <p className="text-[10px] tracking-[0.3em] font-bold uppercase mb-8 text-gray-400">
            Abra sua carteira e comece sua coleção lifestyle agora.
          </p>
          <a 
            href="https://metamask.io/" 
            target="_blank"
            className="inline-block bg-orange-600 text-white px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Baixar MetaMask
          </a>
        </div>

        <footer className="mt-20 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-400">
            Pão de Queijo da Irá // Protocolo Web3 v1.0
          </p>
        </footer>
      </div>
    </div>
  );
}
