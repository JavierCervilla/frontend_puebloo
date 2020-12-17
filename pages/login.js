import { useState, useEffect } from 'react'
import Link from 'next/link'

import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

import styled from '@emotion/styled'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Message from '../components/Message/Message'


export default function register() {
    const [errors, setErrors] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log('result:', result)
        },
        onError(err) {
            console.log('error:', err.graphQLErrors[0].extensions.exception.errors)
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: {
            username, password
        }
    })

    const submitHandler = (e) => {
        e.preventDefault()
        const registerForm = { username, password }
        console.log('registerForm', registerForm)
        loginUser()
    }



    return (
        <LoginPage>
            <Container className='layout'>
                <Row>
                    <Link href='/'>
                        <a >
                            <img className='icon' src='/images/back.svg' />
                        </a>
                    </Link>
                </Row>
                <Row className='form'>
                    <Container>
                        <h1 className='title'>Iniciar sesion</h1>
                        <Form onSubmit={(e) => submitHandler(e)}>
                            <Form.Group controlId="Username">
                                <Form.Label>Nombre de usuario</Form.Label>
                                <Form.Control type="text"
                                    placeholder="introduzca su nombre de usuario"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                {errors.username &&
                                    <Message className='msg' className='msg' variant={"danger"} >{errors.username}</Message>
                                }
                            </Form.Group>


                            <Form.Group controlId="Password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password"
                                    placeholder="Introduzca la contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password &&
                                    <Message style={{ marginTop: '.5em' }} variant={"danger"} >{errors.password}</Message>
                                }
                            </Form.Group>
                            <Button className='btn-register' variant="block" type="submit" >
                                Submit
                            </Button>
                        </Form>
                    </Container>
                </Row>
            </Container>
        </LoginPage>
    )
}

/** GRAPHQL MUTATION REGISTER*/

const REGISTER_USER = gql`
 mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`


/** STYLES DOWN */


const LoginPage = styled.div`
    @media only screen and (max-width: ${props => props.theme.devices.mobile}) {    
        .layout{

            padding:1em;
        }
        .icon {
          margin: 0 0 0 .5em;
          height:auto;
          width:2em;;
        }
        .title{
            font-size:42px;
            
            margin:  2em 0;
        }
        .btn-register{
            background-color:green;
            width:100%;
            color:white;
            border:none;
            padding:1em;
        }
        .msg{
            margin: .5em;
        }
    
    }
`
