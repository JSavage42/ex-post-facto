import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Body from './Body'
import Card from './Card'
import Title from './Title'

const Container = styled.section`
  margin: 0;
  padding: 2rem;

  h2 {
    color: var(--h2-color);
    font: var(--medium-header-font);
    text-align: center;
  }

  h3 {
    color: var(--h3-color);
  }

  .select {
    background: var(--bg-color);
    border-radius: 15px;
    border: none;
    color: var(--yellow);
    display: block;
    margin: 0;
    overflow: hidden;
    padding: 0rem;
    width: 100%;
  }
  
  .select select {
    background: var(--bg-color);
    border: none;
    box-shadow: var(--bs-inset);
    appearance: none;
    background-image: none;
    border-radius: 15px;
    color: var(--yellow);
    display: block;
    font-size: 2rem;
    padding: 1rem;
    width: 100%;
  }

  .select select:focus {
    outline: none;
  }
`

const Section = ({ title, children }) => {
  
  return (
    <Container>
      <Card>
        <Title>{title}</Title>
        <Body>
          {children}
        </Body>
      </Card>
    </Container>
  )
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}
export default Section
