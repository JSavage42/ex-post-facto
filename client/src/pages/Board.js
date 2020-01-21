import React from 'react'
import styled from 'styled-components'
import { useLocation, Link } from 'react-router-dom'
// import XLSX from 'xlsx'

import CardsSection from '../components/Board/CardsSection'
import { ReactComponent as Icon } from '../icons/excel.svg'
import { getCardsOfType, getBoard, addCard, updateCardContent } from '../api/boards/boards'

const Main = styled.main`
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`

const BoardTitle = styled.div`
  /* background: var(--green-hex); */
  /* box-shadow: 2px 2px 10px var(--black-hex); */
  border-bottom: 1px solid var(--red-hex);
  color: var(--black-hex);
  display: flex;
  font-size: 2rem;
  justify-content: center;
  text-align: center;

  span {
    margin-right: 1rem;
  }
`

const ExcelExportButton = styled.button`
  background: transparent;
  border: none;
  display: inline;
  justify-self: flex-end;
`

const H3 = styled.h3`
  text-align: center;
  font-size: 3rem;
  color: var(--yellow-hex);
  justify-self: center;
  margin-top: 4rem;

  a:visited {
    color: var(--yellow-hex);
  }
`

const Board = () => {
  const [title, setTitle] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)
  const [wentWellArray, setWentWellArray] = React.useState([])
  const [needsImprovedArray, setNeedsImproveArray] = React.useState([])
  const [actionItemsArray, setActionItemsArray] = React.useState([])

  const location = useLocation()
  const bid = location.pathname.substring(7)

  React.useMemo(() => {
    getBoard(bid).then(res => {
      setTitle(res.data.title)
      setIsLoading(res)
    })
  }, [bid])
  React.useMemo(() => {
    getCardsOfType(bid, 'went-well').then(res => {
      setWentWellArray(res.data)
    })
  }, [bid])
  React.useMemo(() => {
    getCardsOfType(bid, 'needs-improved').then(res => {
      setNeedsImproveArray(res.data)
    })
  }, [bid])
  React.useMemo(() => {
    getCardsOfType(bid, 'action-items').then(res => {
      setActionItemsArray(res.data)
    })
  }, [bid])

  const handleAddCard = (type) => {
    addCard(bid, type)
  }

  const updateContent = (bid, _id, content) => {
    const data = { _id, content }
    updateCardContent(bid, data)
  }

  const plusOne = (bid, _id, votes) => {
    const data = { _id, votes }
    updateCardContent(bid, data)
  }

  const handleExportFile = () => {
    console.log('DOWNLOAD FILE')
    // const wb = XLSX.utils.book_new()
    // const wsWW = XLSX.utils.aoa_to_sheet(wentWellArr)
    // const wsNI = XLSX.utils.aoa_to_sheet(needsImproveArr)
    // const wsAI = XLSX.utils.aoa_to_sheet(actionItemsArr)

    // XLSX.utils.book_append_sheet(wb, wsWW, 'Went Well')
    // XLSX.utils.book_append_sheet(wb, wsNI, 'Needs Improve')
    // XLSX.utils.book_append_sheet(wb, wsAI, 'Action Items')
    // XLSX.writeFile(wb, `${title}.xlsx`)
  }

  return (
    <Main className="board">
      {/* <Header /> */}
      <BoardTitle>
        <span>{title}</span>
        <ExcelExportButton type="button" onClick={handleExportFile}>
          <Icon />
        </ExcelExportButton>
      </BoardTitle>
      {title === 0 && !isLoading ? (
        <H3>No board exists. <Link to="/home">Go to Dashboard</Link></H3>
      ) : (
        <CardsSection
          bid={bid}
          wentWellArray={wentWellArray}
          needsImprovedArray={needsImprovedArray}
          actionItemsArray={actionItemsArray}
          handleAddCard={handleAddCard}
          updateContent={updateContent}
          plusOne={plusOne}
        />
      )}
    </Main>
  )
}

Board.propTypes = {

}

export default Board
