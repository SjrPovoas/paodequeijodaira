import React, { useState } from 'react';
import { CheckCircle, Star, ShoppingCart, ShieldCheck, Clock, Gift, ChevronDown, ChevronUp, Lock } from 'lucide-react';

export default function CursoPaoDeQueijoAltaConversao() {
  // Estado para controlar as perguntas do FAQ
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white text-gray-900 font-sans antialiased">
      
      {/* SEÇÃO 1: HERO SECTON (Foco em texto persuasivo + Mídia) */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-12 md:py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Inscrições Abertas • Vagas Limitadas
            </span>
            <h1 className="text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight text-gray-900">
              Aprenda o Pão de Queijo Perfeito: Da sua cozinha ao <span className="text-amber-600">faturamento real</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Descubra o método passo a passo para dominar a receita artesanal da Ira, técnicas de congelamento sem perder o sabor e como criar um negócio lucrativo em casa.
            </p>
            <a href="#preco" className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-extrabold py-4 px-8 rounded-xl text-xl shadow-xl transform transition hover:-translate-y-1 w-full sm:w-auto">
              <ShoppingCart className="mr-2 h-6 w-6" /> QUERO COMEÇAR AGORA
            </a>
            <p className="mt-3 text-xs text-gray-500 flex items-center justify-start gap-1">
              <Clock className="w-4 h-4 text-amber-600" /> Acesso imediato e 100% seguro.
            </p>
          </div>
          
          {/* Espaço para Vídeo de Vendas (VSL) ou Imagem de Alta Qualidade */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-200 aspect-video flex items-center justify-center border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1629115917923-92f74e929f0f?q=80&w=600" 
              alt="Pão de queijo quentinho saindo do forno" 
              className="object-cover w-full h-full"
            />
            {/* Overlay simulando botão de play caso use vídeo */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center hover:bg-black/10 transition cursor-pointer">
              <div className="bg-white/90 p-4 rounded-full shadow-lg">
                <svg className="w-8 h-8 text-amber-600 fill-current ml-1" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: PROVA SOCIAL IMEDIATA (Gera autoridade logo cedo) */}
      <section className="py-12 bg-gray-50 border-y border-gray-100 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-around gap-6 text-center">
          <div>
            <div className="flex justify-center text-amber-500 mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-5 h-5" />)}
            </div>
            <p className="font-bold text-xl text-gray-800">+1.200 Alunos</p>
            <p className="text-sm text-gray-500">Formados e faturando</p>
          </div>
          <div className="h-12 w-px bg-gray-200 hidden md:block"></div>
          <div>
            <p className="font-bold text-xl text-gray-800">4.9 / 5.0</p>
            <p className="text-sm text-gray-500">Avaliação média do curso</p>
          </div>
          <div className="h-12 w-px bg-gray-200 hidden md:block"></div>
          <div>
            <p className="font-bold text-xl text-gray-800">100% Online</p>
            <p className="text-sm text-gray-500">Assista de onde e quando quiser</p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: EMPILHAMENTO DE VALOR (Bônus que aceleram a compra) */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-bold uppercase text-sm tracking-wider">Presentes Exclusivos</span>
          <h2 className="text-3xl font-extrabold mt-2">Garante sua vaga hoje e leve estes bônus:</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border border-amber-200 rounded-2xl bg-amber-50/40 flex gap-4">
            <div className="bg-amber-500 text-white p-3 rounded-xl h-fit shadow-md">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">GRÁTIS</span>
              <h3 className="font-bold text-lg mt-1">Guia de Embalagem e Congelamento Comercial</h3>
              <p className="text-sm text-gray-600 mt-2">Aprenda a ensacar e congelar mantendo o pão de queijo perfeito por até 90 dias sem perder o sabor.</p>
              <p className="text-xs text-gray-400 line-through mt-2">Valor normal: R$ 47,00</p>
            </div>
          </div>
          
          <div className="p-6 border border-amber-200 rounded-2xl bg-amber-50/40 flex gap-4">
            <div className="bg-amber-500 text-white p-3 rounded-xl h-fit shadow-md">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">GRÁTIS</span>
              <h3 className="font-bold text-lg mt-1">Planilha Prática de Precificação Automática</h3>
              <p className="text-sm text-gray-600 mt-2">Coloque o custo dos seus ingredientes e saiba exatamente por quanto vender para ter lucro real.</p>
              <p className="text-xs text-gray-400 line-through mt-2">Valor normal: R$ 39,00</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: PREÇO E ANCHORING (Gatilho da Oferta Irrecusável) */}
      <section id="preco" className="bg-amber-600 py-20 px-6 text-white text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-4xl font-black mb-4">Tudo isso por um valor ridículo</h2>
          <p className="text-amber-100 text-lg mb-6">Curso Completo + Todos os Bônus + Atualizações Vitalícias</p>
          
          <div className="bg-amber-700/50 border border-amber-500/40 p-8 rounded-3xl mb-8 backdrop-blur-sm">
            <p className="text-amber-200 line-through text-lg">De R$ 283,00</p>
            <p className="text-sm uppercase tracking-widest text-amber-300 font-bold">Por apenas</p>
            <div className="my-4">
              <span className="text-3xl font-bold align-top">R$ </span>
              <span className="text-7xl font-black tracking-tight">97,00</span>
              <span className="block text-sm text-amber-200 mt-2">ou em até 12x de <strong className="text-white text-lg">R$ 9,68</strong></span>
            </div>
            
            <button className="bg-green-500 hover:bg-green-600 text-white font-black py-5 px-12 rounded-xl text-2xl shadow-2xl transition transform hover:scale-105 w-full uppercase tracking-wider mt-4">
              Quero Garantir Minha Vaga
            </button>
            
            <div className="mt-6 flex justify-center items-center gap-2 text-xs text-amber-100">
              <Lock className="w-4 h-4" /> Seus dados estão 100% criptografados e protegidos.
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: RISCO ZERO (Garantia Incondicional) */}
      <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 bg-gray-50 p-8 rounded-3xl border border-gray-200/60">
          <ShieldCheck className="w-24 h-24 text-amber-600 shrink-0" />
          <div>
            <h2 className="text-2xl font-bold mb-2">Garantia Blindada de 7 Dias</h2>
            <p className="text-gray-600 leading-relaxed">
              Inscreva-se sem medo. Assista às aulas, baixe o material e teste a receita. Se por qualquer motivo você achar que o curso não é para você, basta nos enviar um e-mail dentro de 7 dias e devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: FAQ INTELEGENTE (Destruindo as últimas dúvidas) */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-12">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {[
            {
              q: "Preciso de equipamentos profissionais para começar?",
              a: "Não! Você pode fazer tudo com os utensílios que já tem na sua cozinha. O método foi desenhado para ser feito de forma artesanal e caseira."
            },
            {
              q: "Como recebo o acesso ao curso?",
              a: "Imediatamente após a aprovação do pagamento. Você receberá um e-mail com os seus dados de login e senha para acessar a plataforma oficial de alunos."
            },
            {
              q: "Por quanto tempo terei acesso às aulas?",
              a: "O acesso é vitalício! Você pode assistir no seu ritmo, quantas vezes quiser, e terá direito a todas as futuras atualizações gratuitamente."
            },
            {
              q: "O curso emite certificado?",
              a: "Sim! Ao concluir todas as aulas práticas, você poderá emitir o seu Certificado de Conclusão diretamente pela plataforma."
            }
          ].map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden transition bg-white">
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-5 font-bold flex justify-between items-center bg-gray-50/50 hover:bg-gray-50"
              >
                <span>{faq.q}</span>
                {openFaq === index ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
              </button>
              {openFaq === index && (
                <div className="p-5 text-gray-600 border-t border-gray-100 bg-white leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER ATUALIZADO */}
      <footer className="py-12 bg-gray-900 text-gray-400 text-center px-6 text-sm">
        <p className="mb-2">© 2026 Pão de Queijo da Ira. Todos os direitos reservados.</p>
        <p className="text-xs text-gray-600">Aviso: Os resultados podem variar de pessoa para pessoa e dependem da aplicação correta do método.</p>
      </footer>

    </div>
  );
          }
