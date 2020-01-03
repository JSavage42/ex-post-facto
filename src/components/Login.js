import React from 'react'

import Input from './styled/Input'
import Button from './styled/Button'
import Section from './styled/Section'

const Login = ({
  onEmailChange,
  onPasswordChange,
  handleOnSubmit,
  error,
  email,
  password,
  isLogingIn,
}) => (
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

export default Login
