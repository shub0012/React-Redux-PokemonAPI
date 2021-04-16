import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { Grid } from '@material-ui/core'
import {GetPokemonList} from '../Redux/Actions/PokemonActions'
import ReactPaginate from 'react-paginate'
import PokemonCard from './Card'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles((theme) =>({
    root: {
        flexGrow: 1,
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        
      },
  }));

const PokemonList = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const pokemonList = useSelector(state => state.PokemonList)
    const [search, setSearch] = useState('')

    const fetchData = (page = 1) => {
        dispatch(GetPokemonList(page))
    }

    useEffect(() => {
        fetchData()
    }, [])
    console.log(pokemonList.data)
    const showData = () => {
        if(pokemonList.loading) {
            return <p>loading...</p>
        }
        if(!_.isEmpty(pokemonList.data)) {
            return (
                <main className={clsx(classes.content)} >
                <Grid container justify="center" spacing={2}>
                {pokemonList.data.map(pokemon => {
                return( 
                    <Grid item key={pokemon.name} xs={12} sm={6} md={4} lg={3}>
                        <PokemonCard pokemon={pokemon.name} />
                    </Grid>
                )
            })}
            </Grid>
            </main>
            )}

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
