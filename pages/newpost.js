import React, { useContext, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { LIGHT_STYLE, StyleContext } from '../context/style'
import MainLayout from '../layout/MainLayout'
import jwtDecode from 'jwt-decode'
import { WithAuthSync } from '../utils/auth'
import { Button, Form, Spinner } from 'react-bootstrap'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'


const Newpost = ({ theme, token }) => {
    const context = useContext(StyleContext)
    const { style, changeStyle } = context

    const Router = useRouter()

    const [errors, setErrors] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [puebloId, setPuebloId] = useState('')
    const [user, setUser] = useState(false)



    if (process.browser && typeof (localStorage) !== 'undefined') {
        let styleFromStorage = localStorage.getItem('style')
        if (styleFromStorage !== style) {
            changeStyle()
        }
    }


    useEffect(() => {
        const userData = jwtDecode(token)
        console.log('token:', token)
        setUser(userData)
    }, [token])


    const [createPost, { loading }] = useMutation(NEW_POST, {
        async update(_, { data: { createPost: newPost } }) {
            console.log('newPost:', newPost)
            Router.push('/')
        },
        onError(err) {
            console.log('error:', { err })
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: {
            title, content, description, puebloId
        },
        context: {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    })

    const submitHandler = (e) => {
        e.preventDefault()
        createPost()
    }
    return (
        <>
            <MainLayout token={token} light={style === LIGHT_STYLE}>
                <StyledNewPostForm>
                    <Form className='form-container' onSubmit={(e) => submitHandler(e)} >
                        <h1 className='form-title'>Crear Publicación</h1>
                        <Form.Group controlId="Title" className='form-input'>
                            {/* <Form.Label>Correo electrónico</Form.Label> */}
                            <Form.Control type="text"
                                placeholder="Titulo de la publicación"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                isInvalid={errors && !!errors.title}
                            />
                        </Form.Group>
                        <Form.Group controlId="Description" className='form-input'>
                            {/* <Form.Label>Correo electrónico</Form.Label> */}
                            <Form.Control type="text"
                                placeholder="Descripcion de la publicación"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                isInvalid={errors && !!errors?.description}
                            />
                        </Form.Group>
                        <Form.Group controlId="Content" className='form-input'>
                            {/* <Form.Label>Correo electrónico</Form.Label> */}
                            <Form.Control as="textarea"
                                placeholder="Contenido de la publicación"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                isInvalid={errors && !!errors?.content}
                            />
                        </Form.Group>
                        {user &&
                            <Form.Group controlId="Content" className='form-input'>
                                <Form.Control as="select"
                                    defaultValue="Choose..."
                                    onChange={(e) => (setPuebloId(e.target.value))}
                                >

                                    {user?.pueblos?.map((p) => (<option value={p._id} >{p.name}</option>))}
                                    <option>elige un pueblo</option>
                                </Form.Control>
                            </Form.Group>
                        }

                        {loading ? (
                            <Button variant="block"
                                className='btn-register'
                                disabled
                            >
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                    Loading...
                            </Button>
                        ) : (
                                <Button className='btn-register' variant="block" type="submit" >
                                    Crear publicación
                                </Button>
                            )}

                    </Form>
                </StyledNewPostForm>
            </MainLayout>
        </>
    )
}

const NEW_POST = gql`
 mutation createPost(
    $title: String!
    $description: String!
    $content: String!
    $puebloId: ID!
  ) {
    createPost(
        createPostInput: {
        title: $title
        description: $description
        content: $content
        puebloId: $puebloId
      }
    ) {
      id
      author{
          id username
      }
      createdAt
      title
      content
      description
    }
  }
`

const StyledNewPostForm = styled.div`
    padding-top: 2.5em;
    .form-container{
        margin: .5em auto;
        max-width: 80vw;
        .form-title{
            text-align: center;
            font-size:1.3em;
        }
        .form-input{
            margin: .5em;
        }
    }
`


export default WithAuthSync(Newpost)
