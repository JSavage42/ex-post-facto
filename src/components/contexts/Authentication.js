import React from 'react'
import { auth } from './firebase'

const AuthenticationContext = React.createContext()

const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = React.useState({})
  auth.onAuthStateChanged(user => {
    if (user) {
      setUser(user)
    } else {
      console.error('No user signed in.')
    }
  })

  return (
    <AuthenticationContext.Provider value={user}>
      {children}
    </AuthenticationContext.Provider>
  )
}


const useAuthenticationContext = () => {
  const context = React.useContext(AuthenticationContext)
  if (context === undefined) {
    throw new Error('useAuthenticationContext must be used with a AuthenticationContext')
  } return context
}

export {
  AuthenticationContextProvider,
  useAuthenticationContext,
}
