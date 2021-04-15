import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetPokemon } from '../Redux/Actions/PokemonActions'
import _ from 'lodash'

const Pokemon = (props) => {
    const pokemonName = props.match.params.pokemon 
    const dispatch = useDispatch()
    const pokemon = useSelector(state => state.Pokemon)

    useEffect(() => {
        dispatch(GetPokemon(pokemonName))
    }, [])

    const showData = () => {
        if(!_.isEmpty(pokemon.data[pokemonName])) {
            return <h2>{pokemon.data[pokemonName].name}</h2>
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
