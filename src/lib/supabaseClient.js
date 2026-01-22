import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verificação de segurança para não quebrar o app se as chaves sumirem
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Atenção: Chaves do Supabase não encontradas nas variáveis de ambiente.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
});