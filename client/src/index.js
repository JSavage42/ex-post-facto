import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './styles/main.scss'
import * as serviceWorker from './serviceWorker'
import AppRouter from './router/AppRouter'

import { AuthenticationContextProvider } from './components/contexts/Authentication'
import { AuthorizationContextProvider } from './components/contexts/Authorization'

ReactDOM.render((
  <AuthenticationContextProvider>
    <AuthorizationContextProvider>
      <AppRouter />
    </AuthorizationContextProvider>
  </AuthenticationContextProvider>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
