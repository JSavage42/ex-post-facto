import React from 'react'
import { auth } from '../FirebaseAPI/firebase'

const AuthContext = React.createContext()

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState({})
  auth.onAuthStateChanged(user => {
    if (user) {
      setUser(user)
    } else {
      console.error('No user signed in.')
    }
  })

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}


const useAuthContext = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used with a AuthContextProvider')
  } return context
}

export {
  AuthContextProvider,
  useAuthContext,
}
