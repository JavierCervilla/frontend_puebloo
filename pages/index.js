import { useState, useEffect } from 'react'

import jwtDecode from 'jwt-decode'

import { WithAuthSync } from "../utils/auth";

import { Container, Button, Row, Col } from 'react-bootstrap'
import styled from '@emotion/styled'

import ListPuebloFeed from '../components/Pueblo/ListPuebloFeed'
import MainLayout from '../layout/MainLayout';


const Home = ({ theme, token }) => {
  // FIXME: USEstate
  const [user, setUser] = useState(false)

  useEffect(() => {
    const userData = jwtDecode(token)
    setUser(userData)
  }, [token])


  // Invited User
  if (user.rol === 'guest') {
    return (
      <MainLayout token={token}>
        <HomePageGuest theme={theme}>
          <Container>
            <Row>
              <Container >
                <Row className='hero'>
                  <h1>PUEBLOO</h1>
                </Row >
                <Row className='content'>

                  <div className='item'>
                    <img className='icon' src='/images/tuercas_inicio.svg' />
                    <h4>
                      Participa en el desarrollo de tu pueblo
                </h4>
                  </div>
                  <div className='item'>
                    <img className='icon' src='/images/usuarios_inicio.svg' />
                    <h4>
                      Conecta con los pueblos de tu zona
                </h4>
                  </div>
                  <div className='item'>
                    <img className='icon' src='/images/lupa_inicio.svg' />
                    <h4>
                      Descubre eventos, ofertas de empleo, viviendas...
                </h4>
                  </div>
                </Row>
              </Container>
            </Row>
          </Container>

        </HomePageGuest >
      </MainLayout>
    )

  } else {
    // AUTH USER SIN PUEBLOS??
    const { pueblos } = user

    if (!!!pueblos || pueblos.length < 1) {
      return (
        <MainLayout token={token}>
          <HomePageRegistered>
            Sin Pueblo
          <Container>
              {/* FUNCION DE BUSCAR PUEBLO Y UNIRSE A EL */}
            </Container>
          </HomePageRegistered>
        </MainLayout>
      )

    } else {
      {/* CON PUEBLO*/ }
      return (
        <MainLayout token={token}>
          <HomePageRegistered>
            <ListPuebloFeed pueblos={pueblos} />
          </HomePageRegistered>
        </MainLayout>
      )
    }

  }
}



export default WithAuthSync(Home)

/** REGISTERED HOME PAGE STYLES */

const HomePageRegistered = styled.div`
  h1{
    color:red;
  }

`







/** GUEST HOME PAGE STYLES */
const HomePageGuest = styled.div`
  // MOBILE FIRST
  @media only screen and (max-width: ${props => props.theme.devices.mobile}) {
    background: url('images/home_layout.png') no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height:100vh;
    
    
    
    .hero{
      padding:calc(20vh - 5em) 0 0 0;
      h1{
        margin:0 1em;
        color:${props => props.theme.colors.primary};
        text-align:center;
        font-size:42px;
      }
    }
    .content{
      .item{
        display:flex;
        .icon{
          margin: 0 0 0 .5em;
          height:auto;
          width:5em;;
        }
        h4{
          color:${props => props.theme.colors.primary};
          text-align:left;
          margin: 2em .5em 2em 1em;
          font-size:18px;
        }
      }
    }
}
`
