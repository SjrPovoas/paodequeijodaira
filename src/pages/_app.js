import Head from 'next/head';
import '../globals.css'; 

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        {/* O WhatsApp precisa da URL completa para carregar a foto */}
        <meta property="og:image" content="https://paodequeijodaira.vercel.app/favicon.png" />
        <meta property="og:image:secure_url" content="https://paodequeijodaira.vercel.app/favicon.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
  
        {/* Título e URL para o card */}
        <meta property="og:title" content="Pão de Queijo da Irá" />
        <meta property="og:url" content="https://paodequeijodaira.vercel.app/?v=1" />
        <meta property="og:type" content="website" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
