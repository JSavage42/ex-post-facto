import React, { useEffect, useState, useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'
import XLSX from 'xlsx'

import { ReactComponent as Icon } from '../icons/excel.svg'
import CardsSection from '../components/Board/CardsSection'

import { addCard, updateCard } from '../api/cards'
import { getBoard } from '../api/boards/boards'
import SubHeading from '../components/styled/SubHeading'

const Main = styled.main`
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
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
  color: var(--board-section-heading-color);
  justify-self: center;
  margin-top: 4rem;
`

const Board = () => {
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [wentWellArray, setWentWellArray] = useState([])
  const [needsImprovedArray, setNeedsImproveArray] = useState([])
  const [actionItemsArray, setActionItemsArray] = useState([])
  
  const location = useLocation()
  const bid = location.pathname.substring(7)
  
  useEffect(() => {
    const source = new EventSource(`http://localhost:5000/api/cards/${bid}/went-well`)
    const handler = ({ data }) => {
      const cards = JSON.parse(data).cards
      setWentWellArray(cards)
    }
    source.addEventListener(
      'cards',
      handler,
      false,
    )
    return () => { 
      source.close() 
    }
  }, [bid])

  useEffect(() => {
    const source = new EventSource(`http://localhost:5000/api/cards/${bid}/needs-improved`)
    const handler = ({ data }) => {
      const cards = JSON.parse(data).cards
      setNeedsImproveArray(cards)
    }
    source.addEventListener(
      'cards',
      handler,
      false,
    )
    return () => { 
      source.close() 
    }
  }, [bid])
    
  useEffect(() => {
    const source = new EventSource(`http://localhost:5000/api/cards/${bid}/action-items`)
    const handler = ({ data }) => {
      const cards = JSON.parse(data).cards
      setActionItemsArray(cards)
    }
    source.addEventListener(
      'cards',
      handler,
      false,
    )
    return () => { 
      source.close() 
    }
  }, [bid])
  
  
  useMemo(() => {
    getBoard(bid).then(res => {
      setTitle(res.data.title)
      setIsLoading(res)
    })
  }, [bid])

  const handleAddCard = (type) => {
    addCard(bid, type)
  }

  const updateContent = (cid, content) => {
    const data = { content }
    updateCard(cid, data)
  }

  const plusOne = (cid, votes) => {
    const data = { votes }
    console.log(votes)
    updateCard(cid, data)
  }

  const handleExportFile = () => {
    const wb = XLSX.utils.book_new()
    const headerArray = ['votes', 'content', 'board', '_id', 'type']
    const wentWellAoA = [headerArray]
    const needsImprovedAoA = [headerArray]
    const actionItemsAoA = [headerArray]

    wentWellArray.map(item => wentWellAoA.push(Object.values(item)))
    needsImprovedArray.map(item => needsImprovedAoA.push(Object.values(item)))
    actionItemsArray.map(item => actionItemsAoA.push(Object.values(item)))

    const wsWW = XLSX.utils.aoa_to_sheet(wentWellAoA)
    const wsNI = XLSX.utils.aoa_to_sheet(needsImprovedAoA)
    const wsAI = XLSX.utils.aoa_to_sheet(actionItemsAoA)

    XLSX.utils.book_append_sheet(wb, wsWW, 'Went Well')
    XLSX.utils.book_append_sheet(wb, wsNI, 'Needs Improve')
    XLSX.utils.book_append_sheet(wb, wsAI, 'Action Items')
    XLSX.writeFile(wb, `${title}.xlsx`)
  }

  return (
    <Main className="board">
      <SubHeading>
        <span>{title}</span>
        <ExcelExportButton type="button" onClick={handleExportFile}>
          <Icon />
        </ExcelExportButton>
      </SubHeading>
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

export default Board
