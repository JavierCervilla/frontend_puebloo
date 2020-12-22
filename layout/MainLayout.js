import styled from '@emotion/styled'
import { Container } from 'react-bootstrap'
import Header from '../components/Header/Header'
import Navbar from '../components/Navbar/Navbar'
import { StyleContext } from '../context/style'
import { WithAuthSync } from '../utils/auth'

const MainLayout = ({ children, token, light, theme }) => {


    return (
        <MainLayoutStyled light={light} theme={theme} >
            <Navbar className='sidebar' light={light} />
            <div className='content'>
                {children}
            </div>
            <Header token={token} light={light} className='header' />
        </MainLayoutStyled>
    )
}

const MainLayoutStyled = styled.div`
  .content{
    height:100vh;
  }
`

export default WithAuthSync(MainLayout)