import React from 'react'

import Header from '../components/Header'
import SignUpForm from '../components/SignUpForm'
import Main from '../components/styled/Main'
import Section from '../components/styled/Section'

const SignUpPage = () => (
  <Main>
    <Header />
    <Section>
      <h2>Sign Up</h2>
    </Section>
    <SignUpForm />
  </Main>
)

export default SignUpPage
