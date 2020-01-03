import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'
import { auth, users } from '../components/contexts/firebase'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import Board from '../pages/Board'
import AdminPage from '../pages/AdminPage'
import SignUpPage from '../pages/SignUpPage'
import ProfilePage from '../pages/ProfilePage'
import TeamPage from '../pages/TeamPage'

import { useAuthorizationDispatchContext } from '../components/contexts/Authorization'

const AppRouter = () => {
  const [currentUser, setCurrentUser] = React.useState()
  const [userRole, setUserRole] = React.useState('GUEST')
  const dispatch = useAuthorizationDispatchContext()

  React.useMemo(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user)
        users().child(user.uid).child('role').on('value', snapshot => {
          setUserRole(snapshot.val())
        })
        dispatch({ type: 'SET_AUTHORIZATION', userRole })
      } else {
        console.error('No')
      }
    })
  }, [currentUser, userRole])

  return (
    <BrowserRouter>
      {currentUser ? (
        <Switch>
          <Route exact path="/"><LandingPage currentUser={currentUser} /></Route>
          <Route exact path="/board/:boardId"><Board currentUser={currentUser} /></Route>
          {userRole === 'ADMIN' && (
            <Route exact path="/admin"><AdminPage currentUser={currentUser} /></Route>
          )}
          <Route exact path="/user/:uid"><ProfilePage currentUser={currentUser} /></Route>
          <Route exact path="/team/:tid"><TeamPage currentUser={currentUser} /></Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/"><LoginPage /></Route>
          <Route exact path="/signup"><SignUpPage /></Route>
        </Switch>
      )}
    </BrowserRouter>
  )
}

export default AppRouter
