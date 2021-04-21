import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetPokemon } from '../Redux/Actions/PokemonActions'
import { Bar } from 'react-chartjs-2'
import _ from 'lodash'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AppBar, Toolbar, Typography } from '@material-ui/core'
import './pokemonStyle.css'
import { Link } from 'react-router-dom'

const Pokemon = (props) => {
    const pokemonName = props.match.params.pokemon 
    const dispatch = useDispatch()
    const pokemon = useSelector(state => state.Pokemon)

    useEffect(() => {
        dispatch(GetPokemon(pokemonName))
    }, [])

    const showData = () => {
        if(!_.isEmpty(pokemon.data[pokemonName])) {

            const labelName = pokemon.data[pokemonName].stats.map((stat) => stat.stat.name)
            const labelData = pokemon.data[pokemonName].stats.map((stat) => stat.base_stat)
            console.log(labelName,labelData)

            const barChart = (
                pokemon.data[pokemonName]
                 ? (
                    <Bar
                        data={{
                            labels: [...labelName],
                            datasets: [{
                                label: 'Stats',
                                backgroundColor: ['rgba(255, 99, 132, 0.5)',
                                'rgba(255, 159, 64, 0.5)',
                                'rgba(255, 205, 86, 0.5)',
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(153, 102, 255, 0.5)',],
                                data: [...labelData],
                                borderWidth: 1,
                                borderColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(255, 159, 64)',
                                    'rgb(255, 205, 86)',
                                    'rgb(75, 192, 192)',
                                    'rgb(54, 162, 235)',
                                    'rgb(153, 102, 255)',
                                    'rgb(201, 203, 207)'
                                  ],
                                  hoverBackgroundColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(255, 159, 64)',
                                    'rgb(255, 205, 86)',
                                    'rgb(75, 192, 192)',
                                    'rgb(54, 162, 235)',
                                    'rgb(153, 102, 255)',
                                    'rgb(201, 203, 207)'
                                  ]
                            }]
                        }}
                        options={{
                            legend: { display: true },
                            title: { display: true, text: `${pokemon.data[pokemonName].name} Stats`},
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                  grid: {
                                    offset: true,
                                  },
                                  stacked: true
                                }],
                                xAxes: [{
                                    stacked: true,
                                    grid: {
                                      offset: true
                                    }
                                }]
                              },
                        }}
                    />
                 ): null
            )

            return (
                <section>
                    <div>
                    <AppBar className="navigation">
                    <Toolbar>
                        <Typography variant="h6" noWrap >
                           <Link to='/' className="linkText">PokeDex</Link> 
                        </Typography>
                    </Toolbar>
                </AppBar>
                </div>
                    <div className="container">
                        <div className="heading">
                            <h1>{pokemon.data[pokemonName].name.charAt(0).toUpperCase() + pokemon.data[pokemonName].name.slice(1)}</h1>
                            <span></span>
                            <h2>#{pokemon.data[pokemonName].id}</h2>
                        </div>
                        <div className="grid-container">
                            <div className="grid-item col1">
                                <img src={pokemon?.data[pokemonName]?.sprites?.other?.dream_world?.front_default} alt={pokemon.data[pokemonName].name} className="pokemonImg" />
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
                                            <TableRow>
                                                <TableCell component="th" scope="row" className="tableBody">
                                                    Type
                                                </TableCell>
                                                <TableCell align="right" className="tableBody">
                                                {pokemon.data[pokemonName].types.map(type => `${type.type.name} `)}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>  
                            </div>
                        </div>
                        <div className="barChart">
                            {pokemon.data[pokemonName] ? barChart : 'Loading...'}
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
