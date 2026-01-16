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
        <title>Pão de Queijo da Irá | O melhor pão de queijo congelado e caseiro da Cidade Ocidental</title>       <meta name="description" content="O legítimo pão de queijo artesanal da Cidade Ocidental. Peça o seu congelado e fresquinho!" />
        <meta name="author" content="SjrPovoaS" />
        <meta name="description" content="O melhor pão de queijo congelado e caseiro da Cidade Ocidental. Temos pacote com 20 pães de queijo congelado e pacote com 1 kg de pão de queijo congelado." />
        <meta name="Keywords" content="pao de queijo, pão de queijo, pão de queijo em Cidade Ocidental, pão de queijo congelado Cidade Ocidental, pão de queijo caseiro, Pão de Queijo da Irá, melhor lanche em cidade ocidental" />
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
