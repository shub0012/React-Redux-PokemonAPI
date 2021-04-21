const DefaultState ={
    loading: false,
    data: [],
    errorMsg:''
}

const PokemonTypeReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case 'POKEMON_TYPES_LOADING':
            return{
                ...state,
                loading: true,
                errorMsg:''
            }
        case 'POKEMON_TYPES_FAIL':
            return{
                ...state,
                loading: false,
                errorMsg:'Unable to fetch types'
            } 
        case 'POKEMON_TYPES_SUCCESS':
            return{                
                ...state,
                loading: false,
                errorMsg:'',
                data: action.payload.results,
                count: action.payload.count
            }
        default:
                return state
    }
}

export default PokemonTypeReducer