import React from 'react'
import styled from 'styled-components'

const Title = styled.header`
  background: #e2e2e2;
  box-shadow: 2px 2px 10px rgba(0,0,0,0.7);
  height: 8rem;

  h1 {
    color: rgba(0,0,0,0.7);
    font-size: 3rem;
    font-variant: small-caps;
    font-weight: 300;
    padding: 2rem;
  }
`

const Header = () => (
  <Title>
    <h1>Ex Post Facto</h1>
  </Title>
)

export default Header
