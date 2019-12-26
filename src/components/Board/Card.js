import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { updateCard } from '../contexts/FirebaseAPI/firebase';

const Header = styled.div`
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
    background: white;
  }
`

const Content = styled.textarea`
  background-image: none;
  border: none;
  height: 20rem;
  font-size: 2rem;
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
    type,
    bid,
    id,
    updateContent,
  } = props;
  const [localContent, setLocalContent] = React.useState(content);

  React.useEffect(() => {
    setLocalContent(content);
  }, [content]);

  function plusOne() {
    let currentVotes;
    updateCard(type, bid, id).child('votes').on("value", snapshot => {
      currentVotes = snapshot.val();
    })
    updateCard(type, bid, id).update({ votes: currentVotes + 1 });
  }
  function onContentChange(e) {
    const content = e.target.value;
    setLocalContent(content);
    document.getElementById(`${id}-content`).onkeypress = function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        updateContent(type, bid, id, content);
      }
    }
  }

  return (
    <article>
      <Header>
        <span>Votes: {votes}</span>
        <ThumbsUp onClick={plusOne}>+1</ThumbsUp>
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
Card.defaultPropts = {
  content: '',
  votes: 0,
  id: 'unique-id'
}

export default Card
