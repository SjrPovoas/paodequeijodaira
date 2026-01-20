import Head from 'next/head';
import '../globals.css'; 
import '@rainbow-me/rainbowkit/styles.css';
import { useState, useEffect } from 'react';

import { 
  getDefaultConfig, 
  RainbowKitProvider, 
  lightTheme 
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { polygon } from 'viem/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Configuração do RainbowKit e Wagmi
const config = getDefaultConfig({
  appName: 'Pão de Queijo da Irá',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'dd9160f4f8416affdc8918afd9ae77c2', 
  chains: [polygon],
  ssr: true,
});

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  // Trava de segurança contra erro de Client-side exception (Hydration)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          locale="pt-BR"
          theme={lightTheme({
            accentColor: '#ea580c',
            accentColorForeground: 'white',
            borderRadius: 'small',
          })}
        >
          <Head>
            <title>Pão de Queijo da Irá | Loja Oficial</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="theme-color" content="#ea580c" />
            <meta name="description" content="O melhor pão de queijo artesanal direto para sua casa." />
            <link rel="shortcut icon" href="/favicon.ico" />
            
            {/* Meta tags para garantir funcionamento na Coinbase Wallet e MetaMask mobile */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          </Head>

          {/* O conteúdo só renderiza após o componente estar 'montado' no navegador */}
          {mounted ? (
            <Component {...pageProps} />
          ) : (
            <div style={{ background: '#f9fafb', minHeight: '100-vh' }} />
          )}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
            }
