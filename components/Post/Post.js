import React from 'react'
import styled from '@emotion/styled'
import { Card } from 'react-bootstrap'

const Post = ({ post }) => {
    return (
        <StyledPost>
            <Card className='post-card'>
                <h2 className='title' >{post.title}</h2>
                <hr className='divider' />
                <p className='description'>descripcion : {post.description}</p>
                <p className='content'>contenido : {post.content}</p>
                <p className='author'>autor : {post.author.username}</p>
            </Card>
        </StyledPost>
    )
}

const StyledPost = styled.div`
    .post-card{
        padding: .5em;
        margin:.5em auto;
        display:flex;
        flex-direction:column;
        height:50vh;
        border: solid 1px ${props => props.theme.colors.light};
        border-radius: 10px;
        .title{
            text-align:center;
        }
        .divider{
            margin-top:.5em;
        }
        .description{
            text-align:center;
        }
        .content{
            text-align:center;
        }
        .author{
            text-align:center;
        }

    }
`

export default Post
