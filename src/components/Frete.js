import { useState } from 'react';

export default function Frete({ onFreteCalculado }) {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscarCEP = async () => {
    if (cep.length !== 8) {
      alert("Digite um CEP válido com 8 dígitos.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      if (data.erro) {
        alert("CEP não encontrado.");
        setEndereco(null);
      } else {
        setEndereco(data);
        // Lógica simples de frete: 
        // Se for de SP (ou seu estado), frete R$ 15, senão R$ 30.
        const valorFrete = data.uf === 'GO' ? 15.00 : 35.00;
        onFreteCalculado({ valor: valorFrete, ...data });
      }
    } catch (error) {
      console.error("Erro ao buscar CEP", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-xl bg-gray-50">
      <h3 className="text-lg font-bold mb-2">Calcular Frete</h3>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Digite seu CEP"
          className="border p-2 rounded w-full"
          maxLength="8"
          value={cep}
          onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
        />
        <button
          onClick={buscarCEP}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
        >
          {loading ? '...' : 'Calcular'}
        </button>
      </div>

      {endereco && (
        <p className="mt-2 text-sm text-gray-600">
          📍 {endereco.logradouro}, {endereco.bairro} - {endereco.localidade}/{endereco.uf}
        </p>
      )}
    </div>
  );
}