import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import BotaoPagamentoWeb3 from '../components/BotaoPagamentoWeb3';

export default function Loja() {
  const LINK_LISTA_ESPERA = "https://43782b7b.sibforms.com/serve/MUIFAC4AxTEnI80RImF7seW5i2MRkz5EqdqtMse22-stmvG7jsOqdFhZ6mmpfwRA-2skU_c3GJF8YXD6k-K_kNE6_gFeWIFbCIxIEWpknHGH8m6tdQMhTuqNG7-e_tsEQRBC4-pjosH0TVoqcW1UonSiJnd2E378zedWIJRs_Dhj9R9v8_VCpmg9Kebo_wFD_WsvLIPqwRBVBCNh8w==";
  const VALOR_FRETE_GRATIS = 500;

  // ESTADOS
  const [carrinho, setCarrinho] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [dados, setDados] = useState({ email: '', cpf: '', cep: '', endereco: '' });
  const [frete, setFrete] = useState(0);

  // CÁLCULOS
  const subtotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  const totalGeral = subtotal + frete;

  // MONITORAR SCROLL PARA BOTÃO VOLTAR AO TOPO
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // LÓGICA DE FRETE
  useEffect(() => {
    if (subtotal === 0 || subtotal >= VALOR_FRETE_GRATIS) {
      setFrete(0);
      return;
    }
    if (dados.cep.length === 8) {
      const regiao = dados.cep.substring(0, 2);
      setFrete(["70", "71", "72", "73"].includes(regiao) ? 25 : 50);
    }
  }, [subtotal, dados.cep]);

  const handleCEP = async (v) => {
    const cep = v.replace(/\D/g, '').substring(0, 8);
    setDados({ ...dados, cep });
    if (cep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const json = await res.json();
        if (!json.erro) {
          setDados(d => ({ ...d, endereco: `${json.logradouro}, ${json.bairro} - ${json.localidade}/${json.uf}` }));
        }
      } catch (e) { console.error("Erro CEP"); }
    }
  };

  // FUNÇÃO ADD CORRIGIDA COM VALIDAÇÃO DE TAMANHO
  const add = (p, tamanhoSelecionado = null) => {
    // Verificar se é uma camiseta e se o tamanho foi selecionado
    if (p.category === 'vestuario' && !tamanhoSelecionado) {
      alert('⚠️ Por favor, selecione um tamanho: P, M, G ou GG');
      return; // Interrompe a execução
    }
    
    // Criar o item com tamanho (se aplicável)
    const itemParaAdicionar = tamanhoSelecionado 
      ? { ...p, tamanho: tamanhoSelecionado }
      : p;
    
    // Verificar se já existe no carrinho (considerando o tamanho para camisetas)
    const existe = carrinho.find(item => 
      item.id === p.id && 
      (p.category === 'vestuario' ? item.tamanho === tamanhoSelecionado : true)
    );
    
    if (existe) {
      setCarrinho(carrinho.map(item => 
        item.id === p.id && (p.category === 'vestuario' ? item.tamanho === tamanhoSelecionado : true)
          ? { ...existe, quantidade: existe.quantidade + 1 } 
          : item
      ));
    } else {
      setCarrinho([...carrinho, { ...itemParaAdicionar, quantidade: 1 }]);
    }
    
    setModalAberto(true);
  };

  const iniciarCheckoutMP = async () => {
    if (!dados.email || !dados.cpf || !dados.endereco || dados.cep.length < 8) {
      return alert("Preencha todos os dados de entrega corretamente!");
    }
    if (carrinho.length === 0) return alert("Carrinho vazio!");

    setLoading(true);
    // Salva no Supabase
    const { error } = await supabase.from('pedidos').insert([{
      email: dados.email, cpf: dados.cpf, cep: dados.cep,
      endereco: dados.endereco, total_geral: totalGeral,
      frete, itens: carrinho, metodo_pagamento: 'Mercado Pago', status: 'pendente'
    }]);

    if (!error) {
      try {
        const res = await fetch('/api/checkout-mp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itens: carrinho, email: dados.email, frete })
        });
        const data = await res.json();
        if (data.init_point) window.location.href = data.init_point;
      } catch (err) { alert("Erro ao conectar com Mercado Pago."); }
    } else {
      alert("Erro ao registrar pedido no banco de dados.");
    }
    setLoading(false);
  };

  const produtos = [
    { id: 1, nome: 'T-Shirt Logo Pão de Queijo da Irá (Masc)', preco: 110, img: '/imagens/camiseta1.png', category: 'vestuario' },
    { id: 2, nome: 'T-Shirt Logo Pão de Queijo da Irá (Fem)', preco: 110, img: '/imagens/camiseta2.png', category: 'vestuario' },
    { id: 3, nome: 'Avental de Lona Pão de Queijo da Irá', preco: 85, img: '/imagens/avental.png', category: 'acessorios' },
    { id: 4, nome: 'Caneca Cerâmica Fosca do Pão de Queijo da Irá', preco: 42, img: '/imagens/caneca.png', category: 'acessorios' },
  ];

  return (
    <div className="relative min-h-screen bg-white font-sans text-black overflow-x-hidden">
      <Head>
        <title>Loja Lifestyle | Pão de Queijo da Irá</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
      </Head>

      <div className="bg-orange-600 text-white py-2 text-center text-[10px] font-black uppercase tracking-widest sticky top-0 z-[60]">
         • Entrega em todo Brasil • Frete Grátis acima de R$ 500,00 •
      </div>

      <header className="border-b border-gray-100 py-4 px-6 sticky top-[28px] bg-white/95 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/"><img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto" /></a>
          <nav className="hidden md:flex space-x-8 text-[10px] font-bold uppercase tracking-widest items-center">
            <a href="#web3" className="hover:text-orange-600 transition-colors">IRÁ DIGITAL GENESIS PASS</a>
            <a href="/" className="text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all">COMPRAR PÃO DE QUEIJO</a>
            <button onClick={() => setModalAberto(true)} className="flex items-center gap-2 bg-[#3D2B1F] text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors">
              <span className="text-[10px] font-black uppercase">Carrinho</span>
              <span className="text-xs font-bold border-l border-white/20 pl-2">{carrinho.length}</span>
            </button>
          </nav>
          <div className="flex md:hidden items-center gap-4">
            <button onClick={() => setModalAberto(true)} className="relative p-2">
              <i className="bi bi-bag text-2xl"></i>
              {carrinho.length > 0 && <span className="absolute top-0 right-0 bg-orange-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{carrinho.length}</span>}
            </button>
            <button onClick={() => setMenuMobileAberto(true)} className="p-2"><i className="bi bi-list text-3xl"></i></button>
          </div>
        </div>
      </header>

      {menuMobileAberto && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setMenuMobileAberto(false)} />
          <nav className="relative w-full bg-white h-auto p-10 flex flex-col space-y-8 text-center animate-slide-down shadow-2xl">
            <button onClick={() => setMenuMobileAberto(false)} className="absolute top-6 right-6 text-3xl"><i className="bi bi-x-lg"></i></button>
            <a href="#web3" onClick={() => setMenuMobileAberto(false)} className="text-sm font-black uppercase tracking-[0.2em]">IRÁ DIGITAL GENESIS PASS</a>
            <a href="/" className="text-sm font-black uppercase tracking-[0.2em] text-orange-600">COMPRAR PÃO DE QUEIJO</a>
            <div className="flex justify-center items-center gap-4 pt-2">
                <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-instagram"></i></a>
                <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-facebook"></i></a>
                <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-youtube"></i></a>
            </div>
          </nav>
        </div>
      )}

      <main className="max-w-6xl mx-auto py-12 px-6">
        <header className="py-20 border-b border-orange-100 mb-16">
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">Lifestyle &<br />Acessórios</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-y-24">
          {produtos.map(p => (
            <div key={p.id} className="group flex flex-col h-full">
              <div className="aspect-[4/5] bg-white border border-gray-100 rounded-sm overflow-hidden mb-6">
                <img src={p.img} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700" alt={p.nome} />
              </div>
              <h3 className="font-black uppercase text-sm tracking-widest mb-1">{p.nome}</h3>
              <p className="text-orange-600 font-bold mb-6 italic">R$ {p.preco.toFixed(2)}</p>
              
              {/* SELETOR DE TAMANHO PARA VESTUÁRIO */}
              {p.category === 'vestuario' && (
                <div className="mb-6">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-3 text-gray-600">Selecione o tamanho:</p>
                  <div className="flex gap-2">
                    {['P', 'M', 'G', 'GG'].map(s => (
                      <button 
                        key={s} 
                        onClick={() => {
                          setSelectedSizes({ ...selectedSizes, [p.id]: s });
                          add(p, s);
                        }}
                        className={`w-12 h-12 border-2 font-black text-xs transition-all hover:scale-105 ${
                          selectedSizes[p.id] === s 
                            ? 'border-orange-600 bg-orange-600 text-white shadow-lg' 
                            : 'border-gray-300 hover:border-orange-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* BOTÃO NORMAL PARA ACESSÓRIOS */}
              {p.category !== 'vestuario' && (
                <button 
                  onClick={() => add(p)} 
                  className="mt-auto w-full py-5 border-2 border-[#3D2B1F] font-black uppercase text-[10px] tracking-widest hover:bg-[#3D2B1F] hover:text-white transition-all"
                >
                  Adicionar ao Carrinho
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* WEB3 SECTION */}
      <section id="web3" className="py-24 px-6 md:px-12 bg-[#2D3134] text-white relative overflow-hidden">
        <div className="max-w-4xl relative z-10 mx-auto md:mx-0">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4 italic">
            IRÁ Digital <br /> <span className="outline-text" style={{ WebkitTextStroke: '1px white', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Genesis Pass</span>
          </h2>
          <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[12px] mb-12">
            (Genesis Pass): Os Benefícios na sua carteira digital.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
            <div className="space-y-8">
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Golden Discount</h4>
                <p className="text-gray-300 text-xs leading-relaxed">10% de desconto fixo em todos os itens da loja.</p>
              </div>
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Early Access</h4>
                <p className="text-gray-300 text-xs leading-relaxed">Acesso a novas fornadas 24h antes do público geral.</p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Ira's Secret Club</h4>
                <p className="text-gray-300 text-xs leading-relaxed">Acesso a um grupo fechado com receitas exclusivas.</p>
              </div>
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Physical Gift</h4>
                <p className="text-gray-300 text-xs leading-relaxed">Primeiro holder recebe kit físico exclusivo.</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-start">
            <a href={LINK_LISTA_ESPERA} target="_blank" rel="noopener noreferrer" className="mt-16 inline-block bg-orange-600 text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-orange-500 transition-all shadow-xl">
                Entrar na Lista de Espera
            </a>
          </div>
        </div>
        <div className="absolute top-1/2 right-[-5%] translate-y-[-50%] text-[25vw] font-black opacity-[0.05] select-none text-orange-500 pointer-events-none whitespace-nowrap hidden md:block">
          WEB3
        </div>
      </section>

      {/* FOOTER E ASSINATURA */}
      <footer className="py-20 px-6 bg-white border-t border-gray-100 text-center md:text-left">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="flex flex-col items-center md:items-start">
              <a href="/"><img src="/logo-paodequeijodaira.jpg" className="h-20 mb-6" alt="Logo" /></a>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-instagram"></i></a>
                <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-facebook"></i></a>
                <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-youtube"></i></a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Funcionamento & Retirada</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>Horário:</strong> Seg a Sáb das 08:00 às 18:00.<br />Dom das 08:00 às 12:00.</p>
              <p className="text-sm text-gray-600">
                <strong>Endereço:</strong> Quadra 4 Lote 26 Condomínio Flores do Cerrado II<br />Recreio Mossoró - Cidade Ocidental-GO</p>
            </div>
            <div className="md:text-right">
              <h3 className="text-lg font-black uppercase mb-2">Pão de Queijo da Irá</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© 2026 - Todos os direitos reservados.</p>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-50 text-center">
            <a href="https://sjrpovoas.vercel.app" target="_blank" className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300 hover:text-orange-600 transition-all">Desenvolvido por SjrPovoaS</a>
          </div>
        </div>
      </footer>

      {/* MODAL CARRINHO */}
      {modalAberto && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalAberto(false)} />
          <div className="relative w-full max-w-md bg-[#FFFDF5] h-full shadow-2xl flex flex-col p-6 animate-slide-left">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">Seu Carrinho</h2>
              <button onClick={() => setModalAberto(false)} className="text-[10px] font-black border-b-2 border-black">FECHAR</button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scroll">
              {carrinho.map((item, index) => (
                <div key={`${item.id}-${item.tamanho || ''}-${index}`} className="flex gap-4 mb-6 border-b border-orange-50 pb-6 items-center">
                  <div className="w-16 h-20 bg-white border border-gray-100 rounded overflow-hidden">
                    <img src={item.img} className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[10px] font-black uppercase tracking-widest">{item.nome}</h4>
                    {item.tamanho && <p className="text-[9px] font-bold text-orange-600 mt-1">Tamanho: {item.tamanho}</p>}
                    <p className="text-[10px] font-black mt-2">QTD: {item.quantidade} | R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => setCarrinho(carrinho.filter((_, i) => i !== index))} 
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t-2 border-[#3D2B1F] space-y-4">
              <div className="text-[10px] font-black uppercase">
                <div className="flex justify-between opacity-50"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-orange-600"><span>Frete</span><span>{subtotal >= VALOR_FRETE_GRATIS ? "GRÁTIS" : `R$ ${frete.toFixed(2)}`}</span></div>
                <div className="flex justify-between text-2xl pt-2 italic"><span>Total</span><span>R$ {totalGeral.toFixed(2)}</span></div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="CEP" maxLength="8" value={dados.cep} onChange={e => handleCEP(e.target.value)} className="border p-2 text-xs rounded" />
                <input type="text" placeholder="CPF" value={dados.cpf} onChange={e => setDados({ ...dados, cpf: e.target.value })} className="border p-2 text-xs rounded" />
              </div>
              <input type="text" placeholder="Endereço" value={dados.endereco} readOnly className="w-full border p-2 text-[10px] bg-gray-50" />
              <input type="email" placeholder="E-mail" value={dados.email} onChange={e => setDados({ ...dados, email: e.target.value })} className="w-full border p-2 text-xs rounded" />

              <div className="grid grid-cols-2 gap-2">
                <button onClick={iniciarCheckoutMP} disabled={loading} className="bg-black text-white py-4 font-black uppercase text-[10px] hover:bg-orange-600 transition-all disabled:opacity-50">
                  {loading ? 'Processando...' : 'Cartão ou Pix'}
                </button>
                <BotaoPagamentoWeb3 totalBRL={totalGeral} itens={carrinho} dadosEntrega={dados} />

    const add = (p) => {
    const existe = carrinho.find(item => item.id === p.id);
    if (existe) {
      setCarrinho(carrinho.map(item => item.id === p.id ? { ...existe, quantidade: existe.quantidade + 1 } : item));
    } else {
      setCarrinho([...carrinho, { ...p, quantidade: 1 }]);
    }
    setModalAberto(true);
  };
//Está adicionando o item camiseta sem informar o tamanho. Precisa de um alerta exigindo o preenchimento do tamanho quando for camiseta. Alternativas P M G GG
//Vejo que você precisa adicionar uma validação de tamanho para camisetas. Aqui está o código modificado com essa validação:

    Copyconst add = (p, tamanhoSelecionado = null) => {
    // Verificar se é uma camiseta e se o tamanho foi selecionado
    if (p.tipo === 'camiseta' && !tamanhoSelecionado) {
      alert('Por favor, selecione um tamanho: P, M, G ou GG');
      return; // Interrompe a execução
    }
    
    // Criar o item com tamanho (se aplicável)
    const itemParaAdicionar = tamanhoSelecionado 
      ? { ...p, tamanho: tamanhoSelecionado }
      : p;
    
    // Verificar se já existe no carrinho (considerando o tamanho para camisetas)
    const existe = carrinho.find(item => 
      item.id === p.id && 
      (p.tipo === 'camiseta' ? item.tamanho === tamanhoSelecionado : true)
    );
    
    if (existe) {
      setCarrinho(carrinho.map(item => 
        item.id === p.id && (p.tipo === 'camiseta' ? item.tamanho === tamanhoSelecionado : true)
          ? { ...existe, quantidade: existe.quantidade + 1 } 
          : item
      ));
    } else {
      setCarrinho([...carrinho, { ...itemParaAdicionar, quantidade: 1 }]);
    }
    
    setModalAberto(true);
};
E no componente onde exibe a camiseta, adicione os botões de tamanho:

Copy{produto.tipo === 'camiseta' && (
  <div className="seletor-tamanho">
    <p>Selecione o tamanho:</p>
    <div className="botoes-tamanho">
      <button onClick={() => add(produto, 'P')}>P</button>
      <button onClick={() => add(produto, 'M')}>M</button>
      <button onClick={() => add(produto, 'G')}>G</button>
      <button onClick={() => add(produto, 'GG')}>GG</button>
    </div>
  </div>
)}

{/* Botão normal para outros produtos */}
{produto.tipo !== 'camiseta' && (
  <button onClick={() => add(produto)}>Adicionar ao Carrinho</button>
)}
Alterações principais:

✅ Validação obrigatória: Se for camiseta e não tiver tamanho, mostra alerta e interrompe
✅ Parâmetro de tamanho: A função add agora recebe o tamanho como segundo parâmetro
✅ Identificação única: Camisetas com tamanhos diferentes são tratadas como itens separados no carrinho
✅ Interface clara: Botões individuais para cada tamanho
CSS sugerido para os botões:

Copy.seletor-tamanho {
  margin: 15px 0;
}

.botoes-tamanho {
  display: flex;
  gap: 10px;
}

.botoes-tamanho button {
  padding: 8px 16px;
  border: 2px solid #333;
  background: white;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

.botoes-tamanho button:hover {
  background: #333;
  color: white;
}
Dessa forma, o usuário não consegue adicionar uma camiseta sem escolher o tamanho, e cada combinação de produto + tamanho é tratada independentemente no carrinho! 🛒👕

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import BotaoPagamentoWeb3 from '../components/BotaoPagamentoWeb3';

export default function Loja() {
  const LINK_LISTA_ESPERA = "https://43782b7b.sibforms.com/serve/MUIFAC4AxTEnI80RImF7seW5i2MRkz5EqdqtMse22-stmvG7jsOqdFhZ6mmpfwRA-2skU_c3GJF8YXD6k-K_kNE6_gFeWIFbCIxIEWpknHGH8m6tdQMhTuqNG7-e_tsEQRBC4-pjosH0TVoqcW1UonSiJnd2E378zedWIJRs_Dhj9R9v8_VCpmg9Kebo_wFD_WsvLIPqwRBVBCNh8w==";
  const VALOR_FRETE_GRATIS = 500;

  // ESTADOS
  const [carrinho, setCarrinho] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [dados, setDados] = useState({ email: '', cpf: '', cep: '', endereco: '' });
  const [frete, setFrete] = useState(0);

  // CÁLCULOS
  const subtotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  const totalGeral = subtotal + frete;

  // MONITORAR SCROLL PARA BOTÃO VOLTAR AO TOPO
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // LÓGICA DE FRETE
  useEffect(() => {
    if (subtotal === 0 || subtotal >= VALOR_FRETE_GRATIS) {
      setFrete(0);
      return;
    }
    if (dados.cep.length === 8) {
      const regiao = dados.cep.substring(0, 2);
      setFrete(["70", "71", "72", "73"].includes(regiao) ? 25 : 50);
    }
  }, [subtotal, dados.cep]);

  const handleCEP = async (v) => {
    const cep = v.replace(/\D/g, '').substring(0, 8);
    setDados({ ...dados, cep });
    if (cep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const json = await res.json();
        if (!json.erro) {
          setDados(d => ({ ...d, endereco: `${json.logradouro}, ${json.bairro} - ${json.localidade}/${json.uf}` }));
        }
      } catch (e) { console.error("Erro CEP"); }
    }
  };

  const add = (p) => {
    const existe = carrinho.find(item => item.id === p.id);
    if (existe) {
      setCarrinho(carrinho.map(item => item.id === p.id ? { ...existe, quantidade: existe.quantidade + 1 } : item));
    } else {
      setCarrinho([...carrinho, { ...p, quantidade: 1 }]);
    }
    setModalAberto(true);
  };

  const iniciarCheckoutMP = async () => {
    if (!dados.email || !dados.cpf || !dados.endereco || dados.cep.length < 8) {
      return alert("Preencha todos os dados de entrega corretamente!");
    }
    if (carrinho.length === 0) return alert("Carrinho vazio!");

    setLoading(true);
    // Salva no Supabase
    const { error } = await supabase.from('pedidos').insert([{
      email: dados.email, cpf: dados.cpf, cep: dados.cep,
      endereco: dados.endereco, total_geral: totalGeral,
      frete, itens: carrinho, metodo_pagamento: 'Mercado Pago', status: 'pendente'
    }]);

    if (!error) {
      try {
        const res = await fetch('/api/checkout-mp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itens: carrinho, email: dados.email, frete })
        });
        const data = await res.json();
        if (data.init_point) window.location.href = data.init_point;
      } catch (err) { alert("Erro ao conectar com Mercado Pago."); }
    } else {
      alert("Erro ao registrar pedido no banco de dados.");
    }
    setLoading(false);
  };

  const produtos = [
    { id: 1, nome: 'T-Shirt Logo Pão de Queijo da Irá (Masc)', preco: 110, img: '/imagens/camiseta1.png', category: 'vestuario' },
    { id: 2, nome: 'T-Shirt Logo Pão de Queijo da Irá (Fem)', preco: 110, img: '/imagens/camiseta2.png', category: 'vestuario' },
    { id: 3, nome: 'Avental de Lona Pão de Queijo da Irá', preco: 85, img: '/imagens/avental.png', category: 'acessorios' },
    { id: 4, nome: 'Caneca Cerâmica Fosca do Pão de Queijo da Irá', preco: 42, img: '/imagens/caneca.png', category: 'acessorios' },
  ];

  return (
    <div className="relative min-h-screen bg-white font-sans text-black overflow-x-hidden">
      <Head>
        <title>Loja Lifestyle | Pão de Queijo da Irá</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css" />
      </Head>

      <div className="bg-orange-600 text-white py-2 text-center text-[10px] font-black uppercase tracking-widest sticky top-0 z-[60]">
         • Entrega em todo Brasil • Frete Grátis acima de R$ 500,00 •
      </div>

      <header className="border-b border-gray-100 py-4 px-6 sticky top-[28px] bg-white/95 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/"><img src="/logo-paodequeijodaira.jpg" alt="Logo" className="h-12 md:h-16 w-auto" /></a>
          <nav className="hidden md:flex space-x-8 text-[10px] font-bold uppercase tracking-widest items-center">
            <a href="#web3" className="hover:text-orange-600 transition-colors">IRÁ DIGITAL GENESIS PASS</a>
            <a href="/" className="text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all">COMPRAR PÃO DE QUEIJO</a>
            <button onClick={() => setModalAberto(true)} className="flex items-center gap-2 bg-[#3D2B1F] text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors">
              <span className="text-[10px] font-black uppercase">Carrinho</span>
              <span className="text-xs font-bold border-l border-white/20 pl-2">{carrinho.length}</span>
            </button>
          </nav>
          <div className="flex md:hidden items-center gap-4">
            <button onClick={() => setModalAberto(true)} className="relative p-2">
              <i className="bi bi-bag text-2xl"></i>
              {carrinho.length > 0 && <span className="absolute top-0 right-0 bg-orange-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{carrinho.length}</span>}
            </button>
            <button onClick={() => setMenuMobileAberto(true)} className="p-2"><i className="bi bi-list text-3xl"></i></button>
          </div>
        </div>
      </header>

      {menuMobileAberto && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setMenuMobileAberto(false)} />
          <nav className="relative w-full bg-white h-auto p-10 flex flex-col space-y-8 text-center animate-slide-down shadow-2xl">
            <button onClick={() => setMenuMobileAberto(false)} className="absolute top-6 right-6 text-3xl"><i className="bi bi-x-lg"></i></button>
            <a href="#web3" onClick={() => setMenuMobileAberto(false)} className="text-sm font-black uppercase tracking-[0.2em]">IRÁ DIGITAL GENESIS PASS</a>
            <a href="/" className="text-sm font-black uppercase tracking-[0.2em] text-orange-600">COMPRAR PÃO DE QUEIJO</a>
            <div className="flex justify-center items-center gap-4 pt-2">
                <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-instagram"></i></a>
                <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-facebook"></i></a>
                <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-youtube"></i></a>
            </div>
          </nav>
        </div>
      )}

      <main className="max-w-6xl mx-auto py-12 px-6">
        <header className="py-20 border-b border-orange-100 mb-16">
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">Lifestyle &<br />Acessórios</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-y-24">
          {produtos.map(p => (
            <div key={p.id} className="group flex flex-col h-full">
              <div className="aspect-[4/5] bg-white border border-gray-100 rounded-sm overflow-hidden mb-6">
                <img src={p.img} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700" alt={p.nome} />
              </div>
              <h3 className="font-black uppercase text-sm tracking-widest mb-1">{p.nome}</h3>
              <p className="text-orange-600 font-bold mb-6 italic">R$ {p.preco.toFixed(2)}</p>
              {p.category === 'vestuario' && (
                <div className="flex gap-2 mb-6">
                  {['P', 'M', 'G', 'GG'].map(s => (
                    <button key={s} onClick={() => setSelectedSizes({ ...selectedSizes, [p.id]: s })} className={`w-10 h-10 border-2 font-black text-[10px] ${selectedSizes[p.id] === s ? 'border-orange-600 bg-orange-600 text-white' : 'border-gray-200'}`}>{s}</button>
                  ))}
                </div>
              )}
              <button onClick={() => add(p)} className="mt-auto w-full py-5 border-2 border-[#3D2B1F] font-black uppercase text-[10px] tracking-widest hover:bg-[#3D2B1F] hover:text-white transition-all">Adicionar ao Carrinho</button>
            </div>
          ))}
        </div>
      </main>

      {/* WEB3 SECTION */}
      <section id="web3" className="py-24 px-6 md:px-12 bg-[#2D3134] text-white relative overflow-hidden">
        <div className="max-w-4xl relative z-10 mx-auto md:mx-0">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4 italic">
            IRÁ Digital <br /> <span className="outline-text" style={{ WebkitTextStroke: '1px white', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Genesis Pass</span>
          </h2>
          <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[12px] mb-12">
            (Genesis Pass): Os Benefícios na sua carteira digital.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
            <div className="space-y-8">
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Golden Discount</h4>
                <p className="text-gray-300 text-xs leading-relaxed">10% de desconto fixo em todos os itens da loja.</p>
              </div>
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Early Access</h4>
                <p className="text-gray-300 text-xs leading-relaxed">Acesso a novas fornadas 24h antes do público geral.</p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Ira's Secret Club</h4>
                <p className="text-gray-300 text-xs leading-relaxed">Acesso a um grupo fechado com receitas exclusivas.</p>
              </div>
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-2 text-orange-500">Physical Gift</h4>
                <p className="text-gray-300 text-xs leading-relaxed">Primeiro holder recebe kit físico exclusivo.</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-start">
            <a href={LINK_LISTA_ESPERA} target="_blank" rel="noopener noreferrer" className="mt-16 inline-block bg-orange-600 text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-orange-500 transition-all shadow-xl">
                Entrar na Lista de Espera
            </a>
          </div>
        </div>
        <div className="absolute top-1/2 right-[-5%] translate-y-[-50%] text-[25vw] font-black opacity-[0.05] select-none text-orange-500 pointer-events-none whitespace-nowrap hidden md:block">
          WEB3
        </div>
      </section>

      {/* MODAL CARRINHO */}
      {modalAberto && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalAberto(false)} />
          <div className="relative w-full max-w-md bg-[#FFFDF5] h-full shadow-2xl flex flex-col p-6 animate-slide-left">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">Seu Carrinho</h2>
              <button onClick={() => setModalAberto(false)} className="text-[10px] font-black border-b-2 border-black">FECHAR</button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scroll">
              {carrinho.map((item, index) => (
                <div key={`${item.id}-${item.tamanho || ''}-${index}`} className="flex gap-4 mb-6 border-b border-orange-50 pb-6 items-center">
                  <div className="w-16 h-20 bg-white border border-gray-100 rounded overflow-hidden">
                    <img src={item.img} className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[10px] font-black uppercase tracking-widest">{item.nome}</h4>
                    {item.tamanho && <p className="text-[9px] font-bold text-orange-600 mt-1">Tamanho: {item.tamanho}</p>}
                    <p className="text-[10px] font-black mt-2">QTD: {item.quantidade} | R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => setCarrinho(carrinho.filter((_, i) => i !== index))} 
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t-2 border-[#3D2B1F] space-y-4">
              <div className="text-[10px] font-black uppercase">
                <div className="flex justify-between opacity-50"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-orange-600"><span>Frete</span><span>{subtotal >= VALOR_FRETE_GRATIS ? "GRÁTIS" : `R$ ${frete.toFixed(2)}`}</span></div>
                <div className="flex justify-between text-2xl pt-2 italic"><span>Total</span><span>R$ {totalGeral.toFixed(2)}</span></div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="CEP" maxLength="8" value={dados.cep} onChange={e => handleCEP(e.target.value)} className="border p-2 text-xs rounded" />
                <input type="text" placeholder="CPF" value={dados.cpf} onChange={e => setDados({ ...dados, cpf: e.target.value })} className="border p-2 text-xs rounded" />
              </div>
              <input type="text" placeholder="Endereço" value={dados.endereco} readOnly className="w-full border p-2 text-[10px] bg-gray-50" />
              <input type="email" placeholder="E-mail" value={dados.email} onChange={e => setDados({ ...dados, email: e.target.value })} className="w-full border p-2 text-xs rounded" />

              <div className="grid grid-cols-2 gap-2">
                <button onClick={iniciarCheckoutMP} disabled={loading} className="bg-black text-white py-4 font-black uppercase text-[10px] hover:bg-orange-600 transition-all disabled:opacity-50">
                  {loading ? 'Processando...' : 'Cartão ou Pix'}
                </button>
                <BotaoPagamentoWeb3 totalBRL={totalGeral} itens={carrinho} dadosEntrega={dados} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER E ASSINATURA */}
      <footer className="py-20 px-6 bg-white border-t border-gray-100 text-center md:text-left">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="flex flex-col items-center md:items-start">
              <a href="/"><img src="/logo-paodequeijodaira.jpg" className="h-20 mb-6" alt="Logo" /></a>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-instagram"></i></a>
                <a href="https://www.facebook.com/share/1GWWjcK1xr/" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-facebook"></i></a>
                <a href="https://www.youtube.com/@paodequeijodaira" target="_blank" className="text-2xl hover:text-orange-600"><i className="bi bi-youtube"></i></a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Funcionamento & Retirada</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>Horário:</strong> Seg a Sáb das 08:00 às 18:00.<br />Dom das 08:00 às 12:00.</p>
              <p className="text-sm text-gray-600">
                <strong>Endereço:</strong> Quadra 4 Lote 26 Condomínio Flores do Cerrado II<br />Recreio Mossoró - Cidade Ocidental-GO</p>
            </div>
            <div className="md:text-right">
              <h3 className="text-lg font-black uppercase mb-2">Pão de Queijo da Irá</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© 2026 - Todos os direitos reservados.</p>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-50 text-center">
            <a href="https://sjrpovoas.vercel.app" target="_blank" className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300 hover:text-orange-600 transition-all">Desenvolvido por SjrPovoaS</a>
          </div>
        </div>
      </footer>

{/* VOLTAR AO TOPO */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-8 right-8 z-[100] bg-orange-600 text-white w-12 h-12 rounded-full shadow-2xl items-center justify-center transition-all ${showScrollTop ? 'flex opacity-100' : 'hidden opacity-0'}`}><i className="bi bi-arrow-up text-xl"></i></button>

      <style jsx global>{`
        @keyframes slide-left { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slide-down { from { transform: translateY(-100%); } to { transform: translateY(0); } }
        .animate-slide-left { animation: slide-left 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-slide-down { animation: slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .custom-scroll::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
