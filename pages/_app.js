
import { ThemeProvider } from '@emotion/react'
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

import Head from 'next/head'

import GlobalStyles from '../components/GlobalStyles/GlobalStyles'
import theme from '../theme/theme'

import 'bootstrap/dist/css/bootstrap.min.css';


/** APOLLO */
const URI = `http://192.168.1.47:5000/graphql`
/* const URI = process.env.NODE_ENV === 'development'
? `http://${internalIp.v4.sync()}:5000`
: 'https://example.com/graphql' */


const link = createUploadLink({ uri: `${URI}/graphql` })


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
        <link rel="manifest" href="dunplab-manifest-29818.json"></link>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
        <link rel="icon" href="/favicon.ico" type="image/x-icon"></link>
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