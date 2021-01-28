import React, { useEffect, useState } from 'react'
import moment from 'moment'

import gql from 'graphql-tag'
import { useMutation } from '@apollo/client';

import Image from 'next/image'
import styled from '@emotion/styled'
import { Card } from 'react-bootstrap'

import * as AiIcons from 'react-icons/ai'
import jwtDecode from 'jwt-decode';
import { auth } from '../../utils/auth';


const Post = ({ post, pueblo, light }) => {
    const { title, description, id: postId, content, createdAt, commentCount, likeCount, likes } = post
    const [user, setUser] = useState(false)
    const [liked, setLiked] = useState(false)


    const token = auth()


    console.log('token in post>>', token)

    const checkLiked = () => {
        const isLiked = !!likes.find(like => like.username === user.username)

        console.log('isLiked:', isLiked)
        return isLiked
    }

    useEffect(() => {
        const userData = jwtDecode(token)
        setUser(userData)
    }, [token])

    useEffect(() => {
        setLiked(checkLiked())
    }, [user])


    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId },
        context: {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    });

    const likePostHandler = () => {
        likePost()
        setLiked(!liked)
    }

    return (
        <StyledPost light={light}>
            <Card className='post-card container  p-3'>
                <div className='row pueblo'>
                    <p className='author'> {pueblo.name}<small className='small-text'> {`${moment(createdAt).locale('es').startOf('hour').fromNow()}`}.</small></p>
                </div>
                <div className='row'>
                    <h2 className='title' >{title}</h2>
                </div>
                <div className='row d-inline-block m-auto'>
                    <p className='description'>{description}</p>
                </div>
            </Card>
            <div className='row container d-inline-block m-auto'>
                <Image className='imagen' src='/images/pueblo_sample.jpg' /* width={348} height={152} */ width={700} height={300} />
            </div>
            <div className='footer container p-2'>
                <span className=' likes' onClick={likePostHandler}>
                    {
                        liked ?
                            < AiIcons.AiFillHeart className='hearth-active' /> :
                            <AiIcons.AiOutlineHeart className='hearth' />
                    }
                    <small className='likes-nmb'>{likeCount}</small>
                </span>
                <span className=' comments'><AiIcons.AiOutlineComment /> <small className='likes-nmb'>{commentCount}</small></span>
                <span className=' share'><AiIcons.AiOutlineShareAlt /> <small className='likes-nmb'>27</small></span>
            </div>
            <hr />
        </StyledPost >
    )
}


/** GRAPHQL LIKE POST MUTATION */
const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;


const StyledPost = styled.div`
    .post-card{
        background-color: ${({ theme, light }) => light ? theme.colors.light.light : theme.colors.dark.dark};;
        padding: .5em;
        display:block;
        flex-direction:column;
        border: none;
        color: ${({ theme, light }) => light ? theme.colors.light.dark : theme.colors.dark.light};
        .description{
            font-weight:400;
        }
        .card{
            border:none;
        }
        .title{
            margin-top:.5em;
            margin-left:.25em;
            text-align:left;
            font-weight:300;
            font-size:1.15em;
        }
        .description{
            margin-top:.5em;
            text-align:left;
            font-weight:300;
        }
        .content{
            text-align:left;
        }
        .author{
            text-align:left;
            font-size:0.9em;
            color: ${({ theme, light }) => light ? theme.colors.light.green : theme.colors.dark.green};
            .small-text{
                font-size:0.8em;
                color: ${({ theme, light }) => light ? theme.colors.light.dark : theme.colors.dark.light};
            }
            
        }


    }
    .imagen{
        border-radius:10px;
    }
    .footer{
        margin-bottom:.25em;
        display: grid;
        grid-template-columns: 1fr 1fr .5fr;
        .likes{
            margin-left:.5em;
            color: ${({ theme, light }) => light ? theme.colors.light.dark : theme.colors.dark.light};
            font-size:1.3em;
        }
        .hearth {
            cursor: pointer;
        }
        .hearth-active{
            color: ${({ theme, light }) => light ? theme.colors.light.green : theme.colors.dark.yellow};
            cursor: pointer;
        }
        .comments{
            color: ${({ theme, light }) => light ? theme.colors.light.dark : theme.colors.dark.light};
            position: absolute;
            left:25%;
            margin-left:.5em;
            font-size:1.3em;
        }
        .share{
            color: ${({ theme, light }) => light ? theme.colors.light.dark : theme.colors.dark.light};
            position: absolute;
            margin-right:10%;
            right:0;
            font-size:1.3em;
        }
        small{
                font-size:0.8em;
                color: ${({ theme, light }) => light ? theme.colors.light.dark : theme.colors.dark.light};
        }
    }
`

export default Post
