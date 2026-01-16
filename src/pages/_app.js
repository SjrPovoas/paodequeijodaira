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
    
        {/* Meta Tags para WhatsApp / Facebook (Open Graph) */}
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.facebook.com/paodeuqiejodaira.iraleide" />
        <meta property="og:title" content="Pão de Queijo da Irá" />
        <meta property="og:description" content="O melhor pão de queijo congelado e caseiro da Cidade Ocidental. Temos pacote com 20 pães de queijo congelado e pacote com 1 kg de pão de queijo congelado." />
        <meta property="og:image" content="https://paodequeijodaira.vercel.app/logo-paodequeijodaira.jpg" />
        <meta property="og:site_name" content="Pão de Queijo da Irá" />
        <meta property="og:image" content="https://paodequeijodaira.vercel.app/logo-paodequeijodaira.jpg" />
        <meta property="og:image:secure_url" content="https://paodequeijodaira.vercel.app/logo-paodequeijodaira.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />        <meta property="og:type" content="website" />
        <meta property="fb:pages" content="359950968036532" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PaodQueijodaIra" />
        <meta name="twitter:creator" content="@PaodQueijodaIra" />
        <meta name="twitter:title" content="Pão de Queijo da Irá" />
        <meta name="twitter:description" content="O melhor pão de queijo congelado e caseiro da Cidade Ocidental. Temos pacote com 20 pães de queijo congelado e pacote com 1 kg de pão de queijo congelado." />
        <meta name="twitter:image" content="https://paodequeijodaira.vercel.app/logo-paodequeijodaira.jpg" />
        <meta name="twitter:url" content="https://x.com/PaodQueijodaIra" />    

        {/* Cor da barra do navegador no celular */}
        <meta name="theme-color" content="#ea580c" />
      </Head>
      
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
