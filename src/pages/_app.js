import Head from 'next/head';
import '../globals.css'; 

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        {/* Configurações básicas */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pão de Queijo da Irá | O Sabor Caseiro</title>
        <meta name="description" content="O legítimo pão de queijo artesanal da Cidade Ocidental. Peça o seu congelado e fresquinho!" />

        {/* Ícones do Navegador (Favicons) */}
        <link rel="shortcut icon" href="https://paodequeijodaira.vercel.app/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://paodequeijodaira.vercel.app/favicon.png" />
        <link rel="apple-touch-icon" href="https://paodequeijodaira.vercel.app/favicon.png" />

        {/* Meta Tags para WhatsApp / Facebook (Open Graph) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://paodequeijodaira.vercel.app/logo-paodequeijodaira.jpg">
        <meta property="og:title" content="Pão de Queijo da Irá | Sabor que Surpreende" />
        <meta property="og:description" content="Pão de Queijo artesanal, congelado para sua praticidade. Encomende agora!" />
        <meta property="og:image" content="https://paodequeijodaira.vercel.app/logo-paodequeijodaira.jpg" />
        <meta property="og:image:secure_url" content="https://paodequeijodaira.vercel.app/logo-paodequeijodaira.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pão de Queijo da Irá" />
        <meta name="twitter:image" content="https://paodequeijodaira.vercek.app/logo-paodequeijodaira.jpg" />

        {/* Cor da barra do navegador no celular */}
        <meta name="theme-color" content="#ea580c" />
      </Head>
      
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
