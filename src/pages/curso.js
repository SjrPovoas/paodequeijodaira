import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function CursoPage() {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutos
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Timer funcional
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 1800));
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return {
      min: min < 10 ? `0${min}` : min,
      sec: sec < 10 ? `0${sec}` : sec,
    };
  };

  const { min, sec } = formatTime(timeLeft);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const name = e.target.custName.value;
    const email = e.target.custEmail.value;
    const phone = e.target.custPhone.value;

    btn.innerText = "PROCESSANDO...";
    btn.disabled = true;

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone })
      });
    } catch (err) { console.warn("Redirecionando..."); }

    const hotmartUrl = `https://pay.hotmart.com/O42269386S?off=a4qucrsw&hotfeature=51&bid=1767379430688&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phonenumber=${encodeURIComponent(phone)}`;
    window.location.href = hotmartUrl;
  };

  return (
    <div className="bg-black text-white selection:bg-red-600">
      <Head>
        <title>Receita Secreta do Pão de Queijo da Irá</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
        <meta name="google-site-verification" content="rj9-yKQenuTL7WznZzLhnZhRRqalrW8B9ptmhuewFiA" />
      </Head>

      {/* SEÇÃO 1: HERO SECTION (Foco em texto persuasivo + Mídia) */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-12 md:py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Inscrições Abertas • Vagas Limitadas
            </span>
            <h1 className="text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight text-gray-900">
              Receita Secreta do Pão de Queijo da Irá:  <span className="text-amber-600">aprenda a fazer e vender com sucesso</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              O segredo que transformou uma cozinha doméstica em um negócio de sucesso. Aprenda o método passo a passo e conquiste sua liberdade financeira.
              {/* Descubra o método passo a passo para dominar a receita artesanal da Ira, técnicas de congelamento sem perder o sabor e como criar um negócio lucrativo em casa. */}
            </p>
            <button onClick={() => setIsModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-black py-4 px-10 rounded-xl text-2xl shadow-2xl transition transform hover:scale-105 w-full uppercase tracking-wider mt-4">
              <i className="bi bi-cart2 text-[24x]"></i> QUERO COMEÇAR AGORA
            </button>
            <p className="mt-3 text-xs text-gray-600 flex items-center justify-start gap-6">
              <i className="bi bi-clock text-[18x] text-amber-600"></i> Acesso imediato e 100% seguro.
            </p>
          </div>

          {/* Espaço para Vídeo de Vendas (VSL) ou Imagem de Alta Qualidade */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-200 aspect-video flex items-center justify-center border-4 border-white">
            <img
              src="/imagens/criar-negocio.webp"
              alt="Receita Secreta do Pão de Queijo da Irá" loading='lazy'
              className="object-cover w-full h-full"
            />
            {/* Overlay simulando botão de play caso use vídeo */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center hover:bg-black/10 transition cursor-pointer">
              <div className="bg-white/90 p-4 rounded-full shadow-lg">
                <svg className="w-8 h-8 text-amber-600 fill-current ml-1" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO 2: VÍDEO (BEGE) --- */}
      <section className="min-h-screen bg-[#e6d5c3] text-black flex flex-col justify-center items-center px-6 py-20 text-center">
        <div className="w-full max-w-[800px] mb-8">
          {/* Espaço para Vídeo de Vendas (VSL) ou Imagem de Alta Qualidade */}
          <div className="relative rounded-2xl overflow-hidden pb-[56.25%] h-0 shadow-2xl shadow-2xl bg-gray-200 aspect-video flex items-center justify-center border-4 border-white">
            <img src="https://images.unsplash.com/photo-1629115917923-92f74e929f0f?q=80&w=600"
              alt="Pão de queijo quentinho saindo do forno" loading='lazy'
              className="object-cover w-full h-full" />
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-[10px] border-none"
              src="https://www.youtube.com/embed/Bg_kn2q8chA"
              title="Vídeo"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="max-w-[800px]">
          <h2 className="bg-black text-white px-5 py-2 inline-block font-bold mb-6">O QUE VOCÊ VAI APRENDER</h2>
          <p className="text-lg leading-relaxed">
            Com o Curso Receita Secreta do Pão de Queijo da Irá - aprenda a fazer e vender pão de queijo com sucesso, você vai descobrir o ponto exato da massa, o melhor queijo para usar e como embalar e vender seu produto de forma profissional. Não é apenas uma receita, é um modelo de negócio testado.
          </p>
        </div>
      </section>

      {/* SEÇÃO 2: PROVA SOCIAL IMEDIATA (Gera autoridade logo cedo) 
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
      </section>*/}

      {/* SEÇÃO 3: EMPILHAMENTO DE VALOR */}
      <section className="min-h-screen bg-white text-black flex flex-col justify-center items-center px-[10%] py-24 text-center">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-bold uppercase text-sm tracking-widest">Presente Exclusivo</span>
          <h2 className="text-4xl font-extrabold mt-4">Garanta sua vaga hoje e leve este bônus:</h2>
        </div>
        <div className="grid md:grid-cols-1 gap-8 w-full max-w-5xl mb-16">
          {/* BLOCO 1 */}
          <div className="p-8 border border-amber-200 rounded-3xl bg-amber-50/40 flex gap-6 text-left">
            <div className="shrink-0">
              <i className="bi bi-gift bg-amber-500 text-white p-4 rounded-xl shadow-md block text-2xl"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full w-fit mb-2">GRÁTIS</span>
              <h3 className="font-bold text-xl leading-tight">Guia de Embalagem e Congelamento Comercial</h3>
              <p className="text-gray-600 mt-3">Aprenda a ensacar e congelar mantendo o pão de queijo perfeito por até 30 dias sem perder o sabor.</p>
              <p className="text-xs text-gray-400 line-through mt-4">Valor normal: R$ 47,00</p>
            </div>
          </div>

          {/* BLOCO 2 
          <div className="p-8 border border-amber-200 rounded-3xl bg-amber-50/40 flex gap-6 text-left">
            <div className="shrink-0">
              <i className="bi bi-gift bg-amber-500 text-white p-4 rounded-xl shadow-md block text-2xl"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full w-fit mb-2">GRÁTIS</span>
              <h3 className="font-bold text-xl leading-tight">Planilha Prática de Precificação Automática</h3>
              <p className="text-gray-600 mt-3">Coloque o custo dos seus ingredientes e saiba exatamente por quanto vender para ter lucro real.</p>
              <p className="text-xs text-gray-400 line-through mt-4">Valor normal: R$ 39,00</p>
            </div>
          </div> */}
        </div>
        {/* TIMER E CTA - Afastados dos blocos com mt-16 */}
        <div className="mt-16 flex flex-col items-center">
          <div className="flex justify-center gap-4 mb-8">
            <div className="bg-black text-white w-28 p-5 rounded-2xl">
              <span className="text-5xl font-bold block">{min}</span>
              <span className="text-[10px] uppercase tracking-widest mt-1 block">Min</span>
            </div>
            <div className="bg-black text-white w-28 p-5 rounded-2xl">
              <span className="text-5xl font-bold block">{sec}</span>
              <span className="text-[10px] uppercase tracking-widest mt-1 block">Seg</span>
            </div>
          </div>
          <p className="text-lg mb-8 max-w-lg">
            <strong>Atenção:</strong> O valor promocional expira assim que o cronômetro zerar.
          </p>
        </div>
      </section>

      {/* SEÇÃO 4: PREÇO E ANCHORING (Gatilho da Oferta Irrecusável) */}
      <section id="preco" className="bg-amber-600 py-20 px-6 text-white text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-4xl font-black mb-4">Tudo isso por um valor ridículo</h2>
          {/*<p className="text-amber-100 text-lg mb-6">Curso Completo + Todos os Bônus + Atualizações Vitalícias</p>*/}
          <p className="text-amber-100 text-lg mb-6">Curso Completo (R$249,90) + Bônus (R$47,00)</p>
          <div className="bg-amber-700/50 border border-amber-500/40 p-8 rounded-3xl mb-8 backdrop-blur-sm">
            <p className="text-amber-200 line-through text-lg">De R$ 296,90</p>
            <p className="text-sm uppercase tracking-widest text-amber-300 font-bold">Por apenas</p>
            <div className="my-4">
              <span className="text-3xl font-bold align-top">R$ </span>
              <span className="text-7xl font-black tracking-tight">97,00</span>
              <span className="block text-sm text-amber-200 mt-2">ou em até 12x de <strong className="text-white text-lg">R$ 10,03</strong> = R$ 120,36</span>
            </div>
            <button onClick={() => setIsModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-black py-5 px-12 rounded-xl text-2xl shadow-2xl transition transform hover:scale-105 w-full uppercase tracking-wider mt-4">
              Quero Garantir Minha Vaga
            </button>
            <div className="mt-6 flex justify-center items-center gap-2 text-xs text-amber-100">
              <i class="bi bi-lock"></i> Seus dados estão 100% criptografados e protegidos.
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: RISCO ZERO (GARANTIA INCONDICIONAL) */}
      <section className="min-h-screen bg-white text-black flex justify-center items-center px-[5%] py-20">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-3xl">
          {/* COLUNA ESQUERDA: Ícone centralizado */}
          <div className="flex justify-center items-center shrink-0">
            <i className="bi bi-shield-check flex text-[8rem] text-[#ffcc00]"></i>
          </div>
          {/* COLUNA DIREITA: Título e Descrição */}
          <div className="flex flex-col justify-center">
            <h3 className="text-[#ffcc00] text-[2.2rem] font-bold mb-3 leading-tight">
              GARANTIA BLINDADA DE 7 DIAS
            </h3>
            <hr className="border-white mb-5 w-full" />
            <p className="text-xl">
              Inscreva-se sem medo. Assista às aulas, baixe o material e teste a receita.
              Se por qualquer motivo você achar que o curso não é para você, basta nos
              enviar um e-mail dentro de 7 dias e devolvemos 100% do seu dinheiro.
              Sem perguntas, sem burocracia.
            </p>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO 6: FAQ --- */}
      < section className="min-h-screen bg-black px-6 py-20 flex flex-col items-center" >
        <div className="w-full max-w-[800px]">
          <h2 className="text-[#ffcc00] text-3xl font-bold mb-10 text-center uppercase tracking-wider">Dúvidas Frequentes</h2>
          <div className="space-y-3">
            {[
              { q: "PARA QUEM É ESSE PRODUTO?", a: "O público-alvo desse produto é 14 anos ou mais." },
              { q: "COMO FUNCIONA O PRAZO DE GARANTIA?", a: "Você tem 7 dias para pedir reembolso integral caso não fique satisfeito." },
              { q: "TEM CERTIFICADO?", a: "Sim! Ao concluir todas as aulas práticas, este curso online oferece um certificado de conclusão digital diretamente pela plataforma." },
              { q: "POR QUANTO TEMPO TEREI ACESSO?", a: "O acesso é vitalício! Você poderá assistir às aulas no seu ritmo, quantas vezes quiser." },
              { q: "COMO RECEBO O CURSO?", a: "Imediatamente após a aprovação do pagamento. Você receberá um e-mail com os seus dados de login e senha para acessar a plataforma oficial de alunos pela plataforma Hotmart." },
              { q: "COMO ACESSO O PRODUTO?", a: "01 - Faça login na Hotmart clicando em 'Entrar'. 02 - Acesse o menu lateral, clique em 'Minha conta'. 03 - Clique em 'Minhas compras' e lá estarão todos os produtos que você já comprou!" },
              { q: "PRECISO DE EQUIPAMENTOS PROFISSIONAIS PARA COMEÇAR?", a: "Não! Você pode fazer tudo com os utensílios que já tem na sua cozinha. O método foi desenhado para ser feito de forma artesanal e caseira." },
              { q: "COMO FAÇO PARA COMPRAR?", a: "Para comprar este curso, clique no botão “Comprar agora”. Lembre-se de que nem todos os cursos estarão sempre disponíveis para compra. É possível que o produtor esteja preparando uma nova turma ainda sem inscrições abertas." }
            ].map((faq, i) => (
              <details key={i} className="bg-white rounded-lg overflow-hidden group">
                <summary className="p-5 font-bold text-black cursor-pointer list-none flex justify-between items-center group-open:bg-[#ffcc00] transition-colors">
                  {faq.q}
                  <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold">+</span>
                </summary>
                <div className="p-6 bg-[#222] text-white border-t border-[#444]">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section >

      {/* --- MODAL --- */}
      {
        isModalOpen && (
          <div className="fixed inset-0 z-[10000] bg-black/90 flex justify-center items-center p-4">
            <div className="bg-white p-8 md:p-10 rounded-[15px] w-full max-w-[400px] text-center relative text-black">
              <span
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-5 text-3xl cursor-pointer text-gray-400 hover:text-black"
              >
                &times;
              </span>
              <h3 className="text-red-600 font-[800] text-xl mb-2">SÓ MAIS UM PASSO!</h3>
              <p className="text-sm mb-6">Preencha para liberar seu desconto e seguir ao pagamento.</p>
              <form onSubmit={handleCheckout} className="space-y-4">
                <input name="custName" type="text" placeholder="Nome Completo" required className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-red-600" />
                <input name="custEmail" type="email" placeholder="Seu melhor e-mail" required className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-red-600" />
                <input name="custPhone" type="tel" placeholder="WhatsApp com DDD" required className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-red-600" />
                <button type="submit" className="w-full bg-[#25d366] text-black p-4 font-[900] rounded-[50px] uppercase hover:bg-[#ffcc00] transition-all">
                  IR PARA O PAGAMENTO
                </button>
              </form>
            </div>
          </div>
        )
      }

      <footer className="bg-[#e6d5c3] py-10 px-6 text-center text-black border-t border-black/10">
        <p className="mb-2">© 2025-2026 - Receita Secreta do Pão de Queijo da Irá: <br />aprenda a fazer e vender com sucesso - Todos os direitos reservados.</p>
        <p className="text-xs text-gray-600">Aviso: Os resultados podem variar de pessoa para pessoa e dependem da aplicação correta do método.</p>
      </footer>
    </div>
  );
}