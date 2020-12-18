import React, { createContext, useReducer } from 'react'


//CONSTANTS

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'


const initialState = {
    user: null
}


const AuthContext = createContext({
    user: null,
    login: (userData) => { },
    logout: () => { }
})

function authReducer(state, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload
            }
        case LOGOUT_USER:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }

}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, { user: null })

    function login(userData) {

        dispatch({
            type: LOGIN_USER,
            payload: userData
        })
    }

    function logout() {

        dispatch({ type: LOGOUT_USER })
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider }