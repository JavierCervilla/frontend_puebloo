import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Container, Button, Row, Col, Navbar } from 'react-bootstrap'
import styled from '@emotion/styled'
import { logout, WithAuthSync } from '../../utils/auth'
import jwtDecode from 'jwt-decode'

const Header = ({ token, light }) => {
  // FIXME: useState

  const [user, setUser] = useState(false)

  console.log('token:', token)
  useEffect(() => {
    if (!!token) {
      const userData = jwtDecode(token)
      if (userData.id)
        setUser(userData)
      console.log('user:', userData)
    }
    console.log('token:', token)
    console.log('userData:', user)
  }, [token])

  if (!user) {

    return (
      <HeaderStyled light={light}>
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
      <HeaderStyled light={light}>
        <Container>
          <Row>
            <Container className='btn-holder-registered box-glass'>
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
              {/*               <Button as='a' className='icon business' disabled variant='dark' onClick={logout}>
                <img src='/images/logout_header.svg' />
              </Button> */}
            </Container>
          </Row>
        </Container>
      </ HeaderStyled>
    )
  }
}

const HeaderStyled = styled.div`

    .btn-holder{
      background-color: ${({ theme, light }) => light ? `${theme.colors.light.dark}25` : `${theme.colors.dark.light}25`};
      backdrop-filter: blur(10px);
      position: fixed;
      bottom:0;
      width:100vw;
      display: flex;
      flex-direction:row;
      align-items:center;
      .login, .register{
        text-align:center;
        margin: .5em .5em ;
        padding: .75em 1.5em;
        border-radius: ${props => props.theme.border.radius};
      }
      
      .login {
        width:45vw;
        border:solid 2px ${({ theme, light }) => light ? theme.colors.light.yellow : theme.colors.dark.yellow};;
        border-radius: ${props => props.theme.border.radius};
        color:${({ theme, light }) => light ? theme.colors.light.yellow : theme.colors.dark.yellow};
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
      background-color: ${({ theme, light }) => light ? `${theme.colors.light.dark}5` : `${theme.colors.dark.dark}5`};
      backdrop-filter: blur(10px);
      position: fixed;
      bottom:0;
      width:100%;
      display: flex;
      flex-direction:row;
      align-items:center;
      .icon{
        text-align:center;
        margin: .25em auto ;
        padding: .25em .25em;
        img{
          font-size:1em;
          width:1.5em;
          height:1.5em;
        }
        border-radius: ${props => props.theme.border.radius};
        background: none;
        border: none;
      }
      .icon::active{
        transform: scale(1.1);
        background-color:${({ theme, light }) => light ? theme.colors.light.yellow : theme.colors.dark.yellow};
      }
    }
`

export default WithAuthSync(Header)
