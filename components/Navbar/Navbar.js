import { useContext, useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Link from 'next/link';
import { NavItems } from './NavItems';
import { IconContext } from 'react-icons';
import styled from '@emotion/styled'

import { logout, WithAuthSync } from '../../utils/auth'
import { StyleContext } from '../../context/style';
import { Button, Container } from 'react-bootstrap';

function Navbar({ theme }) {
    const context = useContext(StyleContext)
    const { style, changeStyle } = context
    const [light, setLight] = useState(style === 'light' || true)

    const styleToggle = (e) => {
        e.preventDefault()
        console.log('style:', light)
        changeStyle()
        setLight(style === 'light')
    }

    useEffect(() => {
        setLight(style === 'light')
    }, [style])



    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => {
        console.log('window', window)
        if (sidebar) {
            setSidebar(false)
        } else {
            // FIXME: ADD LOGICA PARA BLOQUEAR EL SCROLL
            setSidebar(true)
        }
    }



    return (
        <SidebarStyled light={light}>
            <IconContext.Provider value={{ color: '#FFCF0B' }}>
                <>
                    <div className='sidebar d-flex'>
                        {/*TODO: ESTILAR SEARCHBAR */}
                        <Link href='#' >
                            <a className='menu-bars col-2 logo'>
                                {/* <FaIcons.FaBars onClick={showSidebar} /> */}
                                <img src='/images/logo.png' alt='logo' onClick={showSidebar} />
                            </a>
                        </Link>
                        <div className='col-10 container searchbar'>
                            <input type='text' placeholder='encuentra lo que busques' />
                        </div>

                    </div>
                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <div>
                            <ul className='nav-menu-items' onClick={showSidebar} >
                                <li className='navbar-toggle' onClick={showSidebar}>
                                    <Link href='#' >
                                        <a className='menu-bars nav-text'>

                                            <span className='close-btn' >Cerrar</span>
                                        </a>
                                    </Link>
                                </li>
                                {NavItems.map((item, index) =>
                                    <li key={index} className={item.cName}>
                                        <Link href={item.path}>
                                            <a>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </a>
                                        </Link>
                                    </li>
                                )
                                }
                            </ul>
                            <Button className='logout' variant='block' onClick={logout}>
                                <AiIcons.AiOutlineLogout />
                            </Button>
                            <Button className='text-lowercasegout' onClick={styleToggle} variant='block' >
                                {light ? <FaIcons.FaMoon /> : <FaIcons.FaSun />}
                            </Button>
                        </div>
                    </nav>
                    <div className={sidebar ? 'fixed-active' : 'fixed d-none'} onClick={showSidebar} ></div>
                </>
            </IconContext.Provider>
        </SidebarStyled >
    );
}

const SidebarStyled = styled.div`

    .style-toggle{
        display:block;
        position:absolute;
        bottom:5em;
        z-index:999;
    }
    .logout{
        img{
            width:42px;
            height:auto;
        }
    }

    .sidebar {
        background-color: ${({ theme, light }) => light ? `${theme.colors.light.light}25` : `${theme.colors.dark.dark}75`};
        backdrop-filter: blur(15px);
        position:fixed;
        top:0;
        width:100%;
        height: 42px;
        display: flex;
        justify-content: start;
        align-items: center;
        z-index:3;
    }
    .searchbar{
        input{
            border:solid 1px ${({ theme, light }) => light ? `${theme.colors.light.yellow}` : `${theme.colors.dark.yellow}`};
            background-color:${({ theme, light }) => light ? `${theme.colors.light.dark}25` : `${theme.colors.dark.light}25`};
            backdrop-filter: blur(5px);
            color:${({ theme, light }) => light ? `${theme.colors.light.yellow}` : `${theme.colors.dark.yellow}`};
            text-align:center;
            padding:.15em 1em .3em 1em;
            border-radius:8px;
            width:100%;
        }
        input::placeholder{
            color: ${({ theme, light }) => light ? theme.colors.light.dark : theme.colors.dark.green};
            font-size:.95em;
        }
    }

    .logo {
        padding: 0 1.5em;
        img{
            width:42px;
            height:auto;
        }
    }
    .nav-menu {
        padding-top:41px;
        background-color: ${({ theme, light }) => light ? `${theme.colors.light.light}75` : `${theme.colors.dark.dark}25`};
        backdrop-filter: blur(15px);
        width: 200px;
        height: 100vh;
        display: flex;
        justify-content: center;
        position: fixed;
        top: 0;
        left: -100%;
        transition: 850ms;
        z-index:1;
    }

    .nav-menu.active {
        z-index:5;
        left: 0;
        bottom:0;
        transition: 250ms;
        overflow:hidden;
    }

    .fixed{
        left: -100%;
        top: 0;
        transition: 850ms;
    }
    .fixed-active{
        position:fixed;
        width:100vw;
        height:100vh;
        background-color: ${({ theme, light }) => light ? `${theme.colors.light.dark}70` : `${theme.colors.dark.dark}70`};
        backdrop-filter: blur(10px);
        z-index:4;
        bottom:0;
        right:0;
        transition: 250ms;
        overflow:hidden;
    }

    .nav-text {
        font-weight: bold;
        display: flex;
        justify-content: start;
        color: ${({ theme, light }) => light ? `${theme.colors.light.dark}` : `${theme.colors.dark.light}`};
        align-items: center;
        padding: 8px 0px 8px 16px;
        list-style: none;
        height: 60px;
    }
    .nav-text.active {
        background-color:${({ theme, light }) => light ? `${theme.colors.light.green}` : `${theme.colors.dark.green}`};
    }

    .nav-text a {
        text-decoration: none;
        color: ${({ theme, light }) => light ? `${theme.colors.light.yellow}` : `${theme.colors.dark.yellow}`};
        font-size: 1em;
        width: 95%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 16px;
        border-radius: 4px;
    }

    .nav-text a:hover {
        background-color: #1a83ff;
    }

    .nav-menu-items {
        width: 100%;
    }

    .navbar-toggle {
        background-color: ${({ theme, light }) => light ? `${theme.colors.light.dark}15` : `${theme.colors.dark.light}15`};
        backdrop-filter: blur(10px);
        * {
            color: ${({ theme, light }) => light ? `${theme.colors.light.light}` : `${theme.colors.dark.dark}`};
        }
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: start;
        * {
            margin-left:1em;
        }
        align-items: center;
    }

    span {
        margin-left: 10px;
    }
    .close-btn{
        color: ${({ theme, light }) => light ? `${theme.colors.light.dark}` : `${theme.colors.dark.light}`};
    }
    
`
export default WithAuthSync(Navbar)