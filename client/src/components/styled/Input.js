import styled from 'styled-components'

const Input = styled.input`
  background: var(--bg-color);
  border: none;
  box-shadow: var(--bs-inset);
  border-radius: 1.75rem;
  color: var(--yellow);
  display: inline-block;
  font-size: 2rem;
  margin: 0.125rem;
  padding: 1rem;
  width: 100%;
  
  ::placeholder {
    color: var(--yellow);
  }

  &:focus {
    box-shadow: var(--bs-inset-hov);
  }
`

export default Input
