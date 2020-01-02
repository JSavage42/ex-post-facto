import React from 'react'

import { doSignInWithEmailAndPassword } from '../components/contexts/FirebaseAPI/firebase'
import Input from './styled/Input'
import Button from './styled/Button'
import Section from './styled/Section'

const Login = () => {
  const [isLogingIn, setIsLoggingIn] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const onEmailChange = (e) => {
    const { value } = e.target
    setEmail(value)
  }

  const onPasswordChange = (e) => {
    const { value } = e.target
    setPassword(value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    setIsLoggingIn(true)
    doSignInWithEmailAndPassword(email, password, setError)
  }


  return (
    <Section className="login">
      <form onSubmit={handleOnSubmit}>
        {error && (
          <p>Error: {error}</p>
        )}
        <fieldset>
          <Input
            placeholder="Username"
            name="username"
            id="username"
            type="text"
            value={email}
            onChange={onEmailChange}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={password}
            onChange={onPasswordChange}
          />
        </fieldset>
        <Button
          type="submit"
          title={isLogingIn ? 'Logging in...' : 'Login'}
          variant="emphasis"
        />
        <Button
          disabled={isLogingIn}
          type="reset"
          title="Reset"
          variant="neutral reset"
        />
      </form>
    </Section>
  )
}

export default Login
