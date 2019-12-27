import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import { onAuthUserListener } from '../components/contexts/FirebaseAPI/firebase';

const Main = styled.main`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`

const Section = styled.section`
  padding: 2rem;

  h2 {
    font-size: 4rem;
  }
`

onAuthUserListener();
const LandingPage = () => {
  return (
    <Main>
      <Header />
      <Section>
        <h2>Welcome</h2>
      </Section>
    </Main>
  )
}

export default LandingPage
