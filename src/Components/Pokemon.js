import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetPokemon } from '../Redux/Actions/PokemonActions'
import _ from 'lodash'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import './pokemonStyle.css'

const Pokemon = (props) => {
    const pokemonName = props.match.params.pokemon 
    const dispatch = useDispatch()
    const pokemon = useSelector(state => state.Pokemon)

    useEffect(() => {
        dispatch(GetPokemon(pokemonName))
    }, [])

    const showData = () => {
        if(!_.isEmpty(pokemon.data[pokemonName])) {
            return (
                <section>
                    <div className="container">
                        <div className="heading">
                            <h1>{pokemon.data[pokemonName].name.charAt(0).toUpperCase() + pokemon.data[pokemonName].name.slice(1)}</h1>
                            <span></span>
                            <h2>#{pokemon.data[pokemonName].id}</h2>
                        </div>
                        <div className="grid-container">
                            <div className="grid-item col1">
                                <img src={pokemon?.data[pokemonName]?.sprites?.other?.dream_world?.front_default} alt={pokemon.data[pokemonName].name} height="200"
                                width="189" />
                            </div>
                            <div className="grid-item col2">
                                <TableContainer component={Paper} className="tableContainer">
                                    <Table aria-label="feature table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className="tableHeader">Features</TableCell>
                                                <TableCell align="right" className="tableHeader">Values</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody >
                                            <TableRow >
                                                <TableCell component="th" scope="row" className="tableBody" >
                                                    Height
                                                </TableCell>
                                                <TableCell align="right" className="tableBody" >
                                                    {pokemon.data[pokemonName].height}'
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row" className="tableBody">
                                                    Weight
                                                </TableCell>
                                                <TableCell align="right" className="tableBody">
                                                {pokemon.data[pokemonName].weight}lbs
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row" className="tableBody">
                                                    Abilities
                                                </TableCell>
                                                <TableCell align="right" className="tableBody">
                                                {pokemon.data[pokemonName].abilities.map(ability => `${ability.ability.name} `)}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>  
                            </div>
                        </div>
                    </div>
                </section>
            )
        }

        if(pokemon.loading){
            return <p>Loading...</p>
        }

        if(pokemon.errorMsg !== '') {
            return <p>{pokemon.errorMsg}</p>
        }

        return <p>error getting Pokemon</p>
    }
    return (
        <div>
            {showData()}
        </div>
    )
}

export default Pokemon
