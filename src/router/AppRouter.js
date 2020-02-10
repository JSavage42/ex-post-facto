import React, { Fragment } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'

import AdminPage from '../pages/AdminPage'
import Board from '../pages/Board'
import Header from '../components/Header'
import IsOnlineBanner from '../components/IsOnlineBanner'
import LandingPage from '../pages/LandingPage'
// import LoginPage from '../pages/LoginPage'
import ProfilePage from '../pages/ProfilePage'
// import SignUpPage from '../pages/SignUpPage'
import TeamPage from '../pages/TeamPage'

const AppRouter = () => {
  return (
    <Fragment>
      <IsOnlineBanner />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/"><LandingPage /></Route>
          <Route exact path="/board/:boardId"><Board /></Route>
          <Route exact path="/admin"><AdminPage /></Route>
          <Route exact path="/user/:uid"><ProfilePage /></Route>
          <Route exact path="/team/:tid"><TeamPage /></Route>
        </Switch>
      </BrowserRouter>
    </Fragment>
  )
}

export default AppRouter
