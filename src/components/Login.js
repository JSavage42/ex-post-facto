import React from 'react'
import styled from 'styled-components'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

const Form = styled.form`
  align-self: center;
  flex: 1 50%;
  padding: 0 2rem;

  .firebaseui-title {
    font-size: 2rem;
  }
`

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/home',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ]
}

const Login = () => {
  return (
    <Form>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Form>
  )
}

export default Login
