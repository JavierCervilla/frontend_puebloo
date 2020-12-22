import React from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import { Card } from 'react-bootstrap'

import * as AiIcons from 'react-icons/ai'


const Post = ({ post, pueblo, light }) => {
    const { title, description, id, content } = post
    return (
        <StyledPost light={light}>
            <Card className='post-card container'>
                <div className='row pueblo'>
                    <p className='author'> {pueblo.name}<small className='small-text'> ha publicado esto</small></p>
                </div>
                <div className='row'>
                    <h2 className='title' >{title}</h2>
                </div>
                <div className='rowš'>
                    <p className='description'>{description}</p>
                </div>
            </Card>
            <Image className='imagen' src='/images/pueblo_sample.jpg' width={348} height={152} />
            <div className='footer row container'>
                <span className=' likes'><AiIcons.AiOutlineHeart /> <small className='likes-nmb'>27</small></span>
                <span className=' comments'><AiIcons.AiOutlineComment /> <small className='likes-nmb'>3</small></span>
                <span className=' share'><AiIcons.AiOutlineShareAlt /> <small className='likes-nmb'>27</small></span>
            </div>
        </StyledPost >
    )
}

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
            text-align:left;
        }
        .divider{
            margin-top:.5em;
        }
        .description{
            text-align:left;
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
        border-radius:12px;
    }
    .footer{
        margin-bottom:.25em;
        display: grid;
        grid-template-columns: 1fr 1fr .5fr;
        .likes{
            color: ${({ theme, light }) => light ? theme.colors.light.dark : theme.colors.dark.light};
            font-size:1.3em;
        }
        .comments{
            color: ${({ theme, light }) => light ? theme.colors.light.dark : theme.colors.dark.light};
            position: absolute;
            left:4em;
            margin-left:.5em;
            font-size:1.3em;
        }
        .share{
            color: ${({ theme, light }) => light ? theme.colors.light.dark : theme.colors.dark.light};
            position: absolute;
            margin-right:1.5em;
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
