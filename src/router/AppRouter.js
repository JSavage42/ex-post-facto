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
import TeamPage from '../pages/TeamPage'

import { AuthContextProvider } from '../components/contexts/AuthContext'

const AppRouter = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/"><LoginPage /></Route>
          <Route exact path="/home"><LandingPage /></Route>
          <Route exact path="/board/:boardId"><Board /></Route>
          <Route exact path="/admin"><AdminPage /></Route>
          <Route exact path="/user/:uid"><ProfilePage /></Route>
          <Route exact path="/team/:tid"><TeamPage /></Route>
          <Route exact path="/signup"><SignUpPage /></Route>
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default AppRouter
