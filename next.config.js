/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@rainbow-me/rainbowkit',
    'wagmi',
    'viem',
    '@safe-global/safe-apps-sdk',
    '@safe-global/safe-apps-provider',
    '@wagmi/connectors'
  ],
  webpack: (config) => {
    // RESOLVE O ERRO 'import.meta'
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    // CONFIGURAÇÃO DE FALLBACKS (Correção para MetaMask SDK e outros módulos Node)
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false, 
      net: false, 
      tls: false,
      // ESTA LINHA ABAIXO RESOLVE O ERRO QUE VOCÊ RECEBEU:
      '@react-native-async-storage/async-storage': false 
    };

    return config;
  },
}

module.exports = nextConfig