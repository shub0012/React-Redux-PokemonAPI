import React from 'react'
import './App.css'
import { Switch, Route, Redirect } from "react-router-dom"
import PokemonList from './Components/PokemonList'
import Pokemon from './Components/Pokemon'

const App = () => {
  return (
    <div className="container container-img">
      <Switch>
        <Route path={'/'} exact component={PokemonList} />
        <Route path={'/pokemon/:pokemon'} exact component={Pokemon} />
        <Redirect to={'/'} />
      </Switch>
    </div>
  ) 
}

export default App

