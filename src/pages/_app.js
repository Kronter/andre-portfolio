import "@/styles/globals.css";
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
          <link rel="icon" href="/favicon.png" />
          <meta property="og:image" content="/social-preview.png" />
          <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Component {...pageProps} />;
    </>

  )
}
