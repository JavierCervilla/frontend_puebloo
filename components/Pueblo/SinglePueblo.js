import React, { useEffect, useState } from 'react'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';

import styled from '@emotion/styled'

import Post from '../../components/Post/Post'
import { WithAuthSync } from '../../utils/auth';


const SinglePueblo = ({ puebloId, light, theme, token }) => {
    console.log('puebloId', puebloId)

    const data = useQuery(FETCH_PUEBLO_QUERY, {
        variables: {
            puebloId
        },
        pollInterval: 3000,
    });
    const [pueblo, setPueblo] = useState(false)

    // FIXME: CUANDO REFRESCAS SE PIERDEN LOS PUEBLOS
    useEffect(() => {
        if (!!!data.loading && !!data.data)
            setPueblo(data.data.getPueblo)
    }, [data.data, data.loading])

    if (data.loading) {
        console.log('data', data)
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    } else {
        console.log('pueblo', pueblo)
        return (
            <StyledSinglePueblo light={light} theme={theme}>
                <div className='pueblo-info'>
                    <h1>{pueblo.name}</h1>
                    <p>{pueblo.info}</p>
                </div>
                <div className='tablon-container'>
                    {pueblo && pueblo.tablon.map((post, index) => <Post key={`post-${index}`} post={post} pueblo={pueblo} light={light} token={token} />)}
                    {pueblo && pueblo.tablon.length === 0 && (

                        <h3 className='p-2'>Aun no hay posts en este pueblo, se el primero en añadir uno.</h3>

                    )}
                </div>
            </StyledSinglePueblo>
        )
    }


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
            likes{
                username
                id
            }
            likeCount
            commentCount
        }
    }
  }
`;


const StyledSinglePueblo = styled.div`
    margin-top:48px;
    .pueblo-info {
        color: ${({ theme, light }) => light ? `${theme.colors.light.green}` : `${theme.colors.dark.yellow}`};
        font-weight:400;
    }
`

export default WithAuthSync(SinglePueblo)