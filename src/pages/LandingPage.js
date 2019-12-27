import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'

const Main = styled.main`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`

const LandingPage = () => {
  return (
    <Main>
      <Header />
      <div>
        <h2>Landing Page!</h2>
      </div>
    </Main>
  )
}

export default LandingPage
