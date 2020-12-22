import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import * as BiIcons from "react-icons/bi"


export const NavItems = [
    {
        title: 'Perfil',
        path: '/',
        icon: <AiIcons.AiOutlineProfile />,
        cName: 'nav-text'
    },
    {
        title: 'Notificaciones',
        path: '/',
        icon: <IoIcons.IoMdAlarm />,
        cName: 'nav-text'
    },
    {
        title: 'Configuracion',
        path: '/',
        icon: <FaIcons.FaAdjust />,
        cName: 'nav-text'
    },
    {
        title: 'Centro de ayuda',
        path: '/',
        icon: <IoIcons.IoMdHelp />,
        cName: 'nav-text'
    },
    {
        title: 'Politica de privacidad',
        path: '/',
        icon: <FaIcons.FaUserSecret />,
        cName: 'nav-text'
    },
    {
        title: 'Crear Publicacion',
        path: '/',
        icon: <FaIcons.FaPlusCircle />,
        cName: 'nav-text'
    },
]