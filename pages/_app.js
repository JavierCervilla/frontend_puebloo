
import { ThemeProvider } from '@emotion/react'
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

import Head from 'next/head'

import { StyleProvider } from '../context/style'
import GlobalStyles from '../components/GlobalStyles/GlobalStyles'
import theme from '../theme/theme'

import 'bootstrap/dist/css/bootstrap.min.css';



/** APOLLO */
const { NODE_ENV, NEXT_PUBLIC_SERVER_PORT, NEXT_PUBLIC_BASE_URL } = process.env
//const URI = `http://192.168.1.47:5000/graphql`
const URI = NODE_ENV === 'development'
  ? `${NEXT_PUBLIC_BASE_URL}:${NEXT_PUBLIC_SERVER_PORT}/graphql`
  : `${NEXT_PUBLIC_BASE_URL}:${NEXT_PUBLIC_SERVER_PORT}/graphql`

// FIXME: Arreglar upload
//const link = createUploadLink({ uri: URI })

/**
const httpLink = createHttpLink({
  uri: URI
})
 */

const httpLink = createHttpLink({
  uri: 'http://15.236.205.128:5000/graphql'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})



function MyApp({ Component, pageProps }) {

  return (
    <>
      <StyleProvider>
        <Head>
          {/* <meta name="mobile-web-app-capable" content="yes" ></meta>
          <meta name="apple-mobile-web-app-capable" content="yes" ></meta>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
          <link rel="icon" href="/favicon.ico" type="image/x-icon"></link> */}
          <meta name="viewport" content="minimal-ui width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
          <link rel="manifest" href="/manifest.json"></link>
          {/* <meta name="viewport" content="width=device-width, initial-scale=1"></meta> */}
          {/* <meta name="viewport" content="minimal-ui, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" /> */}
        </Head>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme} >
            <GlobalStyles />
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </StyleProvider>
    </>
  )
}

export default MyApp