import Head from 'next/head';
import '../styles/globals.css'; 

function MyApp({ Component, pageProps }) {
  const URL_SITE = "https://paodequeijodaira.vercel.app";
  const IMAGEM_PREVIEW = `${URL_SITE}/favicon.png`;

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL_SITE} />
        <meta property="og:title" content="Pão de Queijo da Irá" />
        <meta property="og:image" content={IMAGEM_PREVIEW} />
        <meta name="theme-color" content="#ea580c" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
