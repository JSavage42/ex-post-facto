import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import CardsSection from '../components/Board/CardsSection'
import {
  actionItems,
  wentWell,
  needsImprove,
  board,
  addCard,
  updateCard,
} from '../components/contexts/FirebaseAPI/firebase';
import Header from '../components/Header';
import Input from '../components/styled/Input';

const Main = styled.main`
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`

const BoardTitle = styled.div`
  box-shadow: 2px 6px 10px var(--db-bs-lighter);
  color: var(--yellow);
  display: inline-block;
  font-size: 4rem;
  text-align: center;
`

const EditTitleButton = styled.button`
  background: transparent;
  border: none;
  display: inline;
  font-size: 4rem;
`

const H3 = styled.h3`
  text-align: center;
  font-size: 3rem;
  color: var(--yellow);
  margin-top: 4rem;

  a:visited {
    color: var(--yellow);
  }
`

const Board = () => {
  const [title, setTitle] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const [wentWellObj, setWentWellObj] = React.useState({});
  const [needsImproveObj, setNeedsImproveObj] = React.useState({});
  const [actionItemsObj, setActionItemsObj] = React.useState({});

  const location = useLocation();
  const bid = location.pathname.substring(7);

  React.useMemo(() => {
    board(bid).on('value', snapshot => {
      setTitle(
        snapshot.val() ? snapshot.val().title : ''
      );
      setIsLoading(snapshot.val());
    })
  }, [bid]);

  React.useMemo(() => {
    wentWell(bid).on("value", snapshot => {
      setWentWellObj(snapshot.val());
    })
  }, [bid]);

  React.useMemo(() => {
    needsImprove(bid).on("value", snapshot => {
      setNeedsImproveObj(snapshot.val());
    })
  }, [bid]);

  React.useMemo(() => {
    actionItems(bid).on("value", snapshot => {
      setActionItemsObj(snapshot.val());
    })
  }, [bid]);

  const handleAddCard = (type) => {
    const newCardRef = board(bid).push();
    const newCardId = newCardRef.key;
    addCard(type, bid).child(newCardId).set({
      id: newCardId,
      content: '',
      votes: 0,
    });
  }

  const handleOnTitleChange = (e) => {
    const { value } = e.target;
    setTitle(value);
  }

  const editTitle = () => {
    setIsEditingTitle(true);
  }

  const saveTitle = () => {
    board(bid).update({
      "title": title,
    })
    setIsEditingTitle(false);
  }

  const updateContent = (type, bid, id, content) => {
    console.log(content);
    updateCard(type, bid, id).update({
      content,
    });
  }

  return (
    <Main className="board">
      <Header />
      <BoardTitle>
        <span>
          {isEditingTitle ? (
            <Input type="text" value={title} onChange={handleOnTitleChange} />
          ) : (
            `${title}`
          )}
        </span>
        {isEditingTitle ? (
          <EditTitleButton onClick={saveTitle}>
            <span role="img" aria-label="Green Check mark">✅</span>
          </EditTitleButton>
        ) : (
          <EditTitleButton onClick={editTitle}>
            <span role="img" aria-label="Pencil">✏️</span>
          </EditTitleButton>
        )}
      </BoardTitle>
      {title.length === 0 && !isLoading ? (
        <H3>No board exists. <a href="/home">Go to Dashboard</a></H3>
      ) : (
        <CardsSection
          bid={bid}
          wentWellObj={wentWellObj}
          needsImproveObj={needsImproveObj}
          actionItemsObj={actionItemsObj}
          handleAddCard={handleAddCard}
          updateContent={updateContent}
        />
      )}
    </Main>
  )
}

Board.propTypes = {

}

export default Board
