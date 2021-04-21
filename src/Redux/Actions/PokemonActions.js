import axios from 'axios'


export const GetPokemonList = (page) => async dispatch => {
    try {
        dispatch({
            type: 'POKEMON_LIST_LOADING'
        });

        const perPage = 16;
        const offset = (page * perPage) - perPage;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${perPage}&offset=${offset}`)

        dispatch({
            type: 'POKEMON_LIST_SUCCESS',
            payload: response.data
        });

    } catch (e) {
        dispatch({
            type: 'POKEMON_LIST_FAIL',
        })
    }
}

export const GetPokemon = (pokemon) => async dispatch => {
    try {
        dispatch({
            type: 'POKEMON_MULTIPLE_LOADING'
        });
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

        dispatch({
            type: 'POKEMON_MULTIPLE_SUCCESS',
            payload: response.data,
            pokemonName: pokemon
        });

    } catch (e) {
        dispatch({
            type: 'POKEMON_MULTIPLE_FAIL',
        })
    }
}

export const GetPokemonTypes = () => async dispatch => {
    try {
        dispatch({
            type: 'POKEMON_TYPES_LOADING'
        });
        const response = await axios.get(`https://pokeapi.co/api/v2/type`)

        dispatch({
            type: 'POKEMON_TYPES_SUCCESS',
            payload: response.data,
        });

    } catch (e) {
        dispatch({
            type: 'POKEMON_TYPES_FAIL',
        })
    }
}
export const GetPokemonType = (type) => async dispatch => {
    try {
        dispatch({
            type: 'POKEMON_TYPE_LOADING'
        });
        const res = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)

        dispatch({
            type: 'POKEMON_TYPE_SUCCESS',
            payload:  res.data,
            pokemonType: type
        });

    } catch (e) {
        dispatch({
            type: 'POKEMON_TYPE_FAIL',
        })
    }
}