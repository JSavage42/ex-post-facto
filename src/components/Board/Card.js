import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Header = styled.div`
  color: var(--board-card-header-font-color);
  display: flex;
  font-weight: 700;
  justify-content: space-between;
  overflow-x: scroll;
  margin: 0;
  padding: 0;
`
const ThumbsUp = styled.button`
  background: transparent;
  border: none;
  font-size: 2rem;
  font-weight: 700;

  &:active {
    background: var(--board-card-button-active-bg-color);
  }
`

const Content = styled.textarea`
  border: none;
  height: 90%;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: var(--board-card-content-font-size);
  padding: 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
  resize: none;
  width: 100%;
`
const Card = (props) => {
  const {
    content,
    votes,
    _id,
    updateContent,
    plusOne,
  } = props
  const [localContent, setLocalContent] = useState(content)

  useEffect(() => {
    setLocalContent(content)
  }, [content])

  function plusOneVote() {
    plusOne(_id, votes + 1)
  }

  function onContentChange(e) {
    const content = e.target.value
    setLocalContent(content)
    document.getElementById(`${_id}-content`)
      .onkeypress = e => {
        if (e.keyCode === 13) {
          e.preventDefault()
          updateContent(_id, content)
        }
      }
  }

  return (
    <article>
      <Header>
        <span>Votes: {votes}</span>
        <ThumbsUp onClick={plusOneVote}>+1</ThumbsUp>
      </Header>
      <Content
        form={`${_id}-form-content`}
        name={`${_id}-content`}
        id={`${_id}-content`}
        onChange={onContentChange}
        value={localContent}
      >
      </Content>
    </article>
  )
}

Card.propTypes = {
  _id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  content: PropTypes.string.isRequired,
  plusOne: PropTypes.func.isRequired,
  updateContent: PropTypes.func.isRequired,
  votes: PropTypes.number.isRequired,
}
Card.defaultProps = {
  content: '',
  votes: 0,
  _id: 'unique-id',
}

export default Card
