import Head from 'next/head';
import Link from 'next/link';

export default function Sucesso() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Head><title>Pedido Confirmado! | Pão de Queijo da Irá</title></Head>
      
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-black text-green-600 mb-2">Pedido Recebido!</h1>
        <p className="text-gray-600 mb-6">
          Obrigado por apoiar o Pão de Queijo da Irá. Você receberá os detalhes da entrega por e-mail em breve.
        </p>
        
        <div className="bg-green-50 p-4 rounded-2xl mb-8">
          <p className="text-sm text-green-800 font-medium">
            Se você pagou via POL (Cripto), a confirmação pode levar alguns minutos dependendo da rede Polygon.
          </p>
        </div>

        <Link href="/loja" className="block w-full py-4 bg-black text-white rounded-xl font-bold hover:opacity-90 transition">
          Voltar para a Loja
        </Link>
      </div>
    </div>
  );
}
