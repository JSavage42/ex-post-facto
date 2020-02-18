import React, { createContext, useReducer, useContext} from 'react'
import PropTypes from 'prop-types'

const SET_AUTHORIZATION = 'SET_AUTHORIZATION'

export const INITIAL_STATE = {
  userAuthorization: 'USER',
}

const reducer = (state, {
  type,
  userRole,
}) => {
  switch (type) {
    case SET_AUTHORIZATION:
      return {
        ...state,
        userAuthorization: userRole,
      }
    default: return state
  }
}

const AuthorizationStateContext = createContext()
const AuthorizationDispatchContext = createContext()

const AuthorizationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return (
    <AuthorizationStateContext.Provider value={state}>
      <AuthorizationDispatchContext.Provider value={dispatch}>
        {children}
      </AuthorizationDispatchContext.Provider>
    </AuthorizationStateContext.Provider>
  )
}

AuthorizationContextProvider.propTypes = { children: PropTypes.node.isRequired }

const useAuthorizationStateContext = () => {
  const context = useContext(AuthorizationStateContext)
  if (context === 'undefined') {
    throw new Error('useAuthorizationStateContext must be used in an AuthoirzationContextProvider')
  } return context
}

const useAuthorizationDispatchContext = () => {
  const context = useContext(AuthorizationDispatchContext)
  if (context === 'undefined') {
    throw new Error('useAuthorizationDispatchContext must be used in an AuthoirzationContextProvider')
  } return context
}

export {
  AuthorizationContextProvider,
  useAuthorizationStateContext,
  useAuthorizationDispatchContext,
}
