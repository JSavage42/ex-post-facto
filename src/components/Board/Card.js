import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Header = styled.div`
  color: inherit;
  font-size: 1.25rem;
  border-bottom: 3px solid black;
  padding: 0;
  margin: 0;
  position: relative;
  font-weight: 700;
`
const ThumbsUp = styled.button`
  border: none;
  background: transparent;
  color: inherit;
  font-size: 1.25rem;
  position: absolute;
  right: 0;

  &:active {
    background: white;
    color: black;
  }
`

const Content = styled.div`
  padding: 0.5rem;
  max-height: 8rem;
  overflow: scroll;
`
const Card = (props) => {
  const { content, votes } = props;
  return (
    <article>
      <Header>
        <span>Number of votes: {votes}</span>
        <ThumbsUp>+1</ThumbsUp>
      </Header>
      <Content>
        {content}
      </Content>
    </article>
  )
}

Card.propTypes = {
  content: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
}

export default Card
