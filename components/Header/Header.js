import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Container, Button, Row, Col, Navbar } from 'react-bootstrap'
import styled from '@emotion/styled'
import { WithAuthSync } from '../../utils/auth'
import jwtDecode from 'jwt-decode'

const Header = ({ token }) => {
  // FIXME: useState

  const [user, setUser] = useState(false)

  console.log('token:', token)
  useEffect(() => {
    if (!!token) {
      const userData = jwtDecode(token)
      setUser(userData)
      console.log('user:', userData)
    }
    console.log('token:', token)
    console.log('userData:', user)
  }, [token])

  if (!user) {

    return (
      <HeaderStyled>
        <Container>
          <Row>
            <Container className='btn-holder'>
              <Link href='/login'>
                <Button as='a' className='login btn-outline-dark' variant='dark' disabled>
                  Entrar
              </Button>
              </Link>
              <Link href='/register'>
                <Button as='a' className='register' variant='dark' disabled>
                  Registrarse
              </Button>
              </Link>
            </Container>
          </Row>
        </Container>
      </ HeaderStyled>
    )
  }
  else {
    return (
      <HeaderStyled>
        <Container>
          <Row>
            <Container className='btn-holder-registered'>
              <Link href='/'>
                <Button as='a' className='icon home' disabled variant='dark'>
                  <img src='/images/home_header.svg' />
                </Button>
              </Link>
              <Link href='/'>
                <Button as='a' className='icon search' disabled variant='dark'>
                  <img src='/images/search_header.svg' />
                </Button>
              </Link>
              <Link href='/'>
                <Button as='a' className='icon entities' disabled variant='dark'>
                  <img src='/images/entitys_header.svg' />
                </Button>
              </Link>
              <Link href='/'>
                <Button as='a' className='icon business' disabled variant='dark'>
                  <img src='/images/business_header.svg' />
                </Button>
              </Link>
            </Container>
          </Row>
        </Container>
      </ HeaderStyled>
    )
  }
}

const HeaderStyled = styled.div`

    .btn-holder{
      background-color:white;
      position: fixed;
      bottom:0;
      width:100%;
      display: flex;
      flex-direction:row;
      align-items:center;
      .login, .register{
        text-align:center;
        margin: .5em .5em ;
        padding: 1.25em 1.25em;
        border-radius: ${props => props.theme.border.radius};
      }
      
      .login {
        width:45vw;
        border:solid 2px ${props => props.theme.colors.dark};
        border-radius: ${props => props.theme.border.radius};
        color:${props => props.theme.colors.dark};
        background:none;
      }
      .register{
        width:45vw;
        background-color:green;
        color:white;
        border:solid 2px green;
      }
      .login::hover{
        border-radius: ${props => props.theme.border.radius};
      }
      .login::active{
        background-color:${props => props.theme.colors.success};
      }
    }

    .btn-holder-registered{
      background-color:${(props) => props.theme.colors.dark};
      position: fixed;
      bottom:0;
      width:100%;
      display: flex;
      flex-direction:row;
      align-items:center;
      .icon{
        text-align:center;
        margin: .5em auto;
        padding: .5em .5em;
        img{
          width:2.5em;
          height:2.5em;
        }
        border-radius: ${props => props.theme.border.radius};
      }
      .icon::active{
        transform: scale(1.1);
        background-color:${(props) => props.theme.colors.dark};
      }
      
    }
`

export default WithAuthSync(Header)
