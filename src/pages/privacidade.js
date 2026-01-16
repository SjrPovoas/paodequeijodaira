import React, { useState, useEffect } from 'react'; // Corrigido: Importado useEffect
import Head from 'next/head';

export default function Privacidade() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // NOVO: Estado para controlar a visibilidade da seta
  const [showScrollTop, setShowScrollTop] = useState(false);

  // NOVO: Lógica para mostrar a seta após 400px de rolagem (fim do hero)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-[#2D3134] antialiased font-['Inter'] overflow-x-hidden">
      <Head>
        <title>Política de Privacidade | Pão de Queijo da Irá</title>
        <meta name="robots" content="noindex" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lobster&display=swap" rel="stylesheet" />
      </Head>

      {/* HEADER */}
      <header className="border-b border-gray-100 py-4 px-6 sticky top-0 bg-white/95 backdrop-blur-md z-[100]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/"><img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto" /></a>

          <nav className="hidden lg:flex space-x-6 text-[10px] font-bold uppercase tracking-widest items-center">
            <a href="/" className="hover:text-orange-600 transition-colors">Voltar para Home</a>
            <a href="/loja" className="text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all">LOJA LIFESTYLE</a>
            <a href="/" className="bg-orange-600 text-white px-8 py-4 font-black uppercase tracking-widest text-xs shadow-lg">Ir para Home</a>
          </nav>

          <button onClick={toggleMenu} className="lg:hidden text-3xl text-orange-600 z-[110] relative">
            <i className={isMenuOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
          </button>
        </div>

        {/* MENU MOBILE */}
        <div className={`fixed inset-[5] bg-white z-[-89] transition-transform duration-500 ease-in-out lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col bg-white items-center pt-32 space-y-4 text-xl font-black uppercase tracking-tighter italic text-center">
            <a href="/loja" onClick={toggleMenu} className="text-orange-600 hover:scale-110 transition-transform">
              Loja Lifestyle
            </a>
            <a href="/" onClick={toggleMenu} className="bg-orange-600 text-white px-10 py-5 font-black uppercase tracking-widest text-xs not-italic shadow-xl active:scale-95 transition-all">
              Ir para Home
            </a>
          </nav>
        </div>
      </header>

      {/* POLÍTICA DE PRIVACIDADE */}
      <main className="py-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 italic leading-none">
          Política de <span className="text-orange-600">Privacidade</span>
        </h1>

        <div className="prose prose-orange max-w-none text-gray-600 leading-relaxed space-y-8">
          <p>
            A sua privacidade é importante para nós. É política do <strong>Pão de Queijo da Irá</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site
            <a href="https://paodequeijodaira.vercel.app" className="text-orange-600 font-bold ml-1">Pão de Queijo da Irá</a>, e outros sites que possuímos e operamos.
          </p>

          <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</p>

          <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>

          <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>

          <h3 className="text-2xl font-black uppercase tracking-tight text-black mt-12 mb-4">Uso de Cookies e Publicidade</h3>
          <ul className="list-disc pl-6 space-y-4">
            <li>O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.</li>
            <li>Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos.</li>
            <li>Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros.</li>
          </ul>

          <h3 className="text-2xl font-black uppercase tracking-tight text-black mt-12 mb-4">Compromisso do Usuário</h3>
          <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Pão de Queijo da Irá oferece no site e com caráter enunciativo, mas não limitativo:</p>
          <ul className="list-none space-y-4 bg-gray-50 p-6 rounded-2xl border-l-4 border-orange-600">
            <li><strong>A)</strong> Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</li>
            <li><strong>B)</strong> Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</li>
            <li><strong>C)</strong> Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Pão de Queijo da Irá.</li>
          </ul>

          <h3 className="text-2xl font-black uppercase tracking-tight text-black mt-12 mb-4">Mais informações</h3>
          <p>Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados.</p>

          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-12 border-t pt-8">
            Esta política é efetiva a partir de 15 de Janeiro de 2026 17:17.
          </p>
        </div>
      </main>

      {/* FOOTER E ASSINATURA */}
      <footer className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="flex flex-col items-center md:items-start">
              <a href="/"><img src="/logo-paodequeijodaira.jpg" className="h-20 mb-6" alt="Logo" /></a>
              <div className="flex space-x-2">
                <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-instagram"></i></a>
                <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-facebook"></i></a>
                <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-youtube"></i></a>
                <a href="https://maps.app.goo.gl/oGCHp5i9y8HnPutg9" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-geo-alt-fill"></i></a>
              </div>
            </div>
            <div className="text-center md:text-left space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Funcionamento & Retirada</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>Horário:</strong> Seg a Sáb das 08:00 às 18:00.<br />Dom das 08:00 às 12:00.</p>
              <p className="text-sm text-gray-600">
                <strong>Endereço:</strong> Quadra 4 Lote 26 Condomínio Flores do Cerrado II<br />Recreio Mossoró - Cidade Ocidental-GO</p>
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-lg font-black uppercase mb-2">Pão de Queijo da Irá</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© 2026 - Todos os direitos reservados.</p>
              <p className="mt-2 space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <a href="/termos" className="hover:text-black">Termos de Uso</a>
                <span>|</span>
                <a href="#" className="text-orange-600">Privacidade</a></p>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-50 text-center">
            <a href="https://sjrpovoas.vercel.app" target="_blank" className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300 hover:text-orange-600 transition-all">Desenvolvido por SjrPovoaS</a>
          </div>
        </div>
      </footer>

     {/* BOTÃO VOLTAR AO TOPO */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[90] bg-orange-600 text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:bg-black hover:scale-110 active:scale-90 ${
          showScrollTop ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-10 invisible' }`} >
        <i className="bi bi-arrow-up text-xl font-bold"></i>
      </button>
          
    </div>
  );
}
