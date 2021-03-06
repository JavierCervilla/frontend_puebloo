import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

// CONTEXT
import { AuthContext } from '../context/auth'


import styled from '@emotion/styled'

import { Container, Row, Spinner, Form, Button } from 'react-bootstrap'
import Message from '../components/Message/Message'
import MainLayout from '../layout/MainLayout'


export default function register() {
    const context = useContext(AuthContext)


    const Router = useRouter()

    const [errors, setErrors] = useState(false)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData)
            Router.push('/')
        },
        onError(err) {
            console.error('error:', err.graphQLErrors[0].extensions.exception.errors)
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: {
            email, username, password, confirmPassword
        }
    })

    const submitHandler = (e) => {
        e.preventDefault()
        addUser()
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
                            <h1 className='title'>Registrarse</h1>

                            <ErrorListUL className='errors'>
                                {errors.email &&
                                    <li className='msg-li'>
                                        <Message className='msg' variant={"danger"} >{errors.email}</Message>
                                    </li>
                                }
                                {errors.username &&
                                    <li className='msg-li'>
                                        <Message className='msg' className='msg' variant={"danger"} >{errors.username}</Message>
                                    </li>
                                }
                                {errors.password &&
                                    <li className='msg-li'>
                                        <Message style={{ marginTop: '.5em' }} variant={"danger"} >{errors.password}</Message>
                                    </li>
                                }
                            </ErrorListUL>

                            <Form onSubmit={(e) => submitHandler(e)} className='form' >
                                <Form.Group controlId="Email">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control type="email"
                                        placeholder="introduzca su email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        isInvalid={!!errors.email}
                                    />
                                </Form.Group>
                                <Form.Group controlId="Username">
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="introduzca su nombre de usuario"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        isInvalid={!!errors.username}
                                    />

                                    <Form.Text className="text-muted">
                                        <span>
                                            <small>utiliza un nombre de usuario que te represente.</small>
                                        </span>
                                    </Form.Text>
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

                                <Form.Group controlId="ConfirmPassword">
                                    <Form.Label>Repetir contraseña</Form.Label>
                                    <Form.Control type="password"
                                        placeholder="Vuelve a introducir la contraseña"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                                            Registrarse
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
            overflow:scroll;
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
            @media only screen and (max-width:321px){
                margin: 1em;
                font-size:1em;
            }
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
