const internalIp = require('internal-ip');
import { ThemeProvider } from '@emotion/react'
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client'

import Head from 'next/head'

import GlobalStyles from '../components/GlobalStyles/GlobalStyles'
import theme from '../theme/theme'
import Header from '../components/Header/Header'

import 'bootstrap/dist/css/bootstrap.min.css';
import { WithAuthSync } from '../utils/auth'

/** APOLLO */

/* const URI = process.env.NODE_ENV === 'development'
  ? `http://${internalIp.v4.sync()}:5000`
  : 'https://example.com/graphql' */

//console.log('${internalIp.v4.sync()}', internalIp.v4.sync())

const URI = `http://192.168.1.47:5000`
const httpLink = createHttpLink({
  uri: URI
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})



function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="mobile-web-app-capable" content="yes" ></meta>
        <meta name="apple-mobile-web-app-capable" content="yes" ></meta>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1"></meta> */}
        <meta name="viewport" content="minimal-ui, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme} >
          <GlobalStyles />
          {/* <Navbar title={`El recetario de Mayte`} /> */}
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp