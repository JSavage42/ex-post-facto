import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo} from '../logo.svg'

const Title = styled.header`
  align-items: center;
  background: var(--bg-color);
  display: flex;
  
  @media (max-width: 400px) {
    display: none;
  }

  a {
    text-decoration: none;
  }

  h1 {
    color: var(--header-font-color);
    font: var(--header-font);
    padding: 1rem;

    a:visited {
      color: var(--header-font-color);
    }
  }
`

const Header = () => (
  <Title>
    <Link to="/"><Logo /></Link>
    <h1><Link to="/">Ex Post Facto</Link></h1>
  </Title>
)

export default Header
