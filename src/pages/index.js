import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const WHATSAPP_NUMBER = "5561982777196";
  const LINK_BAIXAR_GUIA = "https://43782b7b.sibforms.com/serve/MUIFADVOaKFQT5-e79pfcuRymIn3mT3LpZ6jTYiaabJu4jshHz-B2CX67o1k7j8_Jj8t0kir0rvKsU606Nhx7P2_uNRORnZ_5B-wVs18TtNjYGtXnkqclgkUanefRoM1T1-jLskVawichbZvQ4ojESQ2bzzCVA0xEodVW76v349_vKowtR085QjMa-mytw4PTgqyI1c2awQVte9ZMw=="
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Trava o scroll do site quando o menu estiver aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleWhatsapp = (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const produto = document.getElementById('produto').value;
    const qtd = document.getElementById('quantidade').value;
    const endereco = document.getElementById('endereco').value;
    const obs = document.getElementById('observacoes').value;
    const msg = encodeURIComponent(`Olá Ira! Meu nome é ${nome}.\nQuero pedir: ${qtd}x ${produto}.\nEntrega em: ${endereco}.\nObs: ${obs}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-white text-[#2D3134] antialiased font-['Inter'] overflow-x-hidden">
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

        {/* Meta Tags para WhatsApp / Facebook (Open Graph) */}
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pão de Queijo da Irá" />
        <meta property="og:url" content="https://www.facebook.com/paodeuqiejodaira.iraleide" />
        <meta property="og:image" content="https://paodequeijodaira.vercel.app/logo-paodequeijodaira.jpg" />
        <meta name="og:image:width" content="1200">
        <meta name="og:image:height" content="630"> 
        <meta property="og:title" content="Pão de Queijo da Irá" />
        <meta property="og:description" content="O melhor pão de queijo congelado e caseiro da Cidade Ocidental. Temos pacote com 20 pães de queijo congelado e pacote com 1 kg de pão de queijo congelado." />

       {/* <meta property="og:image" content="https://paodequeijodaira.vercel.app/logo-paodequeijodaira.jpg" />
        <meta property="og:image:secure_url" content="https://paodequeijodaira.vercel.app/logo-paodequeijodaira.jpg" />
        <meta property="og:image:type" content="image/jpg" /> */}

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PaodQueijodaIra" />
        <meta name="twitter:creator" content="@PaodQueijodaIra" />
        <meta name="twitter:title" content="Pão de Queijo da Irá" />
        <meta name="twitter:description" content="O melhor pão de queijo congelado e caseiro da Cidade Ocidental. Temos pacote com 20 pães de queijo congelado e pacote com 1 kg de pão de queijo congelado." />
        <meta name="twitter:image" content="https://paodequeijodaira.vercel.app/logo-paodequeijodaira.jpg" />
        <meta name="twitter:url" content="https://x.com/PaodQueijodaIra" />

        <title>Pão de Queijo da Irá | O melhor pão de queijo congelado e caseiro da Cidade Ocidental</title>

        {/* Fontes e Estilos Externos */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lobster&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link rel="canonical" href="https://paodequeijodaira.vercel.app" />
        <link rel="profile" href="https://gmpg.org/xfn/11" />

        <script src="https://cdn.tailwindcss.com"></script>
        {/* Google Tag Manager original */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-N25BXQZC');`
        }} />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
      </Head>

     {/* HEADER */}
      <header className="border-b border-gray-100 py-4 px-6 sticky top-0 bg-white/95 backdrop-blur-md z-[100]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* LOGO */}
          <Link href="/"><img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto" /></Link>
          {/* Botão Hambúrguer Mobile */}
          <button onClick={toggleMenu} className="lg:hidden text-3xl text-orange-600 relative z-[110]">
            <i className={isMenuOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
          </button>
          {/* NAVEGAÇÃO DESKTOP */}
          <nav className="hidden md:flex space-x-6 text-[10px] font-bold uppercase tracking-widest items-center">
            <Link href="#produtos" className="hover:text-orange-600 transition-colors">Produtos</Link>
            <Link href="#nossa-historia" className="hover:text-orange-600 transition-colors">Nossa História</Link>
            <Link href="#guia-gratuito" className="hover:text-orange-600 transition-colors">Guia Gratuito</Link>
            <Link href="/loja" className="text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all">LOJA LIFESTYLE</Link>
            <button onClick={() => setIsModalOpen(true)} className="bg-orange-600 text-white px-8 py-4 font-black uppercase tracking-widest text-xs shadow-lg hover:scale-105 transition-all">Pedir Agora</button>
          </nav>

         {/* NAVEGAÇÃO MOBILE */}     
          <nav className="hidden lg:flex space-x-6 text-[10px] font-bold uppercase tracking-widest items-center">
            <Link href="#produtos" className="hover:text-orange-600 transition-colors">Produtos</Link>
            <Link href="#nossa-historia" className="hover:text-orange-600 transition-colors">Nossa História</Link>
            <Link href="#guia-gratuito" className="hover:text-orange-600 transition-colors">Guia Gratuito</Link>
            <Link href="/loja" className="text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all">LOJA LIFESTYLE</Link>
            <button onClick={() => setIsModalOpen(true)} className="bg-orange-600 text-white px-8 py-4 font-black uppercase tracking-widest text-xs shadow-lg hover:scale-105 transition-all">Pedir Agora</button>
          </nav>
        </div>

        {/* ESTRUTURA DO MENU MOBILE (DIREITA PARA ESQUERDA) */}
        <div className={`fixed inset-0 z-[1000] lg:hidden transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
          {/* Fundo Escuro (Overlay) */}
          <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={toggleMenu}></div>
          
          {/* Painel do Menu Lateral */}
          <nav className={`absolute top-0 right-0 h-screen w-screen bg-white transition-transform duration-500 ease-in-out shadow-2xl flex flex-col z-[1001] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            
            {/* Cabeçalho do Menu com Botão X alinhado à Direita */}
            <div className="flex justify-end px-6 py-4 border-b border-gray-100">
              <button onClick={toggleMenu} className="text-3xl text-orange-600 p-1">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            {/* Links de Navegação */}
            <div className="flex flex-col p-10 px-20 space-y-[-2] overflow-y-auto bg-white">
              <Link href="#produtos" onClick={toggleMenu} className="text-xl font-black uppercase italic tracking-tighter text-[#2D3134] hover:text-orange-600 transition-colors flex items-center justify-between border-b border-gray-50 pb-4">
                Produtos <i className="bi bi-chevron-right text-orange-600/30"></i></Link>
              <Link href="#nossa-historia" onClick={toggleMenu} className="text-xl font-black uppercase italic tracking-tighter text-[#2D3134] hover:text-orange-600 transition-colors flex items-center justify-between border-b border-gray-50 pb-4">
                História <i className="bi bi-chevron-right text-orange-600/30"></i></Link>
              <Link href="#depoimentos" onClick={toggleMenu} className="text-xl font-black uppercase italic tracking-tighter text-[#2D3134] hover:text-orange-600 transition-colors flex items-center justify-between border-b border-gray-50 pb-4">
                Depoimentos <i className="bi bi-chevron-right text-orange-600/30"></i></Link>
              <Link href="#guia-gratuito" onClick={toggleMenu} className="text-xl font-black uppercase italic tracking-tighter text-[#2D3134] hover:text-orange-600 transition-colors flex items-center justify-between border-b border-gray-50 pb-4">
                Guia Grátis <i className="bi bi-chevron-right text-orange-600/30"></i></Link>
              
              {/* Item Loja Lifestyle com aumento de escala leve no toque/hover */}
              <Link href="/loja" onClick={toggleMenu} 
                className="text-xl font-black uppercase italic tracking-tighter py-4 text-orange-600 flex items-center justify-between transition-transform duration-300 active:scale-110 hover:scale-110 origin-left">
                Loja Lifestyle </Link>
              <button onClick={() => { setIsModalOpen(true); toggleMenu(); }}
                className="w-full bg-orange-600 text-white text-[23px] py-4 font-black uppercase tracking-widest leading-none hover:text-gray-100 text-xs shadow-xl transition-transform duration-500 origin-left mb-4">
                Pedir Agora
              </button>
            </div>

            {/* Footer do Menu */}
            <div className="flex justify-center items-center gap-8">
              <Link href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-3xl hover:text-orange-600"><i className="bi bi-instagram"></i></Link>
              <Link href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-3xl hover:text-orange-600"><i className="bi bi-facebook"></i></Link>
              <Link href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-3xl hover:text-orange-600"><i className="bi bi-youtube"></i></Link>
            </div>
              <p className="text-center text-[9px] py-10 font-bold text-gray-400 uppercase tracking-widest italic">
               © Pão de Queijo da Irá
              </p>           
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative py-12 md:py-20 px-6 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
              O sabor caseiro que faz sua casa <span className="text-orange-600 italic">sorrir.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto md:mx-0">Pão de Queijo de Verdade, Congelado Para Facilitar a Sua Vida. Peça e Surpreenda-se!</p>
            <button onClick={() => setIsModalOpen(true)} className="bg-orange-600 text-white px-10 py-5 font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-xl">
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
        <h2 className="text-center text-3xl md:text-4xl font-black uppercase tracking-tighter mb-16 italic">🧀 Nossos Pacotes: Sabor Congelado!</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="border-4 border-black p-8 flex flex-col items-center text-center group hover:bg-black hover:text-white transition-all">
            <img src="/imagens/imagem-embalagem-20und.png" className="h-48 md:h-64 object-contain mb-6 grayscale group-hover:grayscale-0 transition-all" />
            <h3 className="text-2xl font-black uppercase">20 Unidades</h3>
            <span className="text-3xl font-black my-4">R$ 10,00</span>
            <button onClick={() => setIsModalOpen(true)} className="w-full bg-orange-600 text-white py-4 font-bold uppercase hover:bg-white hover:text-orange-600 transition-colors">Comprar 20 Und</button>
          </div>
          <div className="border-4 border-orange-600 p-8 flex flex-col items-center text-center bg-orange-50 group hover:bg-orange-600 hover:text-white transition-all">
            <img src="/imagens/imagem-embalagem-1kg.png" className="h-48 md:h-64 object-contain mb-6 transition-all" />
            <h3 className="text-2xl font-black uppercase">Pacote de 1 KG</h3>
            <span className="text-3xl font-black my-4">R$ 25,00</span>
            <button onClick={() => setIsModalOpen(true)} className="w-full bg-black text-white py-4 font-bold uppercase hover:bg-white hover:text-black transition-colors">Comprar 1 KG</button>
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
            <Link href="https://g.page/r/Ca9UJok_gMntEBI/review" target="_blank" className="inline-block mt-8 border-b-2 border-orange-600 pb-1 font-bold text-sm uppercase tracking-widest text-orange-600">⭐ Confira nossas avaliações no Google</Link>
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

      {/* SEÇÃO GUIA GRATUITO - IDENTIDADE VISUAL COMPLETA */}
      <section id="guia-gratuito" className="bg-[#2D3134] text-white py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* LADO ESQUERDO: IMAGEM/ISCA */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-orange-600/20 rounded-full blur-3xl group-hover:bg-orange-600/30 transition-all duration-700"></div>
            <img
              src="/imagens/caneca-isca.png"
              alt="Guia Harmonização"
              className="relative rounded-3xl shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500 z-10 w-full object-cover"
            />
            {/* Selo Flutuante */}
            <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-6 rounded-full font-black text-xs uppercase tracking-tighter leading-none shadow-2xl z-20 animate-bounce">
              Grátis<br />PDF
            </div>
          </div>

          {/* LADO DIREITO: FORMULÁRIO */}
          <div className="flex flex-col">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-4">
              Conteúdo Exclusivo
            </h2>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6 italic">
              Aprenda a arte da <br /> <span className="text-orange-600">harmonização.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-md">
              Baixe nosso guia gratuito e descubra quais cafés e acompanhamentos combinam perfeitamente com o seu pão de queijo.
            </p>

            {/* BAIXAR GUIA GRATUITO */}
            <Link href={LINK_BAIXAR_GUIA} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center bg-orange-600 hover:bg-white hover:text-black py-6 text-[11px] font-[900] uppercase tracking-[0.3em] transition-all duration-500 shadow-xl">
              Baixar meu Guia Gratuito agora!
            </Link>

            <p className="text-[9px] text-gray-500 uppercase tracking-widest text-center mt-4">
              Prometemos não enviar spam. Você pode sair da lista a qualquer momento.</p>

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
            <span className="text-#B4B4B4">COMECE SEU NEGÓCIO!</span>
          </h2>

          <p className="text-lg md:text-xl font-medium opacity-95 mb-12 leading-relaxed drop-shadow">
            Aprenda a fazer e como vender pão de queijo com sucesso. Descubra os segredos por trás da
            Receita Secreta do Pão de Queijo da Irá. Aprenda a preparar o petisco mais amado do Brasil
            e transforme-o em um negócio lucrativo. Adquira o curso agora e inicie sua jornada para
            se tornar um mestre na arte de fazer e vender pão de queijo.</p>

          {/* CURSO NA HOME */}
          <Link href="/curso" target="_blank"
            className="inline-block bg-black text-white px-12 py-6 font-black uppercase tracking-widest text-sm hover:bg-white hover:text-orange-600 transition-all shadow-2xl"
          >EU QUERO A RECEITA SECRETA!</Link>
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

      {/* FOOTER */}
      <footer className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:justify-between mb-16">
            {/* COLUNA 1: LOGO E REDES SOCIAIS */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              {/* LOGO */}
              <Link href="/">
                <img src="/logo-paodequeijodaira.jpg" className="h-20 cursor-pointer" alt="Logo" />
              </Link>
              {/* REDES SOCIAIS */}
              <div className="flex gap-4">
                <Link href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-instagram"></i></Link>
                <Link href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-facebook"></i></Link>
                <Link href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600 transition-colors"><i className="bi bi-youtube"></i></Link>
              </div>
            </div>
            {/* COLUNA 2: FUNCIONAMENTO & LOCALIZAÇÃO */}
            <div className="text-center md:text-left space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Funcionamento & Retirada</h4>
              <div className="flex items-start justify-center md:justify-start gap-3">
                <i className="bi bi-clock text-orange-600 text-lg"></i>
                <p className="text-sm text-gray-600 leading-tight">Seg a Sáb: 08:00 às 18:00<br />Dom: 08:00 às 12:00</p>
              </div>
              <div className="pt-2">
                <Link href="https://maps.app.goo.gl/oGCHp5i9y8HnPutg9" target="_blank" className="flex items-start justify-center md:justify-start gap-3 group">
                  <i className="bi bi-geo-alt text-orange-600 text-lg mt-0.5"></i>        
                  <p className="text-sm text-gray-600 leading-relaxed text-left">
                    Quadra 4 Lote 26 Condomínio Flores do Cerrado II. Recreio Mossoró - Cidade Ocidental-GO</p>
                </Link>
              </div>
            </div>
            {/* COLUNA 3: INSTITUCIONAL & DIREITOS */}
            <div className="text-center md:text-right space-y-4 flex flex-col items-center md:items-end">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Institucional</h4>
              <h3 className="text-[14px] text-base font-black pt-3 uppercase mb-1 italic tracking-tighter whitespace-nowrap">Pão de Queijo da Irá</h3>    
              <div className="flex flex-row items-center justify-center md:justify-end gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">
                <Link href="/termos" className="hover:text-black flex items-center gap-1 transition-colors group">
                  Termos de Uso <i className="bi bi-file-text group-hover:text-orange-600"></i>
                </Link>
                <span className="text-gray-200">|</span>
                <Link href="/privacidade" className="hover:text-black flex items-center gap-1 transition-colors group">
                  Privacidade <i className="bi bi-shield-check group-hover:text-orange-600"></i>
                </Link>
              </div> 
              <p className="text-[9px] pt-2 font-bold text-gray-300 uppercase tracking-widest whitespace-nowrap">© 2026 - Todos os direitos reservados.</p>
            </div>
          </div>
          {/* ASSINATURA */}
          <div className="pt-8 border-t border-gray-50 text-center">
            <Link href="https://sjrpovoas.vercel.app" target="_blank" className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300 hover:text-orange-600 transition-all">Desenvolvido por SjrPovoaS</Link>
          </div>
        </div>
      </footer>

      {/* BOTÃO VOLTAR AO TOPO */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 z-[90] bg-orange-600 text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:bg-black hover:scale-110 active:scale-90 animate-bounce">
          <i className="bi bi-arrow-up"></i>
        </button>
      )}

      <style jsx global>
        {`@keyframes slide-left { from { transform: translateX(100%); } to { transform: translateX(0); } }
          @keyframes slide-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
          .animate-slide-left { animation: slide-left 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
          .animate-slide-right { animation: slide-right 0.4s cubic-bezier(0.16, 1, 0.3, 1); }`}
      </style>

    </div>
  );
}
