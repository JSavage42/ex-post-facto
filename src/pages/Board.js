import React from 'react'
import styled from 'styled-components'
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

const Main = styled.main`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`

const BoardTitle = styled.div`
  box-shadow: 2px 15px 10px rgba(0,0,0,0.3);
  color: #2f2f2f;
  display: inline-block;
  font-size: 4rem;
  margin-top: 2rem;
  text-align: center;
`

const EditTitleButton = styled.button`
  background: transparent;
  display: inline;
  font-size: 5rem;
`

const Board = () => {
  const [title, setTitle] = React.useState('HTML Retro 11/13');
  const [wentWellObj, setWentWellObj] = React.useState({});
  const [needsImproveObj, setNeedsImproveObj] = React.useState({});
  const [actionItemsObj, setActionItemsObj] = React.useState({});

  React.useMemo(() => {
    board('one').on('value', snapshot => {
      setTitle(snapshot.val().title);
    })
  }, [setTitle]);

  React.useMemo(() => {
    wentWell('one').on("value", snapshot => {
      setWentWellObj(snapshot.val());
    })
  }, [setWentWellObj]);

  React.useMemo(() => {
    needsImprove('one').on("value", snapshot => {
      setNeedsImproveObj(snapshot.val());
    })
  }, [setNeedsImproveObj]);

  React.useMemo(() => {
    actionItems('one').on("value", snapshot => {
      setActionItemsObj(snapshot.val());
    })
  }, [setActionItemsObj]);

  const handleAddCard = (type) => {
    console.log('add card');
    const newCardRef = board('one').push();
    const newCardId = newCardRef.key;
    addCard(type, 'one').child(newCardId).set({
      id: newCardId,
      content: '',
      votes: 0,
    });
  }

  const editTitle = () => {
    setTitle('Why would you click this?');
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
        <span>{title}</span>
        <EditTitleButton onClick={editTitle}>
          <span role="img" aria-label="Pencil">✏️</span>
        </EditTitleButton>
      </BoardTitle>
      <CardsSection
        bid='one'
        wentWellObj={wentWellObj}
        needsImproveObj={needsImproveObj}
        actionItemsObj={actionItemsObj}
        handleAddCard={handleAddCard}
        updateContent={updateContent}
      />
    </Main>
  )
}

Board.propTypes = {

}

export default Board
