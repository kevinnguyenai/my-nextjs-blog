import Head from 'next/head'

export default function IndexPage({siteTitle}) {
  return (
    <div>
      <Head>
        <meta name="robots" content="index,follow" /> 
        <meta name="google" content="notranslate" /> 
        <meta name="google" content="nositelinkssearchbox" />
        <title>{siteTitle}</title>
        <link
          rel="canonical"
          href="https://localhost:3000/posts"
          key="canonical"
        />
      </Head>
    </div>
  )
}