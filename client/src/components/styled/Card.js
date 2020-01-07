import styled from 'styled-components'

const Card = styled.article`
  background: var(--card-bg-color);
  color: var(--white-hex);
  box-shadow: 2px 2px 5px var(--db-bs);
  font-size: 1rem;
  margin: 2rem;
  width: 30rem;
  min-height: 20rem;
  padding: 2rem;

  ul {
    margin-left: 2.5rem;

    a {
      color: var(--white-hex);
      font-size: 1.75rem;
      text-decoration: none;
    }

    a:visited {
      color: var(--white);
    }

    a:hover {
      color: var(--yellow-hex);
      text-decoration: underline;
    }
  }
`

export default Card
