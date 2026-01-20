import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Sucesso() {
  const router = useRouter();
  const { tx, payment_id } = router.query; // Detecta parâmetros da URL

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-black text-orange-600 mb-2">SUCESSO!</h1>

        {tx ? (
          // Mensagem para quem pagou com POL
          <div className="mb-8">
            <p className="text-gray-600 mb-4">Sua transação na Polygon foi enviada!</p>
            <a
              href={`https://polygonscan.com/tx/${tx}`}
              target="_blank"
              className="text-xs bg-purple-100 text-purple-700 px-3 py-2 rounded-lg break-all block"
            >
              Ver comprovante na Blockchain ↗
            </a>
            <div className="bg-orange-200 p-4 rounded-2xl mb-8">
              <p className="text-sm text-orange-600 font-medium">
                Se você pagou via POL (Cripto), a confirmação pode levar alguns minutos dependendo da rede Polygon.
              </p>
            </div>
          </div>
        ) : (
        // Mensagem para quem pagou com Mercado Pago
          <p className="text-gray-600 mb-8">
            Obrigado por apoiar o Pão de Queijo da Irá.<br />Seu pagamento via {payment_id ? 'Mercado Pago' : 'plataforma'} foi confirmado.
          </p>
        )}

        <div className="space-y-4">
          <Link href="/pedidos" 
            className="block w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition">
            Ver Meus Pedidos
          </Link>
          <Link href="/loja" className="block text-sm text-gray-400 font-bold">
            Voltar para o Início
          </Link>
        </div>
      </div>
    </div>
  );
}