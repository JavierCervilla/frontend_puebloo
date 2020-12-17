//import '../styles/globals.css'
import { ThemeProvider } from '@emotion/react'
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client'

import Head from 'next/head'



import GlobalStyles from '../components/GlobalStyles/GlobalStyles'
import Navbar from '../components/Navbar/Navbar'
import theme from '../theme/theme'

import 'bootstrap/dist/css/bootstrap.min.css';

/** APOLLO */

const httpLink = createHttpLink({
  uri: 'http://localhost:5000'
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