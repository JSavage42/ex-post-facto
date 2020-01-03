import React from 'react'
import styled from 'styled-components'
import { useLocation, Link } from 'react-router-dom'
import XLSX from 'xlsx'

import CardsSection from '../components/Board/CardsSection'
import {
  actionItems,
  wentWell,
  needsImprove,
  board,
  addCard,
  updateCard,
} from '../components/contexts/firebase'
import Header from '../components/Header'
import Input from '../components/styled/Input'
import { ReactComponent as Icon } from '../icons/excel.svg'

const Main = styled.main`
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`

const BoardTitle = styled.div`
  background: var(--green-hex);
  box-shadow: 2px 6px 10px var(--black-hex);
  color: var(--yellow-hex);
  display: flex;
  font-size: 4rem;
  text-align: center;
  justify-content: space-evenly;
`

const EditTitleButton = styled.button`
  background: transparent;
  border: none;
  display: inline;
  font-size: 3rem;
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
  margin-top: 4rem;

  a:visited {
    color: var(--yellow-hex);
  }
`

const Board = () => {
  const [title, setTitle] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)
  const [isEditingTitle, setIsEditingTitle] = React.useState(false)
  const [wentWellObj, setWentWellObj] = React.useState({})
  const [needsImproveObj, setNeedsImproveObj] = React.useState({})
  const [actionItemsObj, setActionItemsObj] = React.useState({})

  const location = useLocation()
  const bid = location.pathname.substring(7)

  React.useMemo(() => {
    board(bid).on('value', snapshot => {
      setTitle(
        snapshot.val() ? snapshot.val().title : ''
      )
      setIsLoading(snapshot.val())
    })
  }, [bid])

  React.useMemo(() => {
    wentWell(bid).on('value', snapshot => {
      setWentWellObj(snapshot.val())
    })
  }, [bid])

  React.useMemo(() => {
    needsImprove(bid).on('value', snapshot => {
      setNeedsImproveObj(snapshot.val())
    })
  }, [bid])

  React.useMemo(() => {
    actionItems(bid).on('value', snapshot => {
      setActionItemsObj(snapshot.val())
    })
  }, [bid])

  const handleAddCard = (type) => {
    const newCardRef = board(bid).push()
    const newCardId = newCardRef.key
    addCard(type, bid).child(newCardId).set({
      id: newCardId,
      content: '',
      votes: 0,
    })
  }

  const handleOnTitleChange = (e) => {
    const { value } = e.target
    setTitle(value)
  }

  const editTitle = () => {
    setIsEditingTitle(true)
  }

  const saveTitle = () => {
    board(bid).update({
      'title': title,
    })
    setIsEditingTitle(false)
  }

  const updateContent = (type, bid, id, content) => {
    console.log(content)
    updateCard(type, bid, id).update({
      content,
    })
  }

  const wentWellArr = [['content', 'id', 'votes']]
  wentWellObj && Object.values(wentWellObj).forEach(value => {
    wentWellArr.push(Object.values(value))
  })
  const needsImproveArr = [['content', 'id', 'votes']]
  needsImproveObj && Object.values(needsImproveObj).forEach(value => {
    needsImproveArr.push(Object.values(value))
  })
  const actionItemsArr = [['content', 'id', 'votes']]
  actionItemsObj && Object.values(actionItemsObj).forEach(value => {
    actionItemsArr.push(Object.values(value))
  })
  const handleExportFile = () => {
    const wb = XLSX.utils.book_new()
    const wsWW = XLSX.utils.aoa_to_sheet(wentWellArr)
    const wsNI = XLSX.utils.aoa_to_sheet(needsImproveArr)
    const wsAI = XLSX.utils.aoa_to_sheet(actionItemsArr)

    XLSX.utils.book_append_sheet(wb, wsWW, 'Went Well')
    XLSX.utils.book_append_sheet(wb, wsNI, 'Needs Improve')
    XLSX.utils.book_append_sheet(wb, wsAI, 'Action Items')
    XLSX.writeFile(wb, `${title}.xlsx`)
  }

  return (
    <Main className="board">
      <Header />
      <BoardTitle>
        {isEditingTitle ? (
          <EditTitleButton onClick={saveTitle}>
            <span role="img" aria-label="Green Check mark">✅</span>
          </EditTitleButton>
        ) : (
          <EditTitleButton onClick={editTitle}>
            <span role="img" aria-label="Pencil">✏️</span>
          </EditTitleButton>
        )}
        <span>
          {isEditingTitle ? (
            <Input type="text" value={title} onChange={handleOnTitleChange} />
          ) : (
            `${title}`
          )}
        </span>
        <ExcelExportButton type="button" onClick={handleExportFile}>
          <Icon />
        </ExcelExportButton>
      </BoardTitle>
      {title.length === 0 && !isLoading ? (
        <H3>No board exists. <Link to="/home">Go to Dashboard</Link></H3>
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
