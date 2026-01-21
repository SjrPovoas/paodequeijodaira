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

    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
}

module.exports = nextConfig