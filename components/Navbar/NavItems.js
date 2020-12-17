import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import * as BiIcons from "react-icons/bi"


export const NavItems = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Login',
        path: '/signin',
        icon: <IoIcons.IoMdLogIn />,
        cName: 'nav-text'
    },
    {
        title: 'Signup',
        path: '/signup',
        icon: <FaIcons.FaSignInAlt />,
        cName: 'nav-text'
    }
]

