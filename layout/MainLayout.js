import React from 'react'
import Header from '../components/Header/Header'
import { WithAuthSync } from '../utils/auth'

const MainLayout = ({ children, token }) => {
    return (
        <>
            {children}
            <Header token={token} />
        </>
    )
}

export default WithAuthSync(MainLayout)