import "@/styles/globals.css";
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
          <link rel="icon" href="/favicon.png" />
          <meta property="og:image" content="/social-preview.webp" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="theme-color" content="#09090b" />
          <meta name="color-scheme" content="dark" />
      </Head>
      <Component {...pageProps} />
    </>

  )
}
