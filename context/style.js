import React, { createContext, useReducer } from 'react'


//CONSTANTS

export const LIGHT_STYLE = 'light'
export const DARK_STYLE = 'dark'
export const CHANGE_STYLE = 'CHANGE_STYLE'

const styleFromLocalStorage = () => typeof (localStorage) !== 'undefined' && !!localStorage.getItem('style') ? localStorage.getItem('style') : LIGHT_STYLE

console.log('styleFromLocalStorage:', styleFromLocalStorage())

const StyleContext = createContext({
    style: styleFromLocalStorage(),
    changeStyle: () => { }
})

function styleReducer(state, action) {
    switch (action.type) {
        case CHANGE_STYLE:
            return {
                ...state,
                style: action.payload
            }
        default:
            return state;
    }

}

function StyleProvider(props) {
    const [state, dispatch] = useReducer(styleReducer, { style: LIGHT_STYLE })

    function changeStyle() {
        let payload = ''
        if (state.style === LIGHT_STYLE) {
            payload = DARK_STYLE
        } else {
            payload = LIGHT_STYLE
        }
        localStorage.setItem('style', payload)
        dispatch({
            type: CHANGE_STYLE,
            payload
        })
    }
    return (
        <StyleContext.Provider
            value={{ style: state.style, changeStyle }}
            {...props}
        />
    )
}

export { StyleContext, StyleProvider }