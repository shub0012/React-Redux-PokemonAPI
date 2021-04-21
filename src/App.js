import React from 'react'
import './App.css'
import { Switch, Route, Redirect } from "react-router-dom"
import PokemonList from './Components/PokemonList'
import Pokemon from './Components/Pokemon'

const App = () => {
  return (
    <>
    <main>
      <section>
        <Switch>
        <Route path={'/'} exact component={PokemonList} />
        <Route path={'/pokemon/:pokemon'} exact component={Pokemon} />
        <Redirect to={'/'} />
      </Switch>
      <footer>
        <div className="footer">
            <a href="https://github.com/shub0012/React-Redux-PokemonAPI" target="_blank" rel="noopener noreferrer">GitHub</a>
            <p>shubhams4455@gmail.com</p>
        </div>
      </footer>
      </section> 
      
    </main>
    </>
  ) 
}

export default App

