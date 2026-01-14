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
    <div className="bg-white text-[#2D3134] antialiased font-['Inter']">
      <Head>
        {/* SEO COMPLETO */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="title" content="Pão de Queijo da Irá" />
        <meta name="author" content="SjrPovoaS" />
        <meta name="description" content="O melhor pão de queijo congelado e caseiro da Cidade Ocidental. Temos pacote com 20 pães de queijo congelado e pacote com 1 kg de pão de queijo congelado." />
        <meta name="Keywords" content="pao de queijo, pão de queijo, pão de queijo em Cidade Ocidental, pão de queijo congelado Cidade Ocidental, pão de queijo caseiro, Pão de Queijo da Irá, melhor lanche em cidade ocidental" />
        <meta name="skype_toolbar" content="skype_toolbar_parser_compatible" />
        <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
        <meta name="googlebot" content="index,follow" />
        <meta name="google-site-verification" content="rj9-yKQenuTL7WznZzLhnZhRRqalrW8B9ptmhuewFiA" />
        
        {/* OPEN GRAPH */}
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:title" content="Pão de Queijo da Irá" />
        <meta property="og:description" content="O melhor pão de queijo congelado e caseiro da Cidade Ocidental. Temos pacote com 20 pães de queijo congelado e pacote com 1 kg de pão de queijo congelado." />
        <meta property="og:image" content="https://paodequeijodaira.vercel.app/imagens/logo-paodequeijodaira.jpg" />
        <meta property="og:site_name" content="Pão de Queijo da Irá" />
        <meta property="og:url" content="https://www.facebook.com/paodeuqiejodaira.iraleide" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="fb:pages" content="359950968036532" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PaodQueijodaIra" />
        <meta name="twitter:creator" content="@PaodQueijodaIra" />
        <meta name="twitter:title" content="Pão de Queijo da Irá" />
        <meta name="twitter:description" content="O melhor pão de queijo congelado e caseiro da Cidade Ocidental. Temos pacote com 20 pães de queijo congelado e pacote com 1 kg de pão de queijo congelado." />
        <meta name="twitter:image" content="https://paodequeijodaira.vercel.app/imagens/logo-paodequeijodaira.jpg" />
        <meta name="twitter:url" content="https://x.com/PaodQueijodaIra" />

        <title>Pão de Queijo da Irá | O melhor pão de queijo congelado e caseiro da Cidade Ocidental</title>
        <link rel="icon" sizes="32x32" href="/imagens/favicon.ico" />
        <link rel="icon" sizes="192x192" href="/imagens/favicon.ico" />
        <link rel="apple-touch-icon" type="image/x-icon" href="/imagens/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/imagens/favicon.ico" />
        <link rel="mask-icon" href="/imagens/favicon.ico" />

        {/* SCRIPTS EXTERNOS */}
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
   
        {/* Fontes e Estilos Externos */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lobster&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />

        <link rel="canonical" href="https://paodequeijodaira.vercel.app" />
        <link rel="profile" href="https://gmpg.org/xfn/11" />

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
            <a href="#produtos" className="hover:text-orange-600 px-2 py-2 rounded-full">Produtos</a>
            <a href="#nossa-historia" className="hover:text-orange-600 px-2 py-2 rounded-full">Nossa História</a>
            <a href="#depoimentos" className="hover:text-orange-600 px-2 py-2 rounded-full">Depoimentos</a>
            <a href="#guia-gratuito" className="hover:text-orange-600 px-2 py-2 rounded-full">Guia Gratuito</a>
            <a href="#curso" className="hover:text-orange-600 px-2 py-2 rounded-full">Curso</a>
            <a href="/loja" className="text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all">VISITAR LOJA LIFESTYLE</a>
          </nav>
          <button onClick={() => setIsModalOpen(true)} className="bg-orange-600 text-white px-8 py-4 font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">Pedir Agora</button>
        </div>
      </header>

      {/* HERO */}
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

      {/* PRODUTOS */}
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

      {/* NOSSA HISTÓRIA */}
      <section id="nossa-historia" className="py-24 px-6 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 italic">👩‍🍳 A História da Irá</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>Eu sou a Iraleide, e o <strong>Pão de Queijo da Irá</strong> nasceu de um desejo simples: compartilhar a melhor receita de pão de queijo da minha família.</p>
              <p>Hoje, esse mesmo carinho é transformado em cada pãozinho que você leva para casa, <strong>congelado e fresquinho</strong>. Com a nossa praticidade, você tem um lanche delicioso e caseiro a minutos de distância.</p>
            </div>
            <a href="https://g.page/r/Ca9UJok_gMntEBI/review" target="_blank" className="inline-block mt-8 border-b-2 border-orange-600 pb-1 font-bold text-sm uppercase tracking-widest text-orange-600">⭐ Confira nossas avaliações no Google</a>
          </div>
          <div className="order-1 md:order-2">
            <img src="/imagens/historia-contato.png" alt="Iraleide" className="w-full rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-16 italic">💬 O Que Dizem Nossos Clientes?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "O melhor pão de queijo congelado que já comi! Crocante por fora e super macio por dentro.", author: "Kelly M., GO" },
              { text: "Acabei com o pacote de 1kg em um fim de semana. É viciante! Entrega super rápida.", author: "Pedro B., DF" },
              { text: "Receita de vó com cara nova! O sabor é muito fiel ao caseiro de Minas.", author: "Yeda M., GO" }
            ].map((d, i) => (
              <div key={i} className="bg-white p-8 shadow-sm border border-gray-100 rounded-xl">
                <p className="text-sm italic text-gray-600 mb-6">"{d.text}"</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-orange-600">— {d.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIA GRATUITO (Brevo Form) */}
      <section id="guia-gratuito" className="bg-[#2D3134] text-white py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <img src="/imagens/caneca-isca.png" alt="Guia" className="rounded-3xl rotate-3" />
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-6">Transforme seu café em um momento inesquecível.</h2>
            <p className="text-gray-400 mb-8">Baixe nosso guia gratuito e descubra os segredos da harmonização perfeita entre o pão de queijo quentinho, cafés especiais e acompanhamentos que abraçam a alma.</p>
            <form className="space-y-4" action="https://43782b7b.sibforms.com/serve/MUIFADVOaKFQT5-e79pfcuRymIn3mT3LpZ6jTYiaabJu4jshHz-B2CX67o1k7j8_Jj8t0kir0rvKsU606Nhx7P2_uNRORnZ_5B-wVs18TtNjYGtXnkqclgkUanefRoM1T1-jLskVawichbZvQ4ojESQ2bzzCVA0xEodVW76v349_vKowtR085QjMa-mytw4PTgqyI1c2awQVte9ZMw==" method="POST">
              <input type="text" placeholder="Seu nome" className="w-full p-4 bg-transparent border-2 border-gray-700 focus:border-orange-600 outline-none transition-colors" />
              <input type="email" placeholder="Seu melhor e-mail" className="w-full p-4 bg-transparent border-2 border-gray-700 focus:border-orange-600 outline-none transition-colors" />
              <button className="w-full bg-orange-600 py-4 font-black uppercase tracking-widest">Quero meu guia gratuito</button>
            </form>
          </div>
        </div>
      </section>

      {/* CURSO */}
      <section id="curso" className="relative py-32 px-8 overflow-hidden text-white text-center">
        {/* Camada da Imagem de Fundo */}
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: "url('/imagens/criar-negocio.webp')" }}
        ></div>

        {/* Camada de Sobreposição Alaranjada Transparente (Overlay) */}
        <div className="absolute inset-0 z-10 bg-orange-600/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-orange-600/40 to-orange-700/90"></div>

        {/* Conteúdo da Seção */}
        <div className="relative z-20 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-[900] uppercase tracking-tighter mb-8 italic leading-none drop-shadow-lg">
            TRANSFORME PÃO DE QUEIJO EM RENDA: <br className="hidden md:block" />
            <span className="text-black">COMECE SEU NEGÓCIO!</span>
          </h2>

          <p className="text-lg md:text-xl font-medium opacity-95 mb-12 leading-relaxed drop-shadow">
            Aprenda a fazer e como vender pão de queijo com sucesso. Descubra os segredos por trás da
            Receita Secreta do Pão de Queijo da Irá. Aprenda a preparar o petisco mais amado do Brasil
            e transforme-o em um negócio lucrativo. Adquira o curso agora e inicie sua jornada para
            se tornar um mestre na arte de fazer e vender pão de queijo.</p>

          {/* CURSO NA HOME */}
          <a href="/curso" target="_blank"
            className="inline-block bg-black text-white px-12 py-6 font-black uppercase tracking-widest text-sm hover:bg-white hover:text-orange-600 transition-all shadow-2xl"
          >EU QUERO A RECEITA SECRETA!</a>
        </div>
      </section>

      {/* MODAL DE PEDIDO COMPLETO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Background com desfoque */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>

          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Cabeçalho do Modal */}
            <div className="bg-orange-600 p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-black uppercase tracking-tighter">✨ Monte seu Pedido Agora!</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-2xl font-bold hover:rotate-90 transition-transform">&times;</button>
            </div>

            {/* Formulário */}
            <form onSubmit={handleWhatsapp} className="p-8 space-y-4 overflow-y-auto max-h-[80vh]">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Produto Desejado:</label>
                <select id="produto" name="produto" required className="w-full p-3 border-2 border-gray-100 rounded-xl font-bold text-sm outline-none focus:border-orange-600 transition-colors">
                  <option value="" disabled selected>Selecione uma opção</option>
                  <option value="Pacote com 20 Unidades">Pacote com 20 Unidades (R$ 10,00)</option>
                  <option value="Pacote de 1 Kg">Pacote de 1 Kg (R$ 25,00)</option>
                  <option value="Ambos os Pacotes">Ambos os Pacotes</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Quantidade de Pacotes:</label>
                <input type="number" id="quantidade" name="quantidade" min="1" defaultValue="1" required className="w-full p-3 border-2 border-gray-100 rounded-xl outline-none focus:border-orange-600" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Seu Nome:</label>
                <input type="text" id="nome" name="nome" placeholder="Seu Nome Completo" required className="w-full p-3 border-2 border-gray-100 rounded-xl outline-none focus:border-orange-600" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Endereço de Entrega:</label>
                <input type="text" id="endereco" name="endereco" placeholder="Rua, Número, Bairro, Cidade" required className="w-full p-3 border-2 border-gray-100 rounded-xl outline-none focus:border-orange-600" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Observações (Opcional):</label>
                <input type="text" id="observacoes" name="observacoes" placeholder="Ex: Retirar no local, pagar em PIX." className="w-full p-3 border-2 border-gray-100 rounded-xl outline-none focus:border-orange-600" />
              </div>

              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2">
                <i className="bi bi-whatsapp text-lg"></i>
                ENVIAR PEDIDO PELO WHATSAPP
              </button>
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