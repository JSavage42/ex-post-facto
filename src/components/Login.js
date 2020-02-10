import React from 'react'
import PropTypes from 'prop-types'

import Input from './styled/Input'
import Button from './styled/Button'
import Section from './styled/Section'
import Message from './Message'

const Login = ({
  handleInputChange,
  handleOnSubmit,
  error,
  email,
  password,
  isLogingIn,
}) => (
  <Section className="login" title="Login">
    <form onSubmit={handleOnSubmit}>
      {error && <Message value={error} />}
      <fieldset>
        <Input
          placeholder="Username"
          name="username"
          id="username"
          type="text"
          value={email}
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

Login.propTypes = {
  email: PropTypes.string.isRequired,
  error: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  isLogingIn: PropTypes.bool,
  password: PropTypes.string.isRequired,
}

export default Login
