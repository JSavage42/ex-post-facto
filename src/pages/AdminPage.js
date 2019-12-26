import React from 'react'
import styled from 'styled-components'

import Login from '../components/Login'

const Main = styled.main`
  color: #e2e2e2;
  display: flex;
  height: 100%;
  margin: 0 auto;
  width: 100vw;

  h1 {
    font-size: 5rem;
    text-align: center;
  }

  div.title {
    flex: 1 75%;
  }
  div.login {
    flex: 1 25%;
  }
`

const LandingPage = props => {
  return (
    <Main>
      <div className="title">
        <h1>Ex Post Facto</h1>
      </div>
      <Login className="login" />
    </Main>
  )
}

export default LandingPage
