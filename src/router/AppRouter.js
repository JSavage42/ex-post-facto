import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Board from '../pages/Board'
import AdminPage from '../pages/AdminPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><LandingPage /></Route>
        <Route exact path="/board/:boardId"><Board /></Route>
        <Route exact path="/admin"><AdminPage /></Route>
      </Switch>
    </BrowserRouter>
  )
}
