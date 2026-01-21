import { useState, useEffect } from 'react';
import Head from 'next/head';
import '../globals.css'; 
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultConfig, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// O Project ID deve estar no seu arquivo .env.local
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'SUA_CHAVE_RESERVA'; 

// Configuração fica FORA do componente para não reiniciar a cada render
const config = getDefaultConfig({
  appName: 'Pão de Queijo da Irá',
  projectId: projectId,
  chains: [polygon],
  ssr: true,
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  // Proteção de montagem para evitar erros de extensão de carteira
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={lightTheme({
            accentColor: '#ea580c', // Cor de destaque (Laranja Pão de Queijo)
            accentColorForeground: 'white',
            borderRadius: 'medium',
          })}
        >
          <Head>
            <title>Loja Lifestyle e Acessórios | Pão de Queijo da Irá</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <meta name="theme-color" content="#ea580c" />
            <meta name="description" content="O melhor pão de queijo artesanal direto para sua casa." />
            
            {/* Melhora a compatibilidade com navegadores de dApps (MetaMask/Coinbase) */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          </Head>

          <div className="min-h-screen bg-gray-50 text-gray-900">
            <Component {...pageProps} />
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;