import Head from 'next/head';
import '../globals.css'; 

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        {/* SEO Configurações básicas */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="skype_toolbar" content="skype_toolbar_parser_compatible" />

        {/* Ícones do Navegador (Favicons) */}
        <link rel="shortcut icon" href="https://paodequeijodaira.vercel.app/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://paodequeijodaira.vercel.app/favicon.png" />
        <link rel="icon" type="image/jpeg" sizes="192x192" href="https://paodequeijodaira.vercel.app/logo-paodequeijodaira.jpg" />
        <link rel="apple-touch-icon" href="https://paodequeijodaira.vercel.app/favicon.png" />
        <link rel="mask-icon" href="https://paodequeijodaira.vercel.app/favicon.png" /> 

        {/* Cor da barra do navegador no celular */}
        <meta name="theme-color" content="#ea580c" />
      </Head>
      
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
