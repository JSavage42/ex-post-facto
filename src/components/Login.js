import React from 'react'
import Input from './styled/Input'
import Button from './Button'
import styled from 'styled-components'

const Form = styled.form`
  align-self: center;
  flex: 1 50%;
  padding: 0 2rem;
`

const Login = () => {
  const isLogingIn = false;
  return (
    <Form>
      <fieldset>
        <Input placeholder="Username" />
        <Input type="password" placeholder="Password" />
      </fieldset>
      <Button
        type="submit"
        title={isLogingIn ? 'Logging in...' : 'Login'}
        onClick={() => { }}
        variant="emphasis login"
      />
      <Button
        disabled={isLogingIn}
        type="reset"
        title="Reset"
        onClick={() => { }}
        variant="neutral reset"
      />
    </Form>
  )
}

export default Login
