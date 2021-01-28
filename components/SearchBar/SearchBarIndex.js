import React, { useState, useEffect } from 'react'

import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/client';

import styled from '@emotion/styled'
import * as AiIcons from 'react-icons/ai'

import { WithAuthSync } from "../../utils/auth";



const ListItem = ({ id, name, index, token }) => {
    /** DEFINING MUTATION */
    const [joinPueblo] = useMutation(JOIN_PUEBLO_MUTATION, {
        variables: { puebloId: id },
        context: {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    });

    const joinPuebloHandler = (e) => {
        e.preventDefault()
        console.log('click-pueblo:', id)
        joinPueblo()
    }
    return (
        < li key={id} className='pueblo-li p-2'>
            <h1 className='li-name'>{name}</h1>
            <AiIcons.AiOutlineUserAdd onClick={(e) => joinPuebloHandler(e)} className='li-toggle' />
        </ li>
    )
}


const SearchBarIndex = ({ theme, light, token }) => {
    /** USE QUERY TO FETCH PUEBLOS TO FILTER,
     * //TODO: CHANGE THIS QUERY TO INDEX PAGE FOR STATIC GENERATION AND LOAD IN FIRST APP CHARGE
    */

    const data = useQuery(FETCH_PUEBLOS_QUERY);
    const [filtered, setFiltered] = useState(false)
    const [pueblosData, setPueblosData] = useState(false)






    useEffect(() => {
        if (!data.loading && !!data.data.getPueblos)
            setPueblosData(data.data.getPueblos)

    }, [data])





    console.log('getPueblos', pueblosData)

    const changeHandler = (e) => {
        e.preventDefault()
        //console.log('pueblosData:', pueblosData)
        if (e.target.value.length % 3 === 0 && e.target.value.length !== 0) {
            let filter = pueblosData.filter(p =>
                p.name.includes(e.target.value)
            )
            setFiltered(filter)
        }
        if (e.target.value.length === 0) {
            setFiltered(false)
        }
    }

    return (
        <SearchBarStyled theme={theme} light={light} className=''>
            {data.loading ?
                <div className='container text-center'>
                    <h1 className='loader spinner-border'>
                        <img src='/images/logo.png' />
                    </h1>
                </div>
                :
                <>
                    <h1 className='title'>¿Y tú de quién eres?</h1><br />
                    <div className='form-container' >
                        <input className='search-bar' type='text' placeholder='Encuentra tu pueblo' onChange={changeHandler} />
                    </div>
                    { filtered &&
                        <div className='results'>
                            <ul>

                                {
                                    filtered.map(({ id, name }, index) => (
                                        <ListItem key={id} id={id} name={name} index={index} token={token} />
                                    ))
                                }
                            </ul>
                        </div>
                    }
                </>
            }
        </SearchBarStyled >
    )

}

/** GRAPHQL GETPUEBLOS QUERY */

const FETCH_PUEBLOS_QUERY = gql`
    query{
        getPueblos {
            id
            name
        }
    }
`

/** GRAPHQL JOINPUEBLO MUTATION */

const JOIN_PUEBLO_MUTATION = gql`
    mutation($puebloId:ID!){
        joinPueblo(puebloId:$puebloId)
    }
`


const SearchBarStyled = styled.div`
    display:block;
    margin:5em auto;
    .loader{
        border: none;
    }
    

    .title{
        font-size: 1.5em;
        color: ${({ theme, light }) => light ? `${theme.colors.light.yellow}` : `${theme.colors.dark.yellow}`};
    }
    .form-container{
        text-align:center;
        input{
            border:solid 1px ${({ theme, light }) => light ? `${theme.colors.light.yellow}` : `${theme.colors.dark.yellow}`};
            background-color:${({ theme, light }) => light ? `${theme.colors.light.dark}25` : `${theme.colors.dark.dark}25`};
            backdrop-filter: blur(15px);
            color:${({ theme, light }) => light ? `${theme.colors.light.yellow}` : `${theme.colors.dark.yellow}`};
            text-align:center;
            padding:.15em 1em .3em 1em;
            border-radius:8px;
            width:100%;
            height:2em;
        }
        input::placeholder{
            color: ${({ theme, light }) => light ? theme.colors.light.green : theme.colors.dark.green};
            font-size:.95em;
        }
    }
    .results{
        overflow:auto;
        margin-top:1em;
        width:100%;
        height:50vh;
        border: solid 2px ${({ theme, light }) => light ? `${theme.colors.light.yellow}` : `${theme.colors.dark.yellow}`};
        border-radius:1em;
        background-color:${({ theme, light }) => light ? `${theme.colors.light.dark}25` : `${theme.colors.dark.dark}25`};
        backdrop-filter: blur(15px);
        .pueblo-li{
            display: flex;
            flex-direction:row;
            color:white;
            justify-content:space-between;
            .li-name{
                font-size:.75em;
            }
            .li-toggle{
                font-size:1.3em;
            }

        }
    }

`

export default SearchBarIndex
