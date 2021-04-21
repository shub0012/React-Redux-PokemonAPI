import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { Grid, AppBar, Toolbar, Button, Typography, InputBase  } from '@material-ui/core'
import {GetPokemonList} from '../Redux/Actions/PokemonActions'
import ReactPaginate from 'react-paginate'
import PokemonCard from './Card'
import { makeStyles, fade } from '@material-ui/core/styles'
import clsx from 'clsx'
import SearchIcon from '@material-ui/icons/Search'
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
        borderRradius: '1rem',
        backdropFilter: 'blur( 6.0px )',
        border: '1px solid rgba( 255, 255, 255, 0.18 )',
        WebkitBackdropFilter: 'blur(6.0px)',
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        display: 'none',
        color: '#000',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
        fontWeight:'bold'
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
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
            <div className={clsx(classes.root)}>
                <AppBar position="sticky" className="navigation">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap >
                            PokeDex
                        </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search'}}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <Button onClick={() => props.history.push(`/pokemon/${search}`)} variant="outlined" color="primary">Search</Button>
                    </div>
                    </Toolbar>
                </AppBar>
            
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
        </div>
    )
}

export default PokemonList
