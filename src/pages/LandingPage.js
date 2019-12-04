import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Login from '../components/Login'

const Main = styled.main`
  color: #e2e2e2;
  display: flex;
  margin: 0 auto;
  width: 100vw;

  h1 {
    font-size: 5rem;
    text-align: center;
  }

  div {
    height: 100%;
  }

  div.title {
    flex: 1 75%;
    align-self: center;
    padding: 0 4rem;
    border-right: 2px solid white;
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

LandingPage.propTypes = {

}

export default LandingPage
