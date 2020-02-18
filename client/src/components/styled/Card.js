import styled from 'styled-components'

const Card = styled.article`
  background: var(--card-bg-color);
  border-radius: 1.75rem;
  box-shadow: var(--card-box-shadow);
  color: var(--card-font-color);
  height: 50rem;
  overflow: scroll;
  transition: box-shadow 0.5s;
  width: 30rem;
  
  &:hover {
    box-shadow: var(--card-box-shadow-hover);
    transition: box-shadow 0.5s;
  }
`

export default Card
