import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Header = styled.div`
  color: var(--yellow-hex);
  display: flex;
  font-weight: 700;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`
const ThumbsUp = styled.button`
  background: transparent;
  border: none;
  font-size: 2rem;
  font-weight: 700;

  &:active {
    background: var(--white-hex);
  }
`

const Content = styled.textarea`
  background-color: var(--green-hex);
  border: none;
  color: var(--white-hex);
  height: 90%;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 1.5rem;
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
    id,
    updateContent,
    plusOne,
  } = props
  const [localContent, setLocalContent] = React.useState(content)

  React.useEffect(() => {
    setLocalContent(content)
  }, [content])

  function plusOneVote() {
    plusOne(id, votes + 1)
  }
  function onContentChange(e) {
    const content = e.target.value
    setLocalContent(content)
    document.getElementById(`${id}-content`).onkeypress = function (e) {
      if (e.keyCode === 13) {
        e.preventDefault()
        updateContent(id, content)
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
        form={`${id}-form-content`}
        name={`${id}-content`}
        id={`${id}-content`}
        onChange={onContentChange}
        value={localContent}
      >
      </Content>
    </article>
  )
}

Card.propTypes = {
  content: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
}
Card.defaultProps = {
  content: '',
  votes: 0,
  id: 'unique-id'
}

export default Card
