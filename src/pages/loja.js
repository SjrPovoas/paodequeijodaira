import { useState } from 'react';
import Head from 'next/head';
import Frete from '../components/Frete'; // Componente que criamos anteriormente
import { useRouter } from 'next/router';

export default function Loja() {
  const router = useRouter();
  
  // Lista de Produtos (Pode vir do Supabase no futuro)
  const produtos = [
    { id: 1, nome: 'Camiseta Pão de Queijo da Irá', preco: 89.90, img: '/camiseta.jpg' },
    { id: 2, nome: 'Caneca Exclusiva Sabor Caseiro', preco: 45.00, img: '/caneca.jpg' },
    { id: 3, nome: 'Avental Profissional da Irá', preco: 120.00, img: '/avental.jpg' },
  ];

  const [carrinho, setCarrinho] = useState([]);
  const [valorFrete, setValorFrete] = useState(0);
  const [dadosFrete, setDadosFrete] = useState(null);

  // Adicionar ao carrinho
  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
  };

  const subtotal = carrinho.reduce((acc, item) => acc + item.preco, 0);

  // Função para ir ao checkout levando os dados
  const irParaCheckout = () => {
    // Salvamos temporariamente no localStorage para o Checkout ler
    localStorage.setItem('carrinho_ira', JSON.stringify({
      itens: carrinho,
      subtotal: subtotal,
      frete: valorFrete,
      total: subtotal + valorFrete,
      endereco: dadosFrete
    }));
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Loja Oficial | Pão de Queijo da Irá</title>
        <meta name="description" content="Garanta os produtos exclusivos da Irá: Camisetas, Canecas e mais." />
      </Head>

      <main className="max-w-6xl mx-auto p-6">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-black text-orange-600 uppercase tracking-tighter">
            Nossa Loja 🛍️
          </h1>
          <p className="text-gray-500">Leve o sabor e o estilo da Irá para sua casa.</p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {/* LISTA DE PRODUTOS */}
          <section className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {produtos.map((prod) => (
              <div key={prod.id} className="border rounded-3xl p-4 hover:shadow-xl transition">
                <div className="bg-gray-100 h-64 rounded-2xl mb-4 flex items-center justify-center">
                   {/* <img src={prod.img} alt={prod.nome} className="max-h-full" /> */}
                   <span className="text-gray-400">Imagem do Produto</span>
                </div>
                <h3 className="font-bold text-lg">{prod.nome}</h3>
                <p className="text-orange-600 font-black text-xl mb-4">R$ {prod.preco.toFixed(2)}</p>
                <button 
                  onClick={() => adicionarAoCarrinho(prod)}
                  className="w-full bg-black text-white py-3 rounded-xl font-bold hover:scale-105 transition"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            ))}
          </section>

          {/* RESUMO DO CARRINHO (Lado Direito) */}
          <aside className="bg-gray-50 p-6 rounded-3xl border border-gray-100 h-fit sticky top-6">
            <h2 className="text-xl font-bold mb-4">Seu Carrinho</h2>
            
            {carrinho.length === 0 ? (
              <p className="text-gray-400 italic">O carrinho está vazio.</p>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {carrinho.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>1x {item.nome}</span>
                      <span className="font-bold">R$ {item.preco.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <hr className="mb-6" />

                <Frete onFreteCalculado={(dados) => {
                  setValorFrete(dados.valor);
                  setDadosFrete(dados);
                }} />

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Frete:</span>
                    <span>{valorFrete > 0 ? `R$ ${valorFrete.toFixed(2)}` : 'A calcular'}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black pt-2 border-t">
                    <span>Total:</span>
                    <span>R$ {(subtotal + valorFrete).toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={irParaCheckout}
                  disabled={carrinho.length === 0 || valorFrete === 0}
                  className="w-full mt-6 bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 disabled:bg-gray-300 transition"
                >
                  Finalizar Compra
                </button>
              </>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
  }
