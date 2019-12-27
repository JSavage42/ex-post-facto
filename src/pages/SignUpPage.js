import React from 'react'
import styled from 'styled-components'

import { doCreateUserWithEmailAndPassword } from '../components/contexts/FirebaseAPI/firebase';
import Header from '../components/Header'
import Input from '../components/styled/Input'
import Button from '../components/styled/Button'

const Main = styled.main`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  h2 {
    padding: 2rem;
    font-size: 4rem;
  }
`

const Form = styled.form`
  align-self: center;
  flex: 1 50%;
  padding: 0 2rem;
`

const SignUpPage = () => {
  const [isLogingIn, setIsLoggingIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const onEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  }

  const onPasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    doCreateUserWithEmailAndPassword(email, password);
  }

  return (
    <Main>
      <Header />
      <h2>Sign Up</h2>
      <Form onSubmit={handleOnSubmit}>
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
      </Form>
    </Main>
  )
}

export default SignUpPage
