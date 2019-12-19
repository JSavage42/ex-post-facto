import React from 'react'
import styled from 'styled-components'
import CardsSection from '../components/Board/CardsSection'
import {
  actionItems,
  wentWell,
  needsImprove,
} from '../components/contexts/FirebaseAPI/firebase';

const Main = styled.main`
  color: #e2e2e2;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100vw;
`

const Header = styled.header`
  background: #0939a0;

  h1 {
    font-size: 5rem;
    text-align: center;
  }
`

const Board = () => {
  const [wentWellObj, setWentWellObj] = React.useState({});
  const [needsImproveObj, setNeedsImproveObj] = React.useState({});
  const [actionItemsObj, setActionItemsObj] = React.useState({});

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

  return (
    <Main className="board">
      <Header className="title">
        <h1>Ex Post Facto</h1>
      </Header>
      <CardsSection
        wentWellObj={wentWellObj}
        needsImproveObj={needsImproveObj}
        actionItemsObj={actionItemsObj}
      />
    </Main>
  )
}

Board.propTypes = {

}

export default Board
