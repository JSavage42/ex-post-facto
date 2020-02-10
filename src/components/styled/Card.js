import styled from 'styled-components'

const Card = styled.article`
  background: var(--card-bg-color);
  border-radius: 1.75rem;
  box-shadow: 0 0 0 2px var(--db-bs);
  color: var(--card-font-color);
  height: 50rem;
  overflow: scroll;
  transition: box-shadow 0.5s;
  width: 30rem;
  
  &:hover {
    box-shadow: 2px 2px 15px 5px var(--db-bs);
    transition: box-shadow 0.5s;
  }
`

export default Card
