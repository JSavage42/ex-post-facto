import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Input from './styled/Input'
import Button from './styled/Button'
import Section from './styled/Section'
import Message from './Message'

const Container = styled.article`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
`

const Form = ({
  email,
  error,
  fname,
  handleFormSwitch,
  handleInputChange,
  handleSubmit,
  isLoggingIn,
  isSigningUp,
  isSignUp,
  lname,
  password,
  username,
}) => (
  <Container>
    <Section title={isSignUp ? 'Sign Up' : 'Login'} isShown>
      <form onSubmit={handleSubmit}>
        {error && <Message value={error} />}
        <fieldset>
          {isSignUp && (
            <Fragment>
              <Input
                placeholder="Email"
                name="email"
                id="email"
                type="text"
                value={email}
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
            </Fragment>
          )}
          <Input
            placeholder="Username"
            name="username"
            id="username"
            type="text"
            value={username}
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
          title={isSignUp ? 'Sign Up' : 'Login'}
          variant="emphasis"
        />
        <Button
          disabled={isLoggingIn ||  isSigningUp}
          type="reset"
          title="Reset"
          variant="neutral reset"
        />
      </form>
      <Button
        type="button"
        title={isSignUp ? 'Already have an account? Login instead...' : 'No account? Sign up instead...'}
        handleClick={handleFormSwitch}
        variant="ghost"
      />
    </Section>
  </Container>
)

Form.propTypes = {
  email: PropTypes.string.isRequired,
  error: PropTypes.string,
  fname: PropTypes.string.isRequired,
  handleFormSwitch: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
  isSignUp: PropTypes.bool.isRequired,
  isSigningUp: PropTypes.bool.isRequired,
  lname: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default Form
