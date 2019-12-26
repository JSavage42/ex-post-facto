import React from 'react'
import styled from 'styled-components'

import Login from '../components/Login'

const Main = styled.main`
  color: #2f2f2f;
  display: flex;
  height: 100%;
  margin: 0 auto;
  width: 100vw;

  h1 {
    font-size: 8rem;
    text-align: center;
  }

  div {
    height: 100%;
  }

  div.title {
    align-items: center;
    border-right: 2px solid white;
    display: flex;
    flex: 1 75%;
    justify-content: center;
    padding: 0 4rem;
  }
`

const LandingPage = props => {
  return (
    <Main>
      <div className="title">
        <h1>Ex Post Facto</h1>
      </div>
      <Login />
    </Main>
  )
}

export default LandingPage
