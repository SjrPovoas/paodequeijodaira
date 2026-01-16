import React, { useState, useEffect } from 'react'; // Corrigido: Importado useEffect
import Head from 'next/head';

export default function Termos() {
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
                <title>Termos de Uso | Pão de Queijo da Irá</title>
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

                {/* MENU MOBILE ALINHADO DO TOPO */}
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

            {/* CONTEÚDO DOS TERMOS */}
            <main className="py-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 italic leading-none text-black">
                    Termos de <span className="text-orange-600">Serviço</span>
                </h1>

                <div className="prose prose-orange max-w-none text-gray-600 leading-relaxed space-y-10">

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
                            <span className="text-orange-600">01.</span> Aceitação dos Termos
                        </h2>
                        <p>
                            Ao acessar ao site <a href="https://paodequeijodaira.vercel.app" className="text-orange-600 font-bold">Pão de Queijo da Irá</a>, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
                            <span className="text-orange-600">02.</span> Licença de Uso
                        </h2>
                        <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site apenas para visualização transitória pessoal e não comercial.</p>
                        <p className="font-bold text-black mt-4">Sob esta licença, você não pode:</p>
                        <ul className="list-none space-y-2 border-l-2 border-orange-600 pl-4 my-4 italic">
                            <li>• Modificar ou copiar os materiais;</li>
                            <li>• Usar os materiais para qualquer finalidade comercial;</li>
                            <li>• Tentar descompilar ou fazer engenharia reversa de qualquer software;</li>
                            <li>• Remover quaisquer direitos autorais dos materiais;</li>
                            <li>• Transferir os materiais para outra pessoa ou 'espelhar' os materiais em outro servidor.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
                            <span className="text-orange-600">03.</span> Isenção de Responsabilidade
                        </h2>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <p className="mb-4">Os materiais no site da Pão de Queijo da Irá são fornecidos 'como estão'. O Pão de Queijo da Irá não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias.</p>
                            <p>Além disso, não garantimos a precisão ou confiabilidade do uso dos materiais em nosso site ou em sites vinculados.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
                            <span className="text-orange-600">04.</span> Limitações
                        </h2>
                        <p>Em nenhum caso o Pão de Queijo da Irá ou seus fornecedores serão responsáveis por quaisquer danos (incluindo perda de dados ou lucro) decorrentes do uso ou da incapacidade de usar os materiais, mesmo que tenhamos sido notificados da possibilidade de tais danos.</p>
                    </section>

                    <section className="bg-orange-50 p-8 rounded-3xl border-2 border-orange-100">
                        <h3 className="text-xl font-black uppercase text-orange-600 mb-2">Modificações</h3>
                        <p className="text-sm">O Pão de Queijo da Irá pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.</p>

                        <h3 className="text-xl font-black uppercase text-orange-600 mt-6 mb-2">Lei Aplicável</h3>
                        <p className="text-sm text-black font-bold italic">Estes termos e condições são regidos e interpretados de acordo com as leis locais e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquela localidade.</p>
                    </section>

                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-12 border-t pt-8 text-center">
                        Última atualização: 15 de Janeiro de 2026.
                    </p>
                </div>
            </main>

            {/* FOOTER FIEL */}
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
                            <h3 className="text-lg font-black uppercase tracking-tighter mb-2 italic">Pão de Queijo da Irá</h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© 2026 - Todos os direitos reservados.</p>
                            <div className="mt-4 flex justify-center md:justify-end gap-4 text-[10px] font-black text-gray-400 uppercase">
                                <a href="#" className="text-orange-600">Termos de Uso</a>
                                <span>|</span>
                                <a href="/privacidade" className="hover:text-black">Privacidade</a>
                            </div>
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
