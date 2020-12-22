import { useState, useEffect, useContext } from 'react'

import jwtDecode from 'jwt-decode'

import { WithAuthSync } from "../utils/auth";

import { Container, Button, Row, Col } from 'react-bootstrap'
import styled from '@emotion/styled'

import ListPuebloFeed from '../components/Pueblo/ListPuebloFeed'
import MainLayout from '../layout/MainLayout';
import { LIGHT_STYLE, StyleContext } from '../context/style';


const Home = ({ theme, token }) => {
  const context = useContext(StyleContext)
  const { style, changeStyle } = context

  if (typeof (localStorage) !== 'undefined') {
    let styleFromStorage = localStorage.getItem('style')
    if (styleFromStorage !== style) {
      changeStyle()
    }
  }

  // FIXME: USEstate
  const [user, setUser] = useState(false)

  useEffect(() => {
    const userData = jwtDecode(token)
    setUser(userData)
  }, [token])


  // Invited User
  if (user.rol === 'guest') {
    return (
      <MainLayout token={token} light={style === LIGHT_STYLE}>
        <HomePageGuest theme={theme} light={style === LIGHT_STYLE}>
          <Container>

            <Container >

              <Row className='content container'>
                <Row className='item '>
                  <img className='icon' src='/images/tuercas_inicio.svg' />
                  <h4>
                    Participa en el desarrollo de tu pueblo
                    </h4>

                </Row>
                <Row className='item '>

                  <img className='icon' src='/images/usuarios_inicio.svg' />
                  <h4>
                    Conecta con los pueblos de tu zona
                    </h4>

                </Row>
                <Row className='item '>

                  <img className='icon' src='/images/lupa_inicio.svg' />
                  <h4>
                    Descubre eventos, ofertas de empleo, viviendas...
                    </h4>

                </Row>
                <Row></Row>
              </Row>
            </Container>

          </Container>

        </HomePageGuest >
      </MainLayout>
    )

  } else {
    // AUTH USER SIN PUEBLOS??
    const { pueblos } = user

    if (!!!pueblos || pueblos.length < 1) {
      return (
        <MainLayout token={token} light={style === LIGHT_STYLE}>
          <HomePageRegistered >
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
        <MainLayout token={token} light={style === LIGHT_STYLE}>
          <HomePageRegistered light={style === LIGHT_STYLE}>
            <div className='feed-container scrollbar style-15'>
              <ListPuebloFeed pueblos={pueblos} light={style === LIGHT_STYLE} />
            </div>
          </HomePageRegistered>
        </MainLayout >
      )
    }

  }
}



export default WithAuthSync(Home)

/** REGISTERED HOME PAGE STYLES */

const HomePageRegistered = styled.div`
  .feed-container{
    background-color: ${({ theme, light }) => light ? theme.colors.light.light : theme.colors.dark.dark};;
    overflow:hidden;
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
      h1{
        position:relative;
        top:42px;
        margin:0 1em;
        color:${({ theme, light }) => light ? theme.colors.light.yellow : theme.colors.dark.yellow};
        text-align:center;
        font-size:40px;
      }
    }
    .content{
      position:relative;
      top:60px;
      max-height:300px;
      .item{
        display:flex;
        flex-direction:column;
        .icon{
          width:2em;
          height:auto;
          color:${({ theme, light }) => light ? theme.colors.light.yellow : theme.colors.dark.yellow};
        }
        h4{
          color:${({ theme, light }) => light ? theme.colors.light.yellow : theme.colors.dark.yellow};
          text-align:left;
          font-size:14px;
          margin-left:3em;
          
        }
      }
    }
}
`
