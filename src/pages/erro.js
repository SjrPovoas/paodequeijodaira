import Link from 'next/link';

export default function Erro() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-red-600 mb-2">Ops! Algo deu errado.</h1>
        <p className="text-gray-600 mb-8">
          Não conseguimos processar seu pagamento. Pode ser o limite do cartão ou instabilidade na rede.
        </p>
        
        <div className="space-y-3">
          <Link href="/checkout" className="block w-full py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition">
            Tentar Novamente
          </Link>
          <Link href="/loja" className="block w-full py-4 text-gray-500 font-medium">
            Cancelar e voltar à loja
          </Link>
        </div>
      </div>
    </div>
  );
}
