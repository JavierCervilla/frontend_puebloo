import { useEffect } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

export const login = ({ token }) => {
    cookie.set('token', token, { expires: 1 })
    Router.push('/')
}

export const auth = ctx => {
    const { token } = nextCookie(ctx)
    console.log('token in auth:', token)
    // If there's no token, it means the user is not logged in.
    if (!token || token === undefined) {
        if (typeof window === 'undefined') {
            return jwt.sign(
                {
                    username: "guest",
                    rol: "guest",
                },
                "tuvieja",
                { expiresIn: '1h' })
            /*             ctx.res.writeHead(302, { Location: '/register' })
                        ctx.res.end() */
        } else {
            return jwt.sign(
                {
                    username: "guest",
                    rol: "guest",
                },
                "tuvieja"
                ,
                { expiresIn: '1h' })
            //Router.push('/login')
        }
    }

    return token
}

export const logout = () => {
    cookie.remove('token')
    // to support logging out from all windows
    window.localStorage.setItem('logout', Date.now())
    Router.push('/login')
}

export const WithAuthSync = WrappedComponent => {
    const Wrapper = props => {
        const syncLogout = event => {
            if (event.key === 'logout') {
                console.log('logged out from storage!')
                Router.push('/login')
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
