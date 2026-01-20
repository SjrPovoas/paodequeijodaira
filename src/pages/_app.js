import Head from 'next/head';
import '../globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultConfig, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// 1. Configuração usando a Variável de Ambiente
const config = getDefaultConfig({
  appName: 'Pão de Queijo da Irá',
  // Aqui o Next.js vai buscar o valor que você colocou no .env.local
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID, 
  chains: [polygon],
  ssr: true,
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={lightTheme({
            accentColor: '#ea580c',
            accentColorForeground: 'white',
          })}
          locale="pt-BR"
        >
          <Head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="skype_toolbar" content="skype_toolbar_parser_compatible" />

            <link rel="shortcut icon" href="https://paodequeijodaira.vercel.app/favicon.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="https://paodequeijodaira.vercel.app/favicon.png" />
            <link rel="icon" type="image/jpeg" sizes="192x192" href="https://paodequeijodaira.vercel.app/logo-paodequeijodaira.jpg" />
            <link rel="apple-touch-icon" href="https://paodequeijodaira.vercel.app/favicon.png" />
            <link rel="mask-icon" href="https://paodequeijodaira.vercel.app/favicon.png" /> 

            <meta name="theme-color" content="#ea580c" />
          </Head>

          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
