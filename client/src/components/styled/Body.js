import styled from 'styled-components'

const Body = styled.article`
  margin: 2rem;
  word-break: break-word;
  
  a {
    color: var(--card-link-color);
    font-size: 2rem;

    &:hover {
      color: var(--card-link-hover-color);
    }
  }

  ul {
    font-size: 1.75rem;
    margin-left: 2.5rem;

    a {
      color: var(--card-link-color);
      font-size: 2rem;
      text-decoration: none;
    }

    a:visited {
      color: var(--card-link-visted-color);
    }

    a:hover {
      color: var(--card-link-hover-color);
      text-decoration: underline;
    }
  }
`

export default Body
