import React, { useEffect, useState } from 'react'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';

import styled from '@emotion/styled'

import Post from '../../components/Post/Post'

const SinglePueblo = ({ puebloId }) => {
    const [pueblo, setPueblo] = useState(false)

    const data = useQuery(FETCH_PUEBLO_QUERY, {
        variables: {
            puebloId
        }
    });

    useEffect(() => {
        if (data.data && data.data.getPueblo !== undefined)
            setPueblo(data.data.getPueblo)
    }, [data.data, data.loading])

    if (data.loading) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }
    return (
        <StyledSinglePueblo>
            <div className='pueblo-info'>
                <h1>{pueblo.name}</h1>
                <p>{pueblo.info}</p>
            </div>
            <div className='tablon-container'>
                {pueblo && pueblo.tablon.map((post, index) => <Post key={`post-${index}`} post={post} />)}
            </div>
        </StyledSinglePueblo>
    )


}

// GRAPHQL

const FETCH_PUEBLO_QUERY = gql`
  query($puebloId: ID!) {
    getPueblo(puebloId: $puebloId) {
        id
        name
        info
		subscribed{
            username
            id
        }
        tablon{
            title
            id
            description
            content
            author{
                id username
            }
        }
    }
  }
`;


const StyledSinglePueblo = styled.div`

`

export default SinglePueblo
