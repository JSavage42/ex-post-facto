import React, { Fragment, useState } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'

import AdminPage from '../pages/AdminPage'
import Board from '../pages/Board'
import Header from '../components/Header'
import LandingPage from '../pages/LandingPage'
import DashboardPage from '../pages/DashboardPage'
import ProfilePage from '../pages/ProfilePage'
import TeamPage from '../pages/TeamPage'

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  return (
    <BrowserRouter>
      {!isLoggedIn && (
        <Route exact path="/"><LandingPage /></Route>
      )}
      {isLoggedIn && (
        <Fragment>
          <Header />
          <Switch>
            <Route exact path="/"><DashboardPage /></Route>
            <Route exact path="/board/:boardId"><Board /></Route>
            <Route exact path="/admin"><AdminPage /></Route>
            <Route exact path="/user/:uid"><ProfilePage /></Route>
            <Route exact path="/team/:tid"><TeamPage /></Route>
          </Switch>
        </Fragment>
      )}
    </BrowserRouter>
  )
}

export default AppRouter
