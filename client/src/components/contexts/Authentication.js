import React from 'react'

const AuthenticationContext = React.createContext()

const AuthenticationContextProvider = ({ children }) => {
  // const [user, setUser] = React.useState({})
  const user = {}
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
