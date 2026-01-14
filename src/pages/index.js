import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const WHATSAPP_NUMBER = "5561982777196";
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir WhatsApp
  const handleWhatsapp = (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const produto = document.getElementById('produto').value;
    const qtd = document.getElementById('quantidade').value;
    const msg = encodeURIComponent(`Olá Ira! Meu nome é ${nome}. Quero pedir ${qtd}x ${produto}.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-white text-gray-900 antialiased font-['Inter']">
      <Head>
        <title>Pão de Queijo da Irá | O melhor de Cidade Ocidental</title>
        <meta name="description" content="O melhor pão de queijo congelado e caseiro da Cidade Ocidental. Pacotes de 20 unidades e 1kg." />
        <script src="https://cdn.tailwindcss.com"></script>
        {/* Google Tag Manager original */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-N25BXQZC');`
        }} />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
      </Head>

      {/* HEADER ADAPTADO COM LOGO */}
      <header className="border-b border-gray-100 py-4 px-6 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-16 w-auto" />
          <nav className="hidden md:flex space-x-8 text-[10px] font-bold uppercase tracking-widest">
            <a href="#produtos" className="hover:text-orange-600 px-4 py-2 rounded-full">Produtos</a>
            <a href="/loja" className="text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all">VISITAR LOJA LIFESTYLE</a>
          </nav>
          <button onClick={() => setIsModalOpen(true)} className="bg-orange-600 text-white px-10 py-5 font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">Pedir Agora</button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative py-20 px-6 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
              O sabor caseiro que faz sua casa <span className="text-orange-600 italic">sorrir.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">Pão de Queijo de Verdade, Congelado Para Facilitar a Sua Vida. Peça e Surpreenda-se!</p>
            <button onClick={() => setIsModalOpen(true)} className="bg-orange-600 text-white px-10 py-5 font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">
              Quero encomendar agora!
            </button>
          </div>
          <div className="relative">
            <img src="/imagens/hero-banner.png" alt="Pão de Queijo" className="relative z-10 w-full rounded-2xl shadow-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-100 rounded-full blur-3xl -z-10 opacity-50"></div>
          </div>
        </div>
      </section>

      {/* SEÇÃO PRODUTOS (Adaptada do seu HTML) */}
      <section id="produtos" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-black uppercase tracking-tighter mb-16 italic">🧀 Nossos Pacotes: Sabor Congelado, Feito na Hora!</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Pacote 20un */}
          <div className="border-4 border-black p-8 flex flex-col items-center text-center group hover:bg-black hover:text-white transition-all">
            <img src="/imagens/imagem-embalagem-20und.png" className="h-64 object-contain mb-6 grayscale group-hover:grayscale-0 transition-all" />
            <h3 className="text-2xl font-black uppercase">20 Unidades</h3>
            <p className="text-xs font-bold uppercase tracking-widest my-4 opacity-60">Ideal para a semana</p>
            <span className="text-3xl font-black mb-6">R$ 10,00</span>
            <button onClick={() => setIsModalOpen(true)} className="w-full bg-orange-600 text-white py-4 font-bold uppercase">Comprar 20 Und</button>
          </div>
          {/* Pacote 1kg */}
          <div className="border-4 border-orange-600 p-8 flex flex-col items-center text-center bg-orange-50 group hover:bg-orange-600 hover:text-white transition-all">
            <img src="/imagens/imagem-embalagem-1kg.png" className="h-64 object-contain mb-6 transition-all" />
            <h3 className="text-2xl font-black uppercase">Pacote de 1 KG</h3>
            <p className="text-xs font-bold uppercase tracking-widest my-4 opacity-60">Melhor Custo-Benefício!</p>
            <span className="text-3xl font-black mb-6">R$ 25,00</span>
            <button onClick={() => setIsModalOpen(true)} className="w-full bg-black text-white py-4 font-bold uppercase">Comprar 1 KG</button>
          </div>
        </div>
      </section>

      {/* GUIA GRATUITO (Brevo Form) */}
      <section className="bg-[#2D3134] text-white py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <img src="/imagens/caneca-isca.png" alt="Guia" className="rounded-3xl rotate-3" />
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-6">Transforme seu café em um momento inesquecível.</h2>
            <p className="text-gray-400 mb-8">Baixe nosso guia gratuito e descubra os segredos da harmonização perfeita entre o pão de queijo quentinho, cafés especiais e acompanhamentos que abraçam a alma.</p>
            <form className="space-y-4" action="https://43782b7b.sibforms.com/serve/..." method="POST">
              <input type="text" placeholder="Seu nome" className="w-full p-4 bg-transparent border-2 border-gray-700 focus:border-orange-600 outline-none transition-colors" />
              <input type="email" placeholder="Seu melhor e-mail" className="w-full p-4 bg-transparent border-2 border-gray-700 focus:border-orange-600 outline-none transition-colors" />
              <button className="w-full bg-orange-600 py-4 font-black uppercase tracking-widest">Quero meu guia gratuito</button>
            </form>
          </div>
        </div>
      </section>

      {/* MODAL DE PEDIDO (Adaptado do seu script) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white p-8 max-w-lg w-full rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 italic">✨ Monte seu Pedido</h3>
            <form onSubmit={handleWhatsapp} className="space-y-4">
              <select id="produto" className="w-full p-4 border-2 border-gray-100 rounded-xl font-bold uppercase text-xs outline-none focus:border-orange-600 transition-colors">
                <option value="Pacote com 20 Unidades">20 Unidades (R$ 10,00)</option>
                <option value="Pacote de 1 Kg">Pacote de 1 Kg (R$ 25,00)</option>
              </select>
              <input id="quantidade" type="number" defaultValue="1" min="1" className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none" />
              <input id="nome" type="text" placeholder="Seu Nome Completo" required className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none focus:border-orange-600 transition-colors" />
              <button type="submit" className="w-full bg-green-600 text-white py-4 font-black uppercase tracking-widest rounded-xl hover:bg-green-700 transition-colors">Enviar WhatsApp</button>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER COMPLETO */}
      <footer className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-16">
            
            {/* COLUNA 1: LOGO E SOCIAL */}
            <div className="flex flex-col items-center md:items-start">
              <img src="/logo-paodequeijodaira.jpg" className="h-20 mb-6" alt="Logo" />
              <div className="flex space-x-2">
                <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-instagram"></i></a>
                <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-facebook"></i></a>
                <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-youtube"></i></a>
                <a href="https://maps.app.goo.gl/oGCHp5i9y8HnPutg9" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-geo-alt-fill"></i></a>
              </div>
            </div>

            {/* COLUNA 2: INFO DE RETIRADA */}
            <div className="text-center md:text-left space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Funcionamento & Retirada</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>Horário:</strong> Seg a Sáb das 08:00 às 18:00.<br />
                Dom das 08:00 às 12:00.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Endereço:</strong> Quadra 4 Lote 26 Condomínio Flores do Cerrado II - Recreio Mossoró - Cidade Ocidental-GO
              </p>
            </div>

            {/* COLUNA 3: LEGAL & CRÉDITOS */}
            <div className="text-center md:text-right flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tighter mb-2">Pão de Queijo da Irá</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© 2026 - Todos os direitos reservados.</p>
              </div>
              <div className="mt-8 space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <a href="#" className="hover:text-black">Termos de Uso</a>
                <span>|</span>
                <a href="#" className="hover:text-black">Privacidade</a>
              </div>
            </div>
          </div>

          {/* ASSINATURA */}
          <div className="pt-8 border-t border-gray-50 text-center">
            <a href="https://sjrpovoas.vercel.app" target="_blank" className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300 hover:text-orange-600 transition-all">
              Desenvolvido por SjrPovoaS
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
