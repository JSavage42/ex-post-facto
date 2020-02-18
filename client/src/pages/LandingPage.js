import React, { useState } from 'react'
import styled from 'styled-components'

import Form from '../components/Form'

import { login, register } from '../api/users/users'

const Main = styled.main`
  background: var(--bg-color);
  color: #4d5359;
  display: flex;
  height: 100%;
  margin: 0 auto;
  width: 100vw;
`

const Intro = styled.section`
  height: 100%;
  border-right: 2px solid var(--med-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--yellow);
  font-size: 4rem;
  font-weight: 700;
  padding: 10rem;
  max-width: 60%;
`

const LoginPage = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [username, setUsername] = useState('')

  const handleInputChange = e => {
    const { target } = e
    const { value, name } = target

    switch (name) {
      case 'fname':
        setFname(value)
        break
      case 'lname':
        setLname(value)
        break
      case 'uname':
        setUsername(value)
        break
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
      default: setError('No value')
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (isSignUp) {
      setIsSigningUp(true)
      const data = { username, password, fname, lname, email }
      login(data).catch(e => setError(e))
    } else {
      setIsLoggingIn(true)
      const data = { username, password }
      register(data).catch(e => setError(e))
    }
  }
  
  const handleFormSwitch = () => {
    setIsSignUp(!isSignUp)
  }

  return (
    <Main>
      <Intro>
        Ex Post Facto is your internal Cerner Retro Board! After you have created a team 
        for your scrum team you can then add boards and give your engineers, solution 
        designers, testers, etc. the link directly to that board. Once you are done you 
        can even export the results to an excel spreadsheet. The boards are kept 
        internally so you can always come back to a board if need be.
      </Intro>
      <Form
        email={email}
        error={error}
        fname={fname}
        handleFormSwitch={handleFormSwitch}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoggingIn={isLoggingIn}
        isSigningUp={isSigningUp}
        isSignUp={isSignUp}
        lname={lname}
        password={password}
        username={username}
      />
    </Main>
  )
}

export default LoginPage
