import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

import { AuthContext } from '../context/auth'
import { login } from '../utils/auth'


import styled from '@emotion/styled'

import { Container, Row, Spinner, Form, Button } from 'react-bootstrap'
import Message from '../components/Message/Message'
import MainLayout from '../layout/MainLayout'


export default function register() {
    // CONTEXT
    const context = useContext(AuthContext)

    const Router = useRouter()

    const [errors, setErrors] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        async update(_, { data: { login: userData } }) {
            console.log('login:', userData)
            //context.login(userData)
            await login(userData)
            Router.push('/')
        },
        onError(err) {
            console.log('error:', { err })
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: {
            email, password,
        }
    })

    const submitHandler = (e) => {
        e.preventDefault()
        loginUser()
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrors(false)
        }, 5000)
        return () => clearTimeout(timer)
    }, [errors])

    return (
        <MainLayout >
            <RegisterPage>
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

                            <ErrorListUL className='errors'>
                                {errors.email &&
                                    <li className='msg-li'>
                                        <Message className='msg' variant={"danger"} >{errors.email}</Message>
                                    </li>
                                }
                                {errors.password &&
                                    <li className='msg-li'>
                                        <Message style={{ marginTop: '.5em' }} variant={"danger"} >{errors.password}</Message>
                                    </li>
                                }
                            </ErrorListUL>

                            <Form onSubmit={(e) => submitHandler(e)} >
                                <Form.Group controlId="Email">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control type="email"
                                        placeholder="introduzca su email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        isInvalid={!!errors.email}
                                    />
                                </Form.Group>


                                <Form.Group controlId="Password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password"
                                        placeholder="Introduzca la contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        isInvalid={!!errors.password}
                                    />

                                </Form.Group>

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
                                            Iniciar sesion
                                        </Button>
                                    )}
                            </Form>
                        </Container>
                    </Row>
                </Container>
            </RegisterPage >
        </MainLayout>
    )
}

/** GRAPHQL MUTATION REGISTER*/

const LOGIN_USER = gql`
 mutation login(
    $email: String!
    $password: String!
  ) {
    login(
        email: $email
        password: $password     
    ) {
      id
      email
      username
      createdAt
      token
      rol
      pueblos{
          id name
      }
    }
  }
`


/** STYLES DOWN */


const ErrorListUL = styled.ul`
    margin-bottom:1em;
`

const RegisterPage = styled.div`
    @media only screen and (max-width: ${props => props.theme.devices.mobile}) {    
        .form{
            display:flex;
            flex-direction:column;
            max-width:400px;
            margin: auto;
        }
        .layout{
            padding:.5em;
            
        }
        .errors{
            position:absolute;
            margin-bottom:1em;
            top:0;
            right:0;
        }
        .icon {
          margin: 0 0 0 .5em;
          height:auto;
          width:2em;;
        }
        .title{
            font-size:1.5em;
            margin:  2em 0;
        }
        .btn-register{
            background-color:green;
            width:100%;
            color:white;
            border:none;
            padding:1em;
        }
        .msg-li{
            margin: 0 1em;
        }
    
    }
`
