import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import Board from '../pages/Board'
import AdminPage from '../pages/AdminPage'
import SignUpPage from '../pages/SignUpPage'
import ProfilePage from '../pages/ProfilePage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><LoginPage /></Route>
        <Route exact path="/home"><LandingPage /></Route>
        <Route exact path="/board/:boardId"><Board /></Route>
        <Route exact path="/admin"><AdminPage /></Route>
        <Route exact path="/profile"><ProfilePage /></Route>
        <Route exact path="/signup"><SignUpPage /></Route>
      </Switch>
    </BrowserRouter>
  )
}
