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
    background: var(--white);
    border-radius: 15px;
    color: var(--black);
    display: block;
    margin: 0;
    overflow: hidden;
    padding: 0;
    width: 100%;
  }

  .select select {
    appearance: none;
    background-color: transparent;
    background-image: none;
    border-radius: 15px;
    color: var(--black);
    display: block;
    font-size: 2rem;
    padding: 0.5rem;
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
