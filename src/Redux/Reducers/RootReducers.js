import { combineReducers } from "redux"
import PokemonListReducer from './PokemonListReducer'
import PokemonMultipleReducer from "./PokemonMultipleReducer"
import PokemonTypeReducer from './PokemonTypeReducer'

const RootReducer = combineReducers({
    PokemonList: PokemonListReducer,
    Pokemon: PokemonMultipleReducer,
    PokemonTypes: PokemonTypeReducer
})

export default RootReducer