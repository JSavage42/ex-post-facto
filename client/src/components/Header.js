import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Title = styled.header`
  background: var(--header-bg-color);

  a {
    text-decoration: none;
  }

  h1 {
    color: var(--header-font-color);
    font: var(--header-font);
    padding: 1rem;
  }
`

const Header = () => (
  <Title>
    <Link to="/home"><h1>Ex Post Facto</h1></Link>
  </Title>
)

export default Header
