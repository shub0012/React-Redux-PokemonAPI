import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import {GetPokemonList} from '../Redux/Actions/PokemonActions'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

const PokemonList = (props) => {
    const dispatch = useDispatch()
    const pokemonList = useSelector(state => state.PokemonList)
    const [search, setSearch] = useState('')

    const fetchData = (page = 1) => {
        dispatch(GetPokemonList(page))
    }

    useEffect(() => {
        fetchData(2)
    }, [])
    console.log(pokemonList.data)
    const showData = () => {
        if(pokemonList.loading) {
            return <p>loading...</p>
        }
        if(!_.isEmpty(pokemonList.data)) {
            return pokemonList.data.map(pokemon => {
                return(
                    <div>
                        {pokemon.name}
                        <img src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} alt={pokemon.name} height="240" width="240"/>
                        <Link to={`/pokemon/${pokemon.name}`}>View More</Link>
                    </div>
                )
            })
        }

        if(pokemonList.errorMsg !== ""){
            return <p>{pokemonList.errorMsg}</p>
        }

        return <p>Unable to get data</p>
    }

    return (
        <div>
            <div>
                <p>Search</p>
                <input type="text" onChange={e => setSearch(e.target.value)} />
                <button onClick={() => props.history.push(`/pokemon/${search}`)}>Search</button>
            </div>
            {showData()}
            <div>
                {!_.isEmpty(pokemonList.data) && (
                    <ReactPaginate 
                        pageCount={Math.ceil(pokemonList.count) / 16}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        onPageChange={(data) => fetchData(data.selected + 1)}
                        containerClassName={"pagination"}
                    />
                )}
            </div>
        </div>
    )
}

export default PokemonList
