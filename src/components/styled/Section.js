import styled from 'styled-components'

const Section = styled.section`
  margin: 0 auto;
  padding: 2rem;

  h2 {
    color: var(--yellow);
    font-size: 4rem;
  }

  h3 {
    color: var(--yellow);
    font-size: 3rem;
  }

  a {
    color: var(--white);
  }

  .select {
    background: var(--white);
    border-radius: 15px;
    color: var(--grey);
    display: block;
    margin: 0;
    overflow: hidden;
    padding: 0;
    width: 103%;
  }

  .select select {
    appearance: none;
    background-color: transparent;
    background-image: none;
    color: var(--grey);
    display: block;
    font-size: 2rem;
    padding: 0.5rem;
    width: 103%;
  }

  .select select:focus {
    outline: none;
  }
`

export default Section;
