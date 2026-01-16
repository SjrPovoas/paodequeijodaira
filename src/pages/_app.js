import Head from 'next/head';
import '../styles/globals.css'; // Seus estilos globais

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Ícone padrão para navegadores */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        
        {/* Ícone para iPhones/iOS (Home Screen) */}
        <link rel="apple-touch-icon" href="/logo-paodequeijodaira.jpg" />
        
        {/* Melhora a compatibilidade com navegadores antigos */}
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Define o título padrão caso a página não tenha um */}
        <title>Pão de Queijo da Irá</title>
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
