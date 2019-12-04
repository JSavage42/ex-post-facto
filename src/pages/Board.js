import React from 'react'
import styled from 'styled-components'
import CardsSection from '../components/Board/CardsSection'

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
  return (
    <Main className="board">
      <Header className="title">
        <h1>Ex Post Facto</h1>
      </Header>
      <CardsSection
        wentWellArray={['test', 'ts']}
        needsImproveArray={['test','test with a lot of text to see what happens when there is overflow you know just becaused I want to make sure all my bases are covered. You know.', 'test', 'test2']}
        actionItemsArray={['test']}
      />
    </Main>
  )
}

Board.propTypes = {

}

export default Board
