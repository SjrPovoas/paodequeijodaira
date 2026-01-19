// src/lib/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Essas variáveis devem estar no seu arquivo .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Erro: Variáveis do Supabase não encontradas no .env.local");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);