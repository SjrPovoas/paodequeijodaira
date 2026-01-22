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

  // Se o usuário já estiver logado, manda direto para trocas ao carregar a página
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email === 'sjrpovoas@gmail.com') {
        router.push('/admin/trocas');
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: '', text: '' });

    try {
      // 1. Autenticação no Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error('Credenciais Inválidas. Verifique seu e-mail e senha.');

      // 2. Validação de e-mail administrativo
      if (data.user?.email === 'sjrpovoas@gmail.com') {
        setMsg({ type: 'success', text: 'Autenticado com sucesso! Redirecionando...' });
        
        // Redirecionamento via Router do Next.js (mais estável que window.location)
        setTimeout(() => {
          router.push('/admin/trocas');
        }, 1200);
      } else {
        // Se o e-mail não for o permitido, desconectamos imediatamente
        await supabase.auth.signOut();
        throw new Error('Acesso Negado: Você não possui privilégios de administrador.');
      }

    } catch (err) {
      setMsg({ type: 'error', text: err.message });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6 font-sans selection:bg-orange-200">
      <Head>
        <title>Admin Auth | Loja Lifestyle do Pão de Queijo da Irá</title>
      </Head>

      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* CABEÇALHO DA MARCA */}
        <div className="text-center mb-10">
          <div className="inline-block bg-black text-white px-6 py-2 mb-6 shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]">
             <span className="font-black italic uppercase tracking-[0.3em] text-[10px]">Pão de Queijo da Irá</span>
          </div>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none text-black">
            ADMIN <span className="text-orange-600">AUTH</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-4">Acesso restrito à gerência</p>
        </div>

        {/* CARD DE LOGIN BRUTALISTA */}
        <div className="bg-white border-[6px] border-black p-8 md:p-12 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
          <form onSubmit={handleLogin} className="space-y-8">
            
            {/* CAMPO E-MAIL */}
            <div className="relative group">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-orange-600 transition-colors">E-mail Administrativo</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-4 border-gray-100 p-4 font-bold text-lg focus:border-black outline-none transition-all placeholder:text-gray-200"
                placeholder="nome@exemplo.com"
              />
            </div>

            {/* CAMPO SENHA */}
            <div className="relative group">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-orange-600 transition-colors">Senha de Acesso</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-4 border-gray-100 p-4 font-bold text-lg focus:border-black outline-none transition-all placeholder:text-gray-200"
                placeholder="••••••••"
              />
            </div>

            {/* MENSAGENS DE STATUS */}
            {msg.text && (
              <div className={`p-4 border-[3px] font-black uppercase text-[10px] tracking-widest animate-in zoom-in duration-300 ${
                msg.type === 'error' 
                ? 'bg-red-50 border-red-600 text-red-600 shadow-[4px_4px_0px_0px_rgba(220,38,38,0.2)]' 
                : 'bg-green-50 border-green-600 text-green-600 shadow-[4px_4px_0px_0px_rgba(22,163,74,0.2)]'
              }`}>
                {msg.type === 'error' ? '✕ ' : '✓ '} {msg.text}
              </div>
            )}

            {/* BOTÃO SUBMIT */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black text-white py-6 font-black uppercase text-xs tracking-[0.4em] shadow-[8px_8px_0px_0px_rgba(234,88,12,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all disabled:bg-gray-300 active:scale-95 flex items-center justify-center gap-3"
            >
              {loading ? (
                <span className="animate-pulse italic">Validando...</span>
              ) : (
                <>Entrar no Painel</>
              )}
            </button>
          </form>
        </div>

        {/* FOOTER */}
        <div className="mt-12 text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.6em] text-gray-400">
               Design by SjrPovoaS & Loja Lifestyle do Pão de Queijo da Irá
            </p>
        </div>
      </div>
    </div>
  );
          }
