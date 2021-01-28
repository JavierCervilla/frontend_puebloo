import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useContext } from 'react'
import SinglePueblo from '../../components/Pueblo/SinglePueblo'
import { StyleContext } from '../../context/style'
import { getStandaloneApolloClient } from '../../utils/apolloSSG'
import { auth } from '../../utils/auth'

const PuebloPage = ({ pueblo }) => {
    const token = auth()

    const context = useContext(StyleContext)
    const { style, changeStyle } = context

    if (typeof (localStorage) !== 'undefined') {
        let styleFromStorage = localStorage.getItem('style')
        if (styleFromStorage !== style) {
            changeStyle()
        }
    }

    if (!!pueblo) {
        console.log('>>pueblo:', pueblo)

        return (
            <SinglePueblo puebloId={pueblo.id} light={light} token={token} />
        )
    }
    else return <h1>no hay pueblo</h1>
}



/** GRAPHQL GETPUEBLOS QUERY */

const FETCH_PUEBLOS_QUERY = gql`
    query{
        getPueblos {
            id
            slug
        }
    }
`

export async function getStaticPaths() {
    const client = await getStandaloneApolloClient();

    const pueblos = await client.query({
        query: FETCH_PUEBLOS_QUERY
    });

    const paths = pueblos.data.getPueblos.map((p) => {
        return {
            params: {
                slug: p.slug
            }
        }
    })


    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    const client = await getStandaloneApolloClient();




    const pueblos = await client.query({
        query: FETCH_PUEBLOS_QUERY
    });

    const pueblo = pueblos.data.getPueblos.find((p) => p.slug === `pueblo/${params.slug}`)
    console.log('pueblo', pueblo)


    if (!pueblo) {
        return {
            notFound: true,
        }
    }
    console.log('pueblo', pueblo)
    return {
        props: {
            pueblo
        },
    }
}

export default PuebloPage
