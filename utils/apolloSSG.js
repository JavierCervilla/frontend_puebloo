
/** APOLLO */
const { NODE_ENV, NEXT_PUBLIC_SERVER_PORT, NEXT_PUBLIC_BASE_URL } = process.env
//const URI = `http://192.168.1.47:5000/graphql`
const URI = NODE_ENV === 'development'
    ? `${NEXT_PUBLIC_BASE_URL}:${NEXT_PUBLIC_SERVER_PORT}/graphql`
    : `${NEXT_PUBLIC_BASE_URL}:${NEXT_PUBLIC_SERVER_PORT}/graphql`

export async function getStandaloneApolloClient() {
    const { ApolloClient, InMemoryCache, HttpLink } = await import(
        "@apollo/client"
    );
    return new ApolloClient({
        link: new HttpLink({
            uri: URI
        }),
        cache: new InMemoryCache()
    });
}