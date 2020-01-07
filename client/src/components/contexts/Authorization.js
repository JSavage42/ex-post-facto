import React from 'react'

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

const AuthorizationStateContext = React.createContext()
const AuthorizationDispatchContext = React.createContext()

const AuthorizationContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)

  return (
    <AuthorizationStateContext.Provider value={state}>
      <AuthorizationDispatchContext.Provider value={dispatch}>
        {children}
      </AuthorizationDispatchContext.Provider>
    </AuthorizationStateContext.Provider>
  )
}

const useAuthorizationStateContext = () => {
  const context = React.useContext(AuthorizationStateContext)
  if (context === 'undefined') {
    throw new Error('useAuthorizationStateContext must be used in an AuthoirzationContextProvider')
  } return context
}

const useAuthorizationDispatchContext = () => {
  const context = React.useContext(AuthorizationDispatchContext)
  if (context === 'undefined') {
    throw new Error('useAuthorizationDispatchContext must be used in an AuthoirzationContextProvider')
  } return context
}

export {
  AuthorizationContextProvider,
  useAuthorizationStateContext,
  useAuthorizationDispatchContext,
}
