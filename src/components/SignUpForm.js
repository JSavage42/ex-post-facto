import React, { useState } from 'react'

import Button from './styled/Button'
import Container from './styled/Container'
import Input from './styled/Input'
import Message from './Message'
import Section from './styled/Section'

const SignUpForm = () => {
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [email, setEmail] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

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
      case 'password2':
        setPassword2(value)
        break
      default: setError('No value')
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    setIsLoggingIn(true)
  }

  return (
    <Container>
      <Section title="Sign Up">
        <form onSubmit={handleOnSubmit}>
          {error && <Message value={error} />}
          <fieldset>
            <Input
              placeholder="Email"
              name="email"
              id="email"
              type="text"
              value={email}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Username"
              name="username"
              id="username"
              type="text"
              value={username}
              onChange={handleInputChange}
            />
            <Input
              placeholder="First Name"
              name="fname"
              id="fname"
              type="text"
              value={fname}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Last Name"
              name="lname"
              id="lname"
              type="text"
              value={lname}
              onChange={handleInputChange}
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={password}
              onChange={handleInputChange}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              id="password2"
              value={password2}
              onChange={handleInputChange}
            />
          </fieldset>
          <Button
            type="submit"
            title={isSigningUp ? 'Creating Account...' : 'Sign Up'}
            variant="emphasis login"
          />
          <Button
            disabled={isLoggingIn}
            type="reset"
            title="Reset"
            variant="neutral reset"
          />
        </form>
      </Section>
    </Container>
  )
}

export default SignUpForm
