import React from 'react'

import { doCreateUserWithEmailAndPassword } from '../components/contexts/firebase'
import Input from '../components/styled/Input'
import Button from '../components/styled/Button'
import Container from '../components/styled/Container'
import Section from '../components/styled/Section'
import Card from '../components/styled/Card'

const SignUpForm = () => {
  const [isLogingIn, setIsLoggingIn] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [fname, setFname] = React.useState('')
  const [lname, setLname] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const onEmailChange = (e) => {
    const { value } = e.target
    setEmail(value)
  }
  const onUsernameChange = (e) => {
    const { value } = e.target
    setUsername(value)
  }
  const onFnameChange = (e) => {
    const { value } = e.target
    setFname(value)
  }
  const onLnameChange = (e) => {
    const { value } = e.target
    setLname(value)
  }

  const onPasswordChange = (e) => {
    const { value } = e.target
    setPassword(value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    setIsLoggingIn(true)
    doCreateUserWithEmailAndPassword(email, password, username, fname, lname, setError)
  }

  return (
    <Container>
      <Section>
        <Card>
          <form onSubmit={handleOnSubmit}>
            {error && (
              <p>Error: {error}</p>
            )}
            <fieldset>
              <Input
                placeholder="Email"
                name="email"
                id="email"
                type="text"
                value={email}
                onChange={onEmailChange}
              />
              <Input
                placeholder="Username"
                name="username"
                id="username"
                type="text"
                value={username}
                onChange={onUsernameChange}
              />
              <Input
                placeholder="First Name"
                name="fname"
                id="fname"
                type="text"
                value={fname}
                onChange={onFnameChange}
              />
              <Input
                placeholder="Last Name"
                name="lname"
                id="lname"
                type="text"
                value={lname}
                onChange={onLnameChange}
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
              title={isLogingIn ? 'Signing in...' : 'Sign Up'}
              variant="emphasis login"
            />
            <Button
              disabled={isLogingIn}
              type="reset"
              title="Reset"
              variant="neutral reset"
            />
          </form>
        </Card>
      </Section>
    </Container>
  )
}

export default SignUpForm
