import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { Grid } from '@material-ui/core'
import {GetPokemonList} from '../Redux/Actions/PokemonActions'
import ReactPaginate from 'react-paginate'
import PokemonCard from './Card'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import './paginationStyle.css'

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
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(to right bottom, rgba(255, 255, 235, 0.7),rgba(255, 255, 255, 0.3))',
        borderRradius: '2rem',
        backdropFilter: 'blur( 6.0px )',
        border: '1px solid rgba( 255, 255, 255, 0.18 )',
        WebkitBackdropFilter: 'blur(6.0px)',
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
            <div className="pagination">
                {!_.isEmpty(pokemonList.data) && (
                    <ReactPaginate 
                        pageCount={Math.ceil(pokemonList.count) / 16}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        onPageChange={(data) => fetchData(data.selected + 1)}
                        containerClassName={"pagination-list"}
                    />
                )}
            </div>
        </div>
    )
}

export default PokemonList
