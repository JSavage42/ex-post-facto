import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  justify-content: space-around;
  width: 100%;
  
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
`

export default Container
