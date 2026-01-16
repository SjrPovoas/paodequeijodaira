import Head from 'next/head';
import '../styles/globals.css'; // Seus estilos globais

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
  {/* 1. Ícone para a aba do navegador (Padrão) */}
  <link rel="shortcut icon" href="/favicon.ico" />
  
  {/* 2. Ícone em alta definição (Navegadores modernos) */}
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
  
  {/* 3. Ícone para iPhone/iOS */}
  <link rel="apple-touch-icon" href="/favicon.png" />

  {/* 4. Preview para WhatsApp/Redes Sociais */}
  {/* (O WhatsApp prefere PNG ou JPG. Vamos usar o PNG para melhor qualidade) */}
  <meta property="og:image" content="https://paodequeijodaira.vercel.app/favicon.png" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="512" />

  {/* Mantém a cor da barra no mobile */}
  <meta name="theme-color" content="#ea580c" />
</Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
