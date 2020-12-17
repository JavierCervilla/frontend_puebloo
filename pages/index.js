import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'

import { Container, Button, Row, Col } from 'react-bootstrap'


export default function Home({ theme }) {
  // Invited User
  return (
    <HomePage theme={theme}>
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
        <Row>
          <Container className='btn-holder'>
            <Link href='/login'>
              <Button as='a' className='login' disabled>
                Entrar
              </Button>
            </Link>
            <Link href='/register'>
              <Button as='a' className='register' disabled>
                Registrarse
              </Button>
            </Link>
          </Container>
        </Row>
      </Container>
    </HomePage >
  )
}

const HomePage = styled.div`
  // MOBILE FIRST
  @media only screen and (max-width: ${props => props.theme.devices.mobile}) {
    background: url('images/home_layout.png') no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height:100vh;
    
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
        margin: 1em 1em ;
        padding: 1.5em 1.5em;
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
        border:none;
      }
      .login::hover{
        border-radius: ${props => props.theme.border.radius};
      }
      .login::active{
        background-color:${props => props.theme.colors.success};
      }
    }
    
    .hero{
      padding:calc(20vh - 5em) 0 0 0;
      h1{
        color:${props => props.theme.colors.primary};
        text-align:center;
        font-size:56px;
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
          font-size:21px;
        }
      }
    }
}
`
