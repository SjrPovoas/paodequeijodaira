// src/components/Frete.js

import React, { useState, useEffect } from 'react';

export default function Frete({ subtotal, valorFreteGratis, onFreteCalculado, cepInicial, totalGeral, frete, loadingLoja }) {
  const [cep, setCep] = useState(cepInicial || '');
  const [endereco, setEndereco] = useState('');
  const [enderecoRua, setEnderecoRua] = useState(''); // Guarda a rua isolada
  const [cidadeEstado, setCidadeEstado] = useState(''); // Guarda cidade/estado isolados
  const [regiaoCep, setRegiaoCep] = useState('');
  const [loading, setLoading] = useState(false);

  // --- RECALCULO AUTOMÁTICO SE O CARRINHO MUDAR ---
  useEffect(() => {
    if (!regiaoCep) return;

    let novoFrete = 0;
    if (subtotal < valorFreteGratis) {
      novoFrete = ["70", "71", "72", "73"].includes(regiaoCep) ? 10 : 50;
    }

    // ✨ CORRIGIDO: Agora mantém os dados de endereço intactos no recálculo!
    onFreteCalculado({
      frete: novoFrete,
      regiao: regiaoCep,
      endereco_rua: enderecoRua,
      cidade_state: cidadeEstado,
      cep: cep,
      endereco_completo: endereco
    });
  }, [subtotal, regiaoCep, valorFreteGratis]);

  // --- ESCUTA MUDANÇAS EXTERNAS DO CEP ---
  useEffect(() => {
    if (cepInicial && !cep) {
      setCep(cepInicial);
    }
  }, [cepInicial]);

// --- CAPTURA E BUSCA CEP ---
  const handleCEPChange = async (e) => {
    console.log("Usuário digitou:", e.target.value);
    const v = e.target.value.replace(/\D/g, '').substring(0, 8);
    setCep(v);

    if (v.length === 0) {
      handleClear();
      return;
    }

    if (v.length === 8) {
      setLoading(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${v}/json/`);
        const json = await res.json();

        if (json && !json.erro) {
          const endFormatado = `${json.logradouro ? json.logradouro + ', ' : ''}${json.bairro ? json.bairro + ' - ' : ''}`;
          const cidadeEstadoFormatada = `${json.localidade}/${json.uf}`;
          const regiao = v.substring(0, 2);

          const enderecoCompleto = `${endFormatado}${cidadeEstadoFormatada}`;

          // Salva nos estados locais do componente
          setEndereco(enderecoCompleto);
          setEnderecoRua(json.logradouro || '');
          setCidadeEstado(cidadeEstadoFormatada);
          setRegiaoCep(regiao);

          let freteInicial = 0;
          if (subtotal < valorFreteGratis) {
            freteInicial = ["70", "71", "72", "73"].includes(regiao) ? 10 : 50;
          }

          onFreteCalculado({
            frete: freteInicial,
            regiao: regiao,
            endereco_rua: json.logradouro || '',
            cidade_state: cidadeEstadoFormatada,
            cep: v,
            endereco_completo: enderecoCompleto
          });
        } else {
          alert("❌ CEP não encontrado. Por favor, verifique.");
          handleClear();
        }
      } catch (err) {
        console.error("Erro ao buscar CEP:", err);
        handleClear();
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClear = () => {
    setEndereco('');
    setEnderecoRua('');
    setCidadeEstado('');
    setRegiaoCep('');
    setCep('');
    onFreteCalculado({ frete: null, regiao: '', endereco_rua: '', cidade_state: '', cep: '', endereco_completo: '' });
  };

  const isLoading = loading || loadingLoja;

  return (
    <div className="mb-4">
      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
        CÁLCULO DE ENTREGA (INSIRA SEU CEP)
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="00000-000"
          maxLength={8}
          className="w-full bg-gray-50 border-none rounded-xl p-4 font-bold text-xs focus:ring-2 focus:ring-orange-500 outline-none transition-all text-black"
          value={cep}
          onChange={handleCEPChange}
        />
        {isLoading && (
          <div className="absolute right-4 top-4">
            <i className="bi bi-arrow-repeat animate-spin text-orange-600 text-sm"></i>
          </div>
        )}
      </div>

      {endereco && (
        <p className="text-[9px] mt-2 font-bold uppercase text-gray-500 flex items-center gap-1 italic animate-fadeIn">
          <i className="bi bi-geo-alt-fill text-orange-600"></i> {endereco}
        </p>
      )}

      <div className="flex justify-between text-[11px] font-bold text-orange-600 uppercase mb-4 px-1 mt-3">
        <span>Frete:</span>
        <span>
          {frete === null || frete === undefined
            ? 'Insira um CEP válido'
            : frete === 0
              ? 'GRÁTIS'
              : `R$ ${Number(frete).toFixed(2)}`}
        </span>
      </div>

      <div className="border-t border-gray-100 pt-4 space-y-2 px-1 mb-4">
        <div className="flex justify-between text-[11px] font-bold uppercase text-gray-400">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-end pt-2">
          <span className="text-base font-black uppercase text-black">Total</span>
          <span className="text-xl font-black text-black">R$ {totalGeral.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}