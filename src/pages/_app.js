import Head from 'next/head';
import '../globals.css'; 
import '@rainbow-me/rainbowkit/styles.css';

import { 
  getDefaultConfig, 
  RainbowKitProvider, 
  lightTheme,
  connectorsForWallets 
} from '@rainbow-me/rainbowkit';
import { 
  metaMaskWallet, 
  coinbaseWallet, 
  rainbowWallet 
} from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// CONFIGURAÇÃO MODERNA DOS CONECTORES
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recomendadas',
      wallets: [
        metaMaskWallet,
        coinbaseWallet, // Aqui ele já usa o suporte para Smart Wallet (nova Coinbase)
        rainbowWallet,
      ],
    },
  ],
  {
    appName: 'Pão de Queijo da Irá',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  }
);

const config = createConfig({
  connectors,
  chains: [polygon],
  transports: {
    [polygon.id]: http(), // Conexão direta via RPC
  },
  ssr: true,
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={lightTheme({ accentColor: '#ea580c' })}
          locale="pt-BR"
          initialChain={polygon} // FORÇA a Polygon ao abrir
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
