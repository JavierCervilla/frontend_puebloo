import { useEffect } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

export const login = ({ token }) => {
    console.log('2.-token>>>>>', token)
    cookie.set('token', token, { expires: 1 })
    typeof window !== 'undefined' && window.localStorage.setItem('token', token)

    typeof window !== 'undefined' && console.log('token form storage:', window.localStorage.getItem('token'))
    Router.push('/')
}

export const auth = ctx => {
    /**
     *  Cliente:
     *      - token en localstorage
     *      - token en cookie
     *  Server:
     *      - token en cookie
     * 
     */

    // 1 obtener el token
    // distinguimos entre cliente y server para obtenerlo
    const token = {
        client: undefined,
        server: undefined,
        common: undefined
    }

    if (typeof window === 'undefined') {
        /** ESTAMOS EN EL SERVIDOR */
        console.log('entro en la zona del server')
        token.server =
            !!cookie.get('token')
                ? cookie.get('token') :
                jwt.sign({
                    username: "guest",
                    rol: "guest",
                }, "42MadridFundacionTelefonicas",
                    { expiresIn: '1h' })
        token.common = token.server
    } else {
        console.log('entro en la zona de client')
        token.client =
            !!cookie.get('token')
                ? cookie.get('token') :
                !!window.localStorage.getItem('token') ?
                    window.localStorage.getItem('token') :
                    jwt.sign({
                        username: "guest",
                        rol: "guest",
                    }, "42MadridFundacionTelefonicas",
                        { expiresIn: '1h' })
        token.common = token.client
    }


    // TENEMOS EL TOKEN PARA LOS DOS AMBIENTES EN TOKEN.COMMON

    console.log('token.common:', token.common)

    return token.common
}

export const logout = () => {
    cookie.remove('token')
    // to support logging out from all windows
    window.localStorage.removeItem('token')
    window.localStorage.setItem('logout', Date.now())
    Router.push('/login')
}

export const WithAuthSync = WrappedComponent => {
    const Wrapper = props => {
        const syncLogout = event => {
            if (event.key === 'logout') {
                console.log('logged out from storage!')
                Router.push('/')
            }
        }

        useEffect(() => {
            window.addEventListener('storage', syncLogout)

            return () => {
                window.removeEventListener('storage', syncLogout)
                window.localStorage.removeItem('logout')
            }
        }, [])

        return <WrappedComponent {...props} />
    }

    Wrapper.getInitialProps = async ctx => {
        const token = auth(ctx)

        const componentProps =
            WrappedComponent.getInitialProps &&
            (await WrappedComponent.getInitialProps(ctx))

        return { ...componentProps, token }
    }

    return Wrapper
}
