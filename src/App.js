import React from 'react'
import './App.css'
import Login from './Logo'
import SignIn from './SignIn'

import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Activity from './Activity'
import Logo from './Logo'


const App = () => {
  return (
    <Router>
        <div className='axios'>
          <Switch>
            <Route exact path='/'>
              <Logo />
            </Route>
            <Route path='/activity'>
              <Activity />
            </Route>
          </Switch>          
        </div>
    </Router>
    
  )
}

export default App
