import React from 'react'
import styled from 'styled-components'

import Login from '../components/Login'
import { login } from '../api/users'

const Main = styled.main`
  background: var(--white-hex);
  color: #4d5359;
  display: flex;
  height: 100%;
  margin: 0 auto;
  width: 100vw;

  h1 {
    color: var(--header-font-color);
    text-align: center;
    font: var(--fancy-font);
  }

  div {
    height: 100%;
  }

  div.title {
    align-items: center;
    background: var(--black-hex);
    box-shadow: 2px 0 5px 5px var(--black-rgba);
    display: flex;
    flex: 1 75%;
    justify-content: center;
    padding: 0 4rem;
  }

  .login {
    align-self: center;
    background: var(--green-hex);
    margin: 2rem;
  }
`

const LoginPage = () => {
  const [isLogingIn, setIsLoggingIn] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const onEmailChange = (e) => setEmail(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)
  const handleOnSubmit = (e) => {
    e.preventDefault()
    setIsLoggingIn(true)
    const data = { email, password }
    login(data).catch(e => setError(e))
  }
  return (
    <Main>
      <div className="title">
        <h1>Ex Post Facto</h1>
      </div>
      <Login
        className="login"
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        handleOnSubmit={handleOnSubmit}
        error={error}
        email={email}
        password={password}
        isLogingIn={isLogingIn}
      />
    </Main>
  )
}

export default LoginPage
