"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const router = useRouter();

  // Se o usuário já estiver logado, manda direto para Vendas (mais comum que Trocas)
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email === 'sjrpovoas@gmail.com') {
        router.push('/admin/vendas');
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: '', text: '' });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error('Credenciais Inválidas.');

      if (data.user?.email === 'sjrpovoas@gmail.com') {
        setMsg({ type: 'success', text: 'Acesso autorizado!' });
        setTimeout(() => {
          router.push('/admin/vendas');
        }, 800);
      } else {
        await supabase.auth.signOut();
        throw new Error('Você não possui privilégios de administrador.');
      }

    } catch (err) {
      setMsg({ type: 'error', text: err.message });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6 font-sans selection:bg-orange-100">
      <Head>
        <title>Painel Admin | Loja Lifestyle e Acessórios</title>
      </Head>

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        
        {/* CABEÇALHO SOFT */}
        <div className="text-center mb-8">
          <div className="inline-block bg-orange-50 text-orange-600 px-4 py-1 rounded-full mb-6">
             <span className="font-black italic uppercase tracking-widest text-[9px]">Acesso Restrito</span>
          </div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none text-gray-900">
            Painel <span className="text-orange-600">Admin</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-3">Identifique-se para continuar</p>
        </div>

        {/* CARD DE LOGIN SOFT PREMIUM */}
        <div className="bg-white border border-gray-100 p-10 md:p-12 rounded-[50px] shadow-2xl shadow-gray-200/50">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* CAMPO E-MAIL */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">E-mail</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-3xl p-4 font-bold text-gray-700 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all placeholder:text-gray-300"
                placeholder="uauario@provedor.com"
              />
            </div>

            {/* CAMPO SENHA */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Senha</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-3xl p-4 font-bold text-gray-700 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all placeholder:text-gray-300"
                placeholder="••••••••"
              />
            </div>

            {/* MENSAGENS DE STATUS */}
            {msg.text && (
              <div className={`p-4 rounded-2xl font-bold uppercase text-[9px] tracking-widest text-center animate-bounce ${
                msg.type === 'error' 
                ? 'bg-red-50 text-red-500' 
                : 'bg-green-50 text-green-600'
              }`}>
                {msg.text}
              </div>
            )}

            {/* BOTÃO LOGIN SOFT */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black text-white py-5 rounded-3xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-orange-600 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-gray-200 disabled:bg-gray-200"
            >
              {loading ? "Validando..." : "Entrar no Dashboard"}
            </button>
          </form>
        </div>

        {/* FOOTER */}
        <div className="mt-12 text-center">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-300">
              @ Loja Lifestyle e Acessórios | Pão de Queijo da Irá
            </p>
        </div>
      </div>
    </div>
  );
}
