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
      </Head>

      {/* --- SEÇÃO 1: HERO --- */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-20 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-[clamp(1.8rem,5vw,3.5rem)] leading-[1.1] mb-6 text-[#ff0000] font-[800] uppercase">
            Receita Secreta do Pão de Queijo da Irá: aprenda a fazer e vender com sucesso
          </h1>
          <p className="text-[clamp(1rem,2vw,1.3rem)] text-[#ddd] mb-10 max-w-[850px] mx-auto">
            O segredo que transformou uma cozinha doméstica em um negócio de sucesso. Aprenda o método passo a passo e conquiste sua liberdade financeira.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-block bg-[#25d366] text-black px-12 py-5 text-xl font-[900] rounded-[50px] uppercase transition-all hover:bg-[#ffcc00] hover:scale-105 shadow-[0_0_20px_rgba(37,211,102,0.4)]"
          >
            QUERO COMEÇAR AGORA
          </button>
          <div className="mt-16 flex justify-center">
            <img 
              src="/imagens/criar-negocio.webp" 
              alt="Pão de Queijo da Irá" 
              className="max-w-[850px] w-full rounded-[20px] shadow-[0_20px_60px_rgba(255,0,0,0.25)]"
            />
          </div>
        </div>
      </section>

      {/* --- SEÇÃO 2: VÍDEO (BEGE) --- */}
      <section className="min-h-screen bg-[#e6d5c3] text-black flex flex-col justify-center items-center px-6 py-20 text-center">
        <div className="w-full max-w-[800px] mb-8">
          <div className="relative pb-[56.25%] h-0 shadow-2xl">
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

      {/* --- SEÇÃO 3: TIMER --- */}
      <section className="min-h-screen bg-white text-black flex flex-col justify-center items-center px-6 py-20 text-center">
        <div className="flex justify-center gap-4 mb-8">
          <div className="bg-black text-white w-24 p-4 rounded-[10px]">
            <span className="text-4xl font-bold block">{min}</span>
            <span className="text-[10px] uppercase">Min</span>
          </div>
          <div className="bg-black text-white w-24 p-4 rounded-[10px]">
            <span className="text-4xl font-bold block">{sec}</span>
            <span className="text-[10px] uppercase">Seg</span>
          </div>
        </div>
        <p className="text-lg mb-6"><strong>Atenção:</strong> O valor promocional expira assim que o cronômetro zerar.</p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#ffcc00] text-black px-12 py-5 text-xl font-[900] rounded-[50px] uppercase transition-all hover:bg-[#25d366] hover:text-white hover:scale-105 shadow-[0_4px_15px_rgba(255,204,0,0.4)]"
        >
          APROVEITAR OFERTA
        </button>
      </section>

      {/* --- SEÇÃO 4: GARANTIA --- */}
      <section className="min-h-screen bg-black text-white flex flex-col md:flex-row justify-center items-center px-[5%] py-20 text-left">
        <div className="flex-1 text-center md:text-right">
          <img src="/imagens/garantia-de-7dias.png" alt="Garantia" className="max-w-[200px] inline-block" />
        </div>
        <div className="flex-[2] md:pl-10 mt-10 md:mt-0">
          <h3 className="text-[#ffcc00] text-[2.2rem] font-bold mb-3">SATISFAÇÃO GARANTIDA</h3>
          <hr className="border-white mb-5" />
          <p className="text-xl">Se em até 7 dias você não estiver satisfeito com o conteúdo, nós devolvemos 100% do seu investimento sem burocracia.</p>
        </div>
      </section>

      {/* --- SEÇÃO 5: PREÇO --- */}
      <section className="min-h-screen border-t border-[#333] flex flex-col justify-center items-center px-6 py-20 text-center">
        <span className="text-red-600 font-bold line-through text-xl mb-2">DE R$ 249,90 POR APENAS</span>
        <h2 className="text-[#ffcc00] text-[clamp(2.5rem,6vw,4rem)] font-[900] my-2">12X R$ 10,03</h2>
        <p className="text-lg mb-8 text-gray-300">ou R$ 97,00 à vista</p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#25d366] text-black px-12 py-5 text-xl font-[900] rounded-[50px] uppercase transition-all hover:bg-[#ffcc00] hover:scale-105 shadow-[0_0_20px_rgba(37,211,102,0.4)]"
        >
          GARANTIR MINHA VAGA
        </button>
      </section>

      {/* --- SEÇÃO 6: FAQ --- */}
      <section className="min-h-screen bg-black px-6 py-20 flex flex-col items-center">
        <div className="w-full max-w-[800px]">
          <h2 className="text-[#ffcc00] text-3xl font-bold mb-10 text-center uppercase tracking-wider">Dúvidas Frequentes</h2>
          <div className="space-y-3">
            {[
              { q: "PARA QUEM É ESSE PRODUTO?", a: "O público-alvo desse produto é 14 anos ou mais." },
              { q: "COMO FUNCIONA O PRAZO DE GARANTIA?", a: "Você tem 7 dias para pedir reembolso integral caso não fique satisfeito." },
              { q: "TEM CERTIFICADO?", a: "Sim! Este curso online oferece um certificado de conclusão digital ao final das aulas." },
              { q: "POR QUANTO TEMPO TEREI ACESSO?", a: "O acesso é vitalício! Você poderá assistir às aulas quantas vezes quiser." },
              { q: "COMO RECEBO O CURSO?", a: "O acesso é imediato via e-mail pela plataforma Hotmart." },
              { q: "COMO ACESSO O PRODUTO?", a: "01 - Faça login na Hotmart clicando em 'Entrar'. 02 - Acesse o menu lateral, clique em 'Minha conta'. 03 - Clique em 'Minhas compras' e lá estarão todos os produtos que você já comprou!" },
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
      </section>

      {/* --- MODAL --- */}
      {isModalOpen && (
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
      )}

      <footer className="bg-[#e6d5c3] py-10 px-6 text-center text-black border-t border-black/10">
        <p>© 2025-2026 - Receita Secreta do Pão de Queijo da Irá: <br />aprenda a fazer e vender com sucesso<br />Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}