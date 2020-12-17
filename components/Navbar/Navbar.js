// LOGIC
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NavItems } from './NavItems'
//  STYLES
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as BiIcons from "react-icons/bi"
// Styled Components
import styled from '@emotion/styled'





const Navbar = ({ title }) => {
    const router = useRouter()
    const [sidebar, setSidebar] = useState(false)

    const showShidebar = () => setSidebar(!sidebar)

    return (
        <NavbarStyled>
            <Link href={router.asPath.endsWith('#') ? `${router.asPath}` : `${router.asPath}#`}  >
                <a className='menu-bars'>
                    <FaIcons.FaBars onClick={showShidebar} />
                </a>
            </Link>
            <Link href='/'>
                <a className='nav-title nav-text' onClick={(e) => setSidebar(false)}>
                    < BiIcons.BiFoodMenu />
                    <h2>
                        {title}
                    </h2>
                </a>
            </Link>

            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} >
                <ul className='nav-menu-items' >
                    <li className='nav-text'>
                        <Link href={router.asPath.endsWith('#') ? `${router.asPath}` : `${router.asPath}#`} >
                            <a onClick={showShidebar}>
                                <AiIcons.AiOutlineClose />
                                <span>
                                    Close
                                </span>
                            </a>
                        </Link>
                    </li>
                    {NavItems.map((item, index) => {
                        return (
                            < li key={`nav-item-${index}`} className={item.cName}>
                                <Link href={item.path} >
                                    <a onClick={showShidebar}>
                                        {item.icon}
                                        <span>
                                            {item.title}
                                        </span>
                                    </a>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </NavbarStyled >

    )
}



const NavbarStyled = styled.header`
position: absolute;
width: 100%;
background-color: ${props => props.theme.colors.primary};
height: 70px;
display: flex;
justify-content: flex-start;
align-items: center;
z-index: 99999;
color: ${props => props.theme.colors.light};

.menu-bars {
    margin-left: 2rem;
    background: none;
}
.menu-bars:hover {
    color: ${props => props.theme.colors.secondary};
    transform:scale(1.3);
}

.nav-title{
    margin: auto;
}
.nav-title:hover{
    color: ${props => props.theme.colors.secondary};
    transform:scale(1.05);
}

.nav-menu {
    background-color: ${props => props.theme.colors.primary};
    height: 100vh;
    width: 140px;
    display: flex;
    justify-content: center;
    position: fixed;
    top:0;
    left: -100%;
    transition: 850ms;
}

.nav-menu.active {
    left: 0;
    transition: 350ms;
}

.nav-text {
    display:flex;
    justify-content: center;
    align-items: center;

    list-style: none;
    height: 60px;

    a {
        text-decoration: none;
        color: ${props => props.theme.colors.secondary};
        font-size: 18px;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
        border-radius:4px;
    }
    a:hover {
        background-color: ${props => props.theme.colors.alert};
        box-shadow: 5px 5px 2px 0px rgba(0,0,0,0.75);
    }
}


.nav-menu-items {
    width: 100%;
    .navbar-toggle {
        padding: 2em;
        margin-top:1.5rem;
        background-color: red;
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
}


`


export default Navbar