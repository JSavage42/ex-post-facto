import React from 'react'
import styled from 'styled-components'

import Login from '../components/Login'

const Main = styled.main`
  background: var(--gb);
  color: #4d5359;
  display: flex;
  height: 100%;
  margin: 0 auto;
  width: 100vw;

  h1 {
    color: var(--yellow);
    font-size: 8rem;
    text-align: center;
  }

  div {
    height: 100%;
  }

  div.title {
    align-items: center;
    background: var(--dark-blue);
    box-shadow: 2px 0 5px 5px rgba(21,59,80,0.3);
    display: flex;
    flex: 1 75%;
    justify-content: center;
    padding: 0 4rem;
  }

  .login {
    align-self: center;
    background: var(--light-blue);
    margin: 2rem;
  }
`

const LoginPage = () => (
  <Main>
    <div className="title">
      <h1>Ex Post Facto</h1>
    </div>
    <Login className="login" />
  </Main>
)

export default LoginPage
