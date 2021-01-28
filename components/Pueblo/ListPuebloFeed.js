import React from 'react'

import styled from '@emotion/styled'
import { Container, Row } from 'react-bootstrap'

import SinglePueblo from '../../components/Pueblo/SinglePueblo'
import { WithAuthSync } from '../../utils/auth'

const ListPuebloFeed = ({ pueblos, light, token }) => {
    console.log('pueblos', pueblos)
    return (
        <StyledListPost light={light}>
            <Container className='feed'>
                {(pueblos && pueblos.length >= 1) && (

                    pueblos.map(
                        (pueblo, index) => (
                            < SinglePueblo key={`${pueblo.name}-${index}`} puebloId={pueblo._id} light={light} token={token} />
                        )
                    )
                )}
            </Container>
            <div className='fix'>loading...</div>
        </StyledListPost>
    )
}




const StyledListPost = styled.div`
    h1{
        font-size:1.25em;
        color: ${props => props.theme.colors.light}
    }
    .feed{
        overflow:auto;
    }
    .fix{
        text-align:center;
        padding-bottom:5.6em;
    }
`

export default WithAuthSync(ListPuebloFeed)
