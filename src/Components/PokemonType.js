import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetPokemonTypes } from '../Redux/Actions/PokemonActions'
import _ from 'lodash'
import {AppBar, Toolbar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import './pokemonType.css'

const PokemonType = () => {
    const dispatch = useDispatch()
    const pokemonTypeList = useSelector(state => state.PokemonTypes)

    const fetchData = () => {
        dispatch(GetPokemonTypes())
    }

    useEffect(() => {
        fetchData()
    },[])

    const showData = () => {
        if(pokemonTypeList.loading) {
            return <p>Loadding...</p>
        }

        if(!_.isEmpty(pokemonTypeList.data)) {
            return (
                <div className="pokemonTypeContainer">
                    {pokemonTypeList.data?.map(pokemonType => {
                        return (
                            <div className="pokemonType">
                                {pokemonType.name.charAt(0).toUpperCase() + pokemonType.name.slice(1)}
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
    return (
        <div>
            <div>
                <AppBar className="navigation">
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                           <Link to='/' className="linkText">PokeDex</Link> 
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            {showData() }
        </div>
    )
}

export default PokemonType
