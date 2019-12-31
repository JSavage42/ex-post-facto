import React from 'react'
import styled from 'styled-components'

const Title = styled.header`
  background: var(--header-bg-color);
  box-shadow: 2px 2px 10px var(--db-bs);

  a {
    text-decoration: none;
  }

  h1 {
    color: var(--header-font-color);
    font: var(--header-font);
    padding: 2rem;
  }
`

const Header = () => (
  <Title>
    <a href="/home"><h1>Ex Post Facto</h1></a>
  </Title>
)

export default Header
