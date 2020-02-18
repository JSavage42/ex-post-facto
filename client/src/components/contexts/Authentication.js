import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const AuthenticationContext = createContext()

const AuthenticationContextProvider = ({ children }) => {
  // const [user, setUser] = useState({})
  const user = {}
  return (
    <AuthenticationContext.Provider value={user}>
      {children}
    </AuthenticationContext.Provider>
  )
}

AuthenticationContextProvider.propTypes = { children: PropTypes.node.isRequired }

const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext)
  if (context === undefined) {
    throw new Error('useAuthenticationContext must be used with a AuthenticationContext')
  } return context
}

export {
  AuthenticationContextProvider,
  useAuthenticationContext,
}
