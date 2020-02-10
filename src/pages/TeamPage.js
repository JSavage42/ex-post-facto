import React, { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import Container from '../components/styled/Container'
import CreateBoardCard from '../components/CreateBoardCard'
import CreateUserCard from '../components/CreateUserCard'
import Main from '../components/styled/Main'
import Message from '../components/Message'
import SubHeading from '../components/styled/SubHeading'

import { createBoard } from '../api/boards/boards'
import { getTeam } from '../api/teams/teams'

const TeamPage = () => {
  const [teamName, setTeamName] = useState('')
  const [boardName, setBoardName] = useState('')
  const [boardError, setBoardError] = useState()
  const [username, setUsername] = useState('')
  const [memberError, setMemberError] = useState()
  const [members, setMembers] = useState({})
  const [boardObj, setBoardObj] = useState()
  const [error, setError] = useState()
  const location = useLocation()
  const tid = location.pathname.substring(6)
  
  React.useEffect(() => {
    const source = new EventSource(`http://localhost:5000/api/boards/team/${tid}`)
    source.addEventListener(
      'boards',
      ({ data }) => {
        const boards = JSON.parse(data).boards
        setBoardObj(boards)
      },
      false,
    )
    return () => {
      source.close()
    }
  }, [tid])
  
  useMemo(() => {
    getTeam(tid).then(res => {
      setTeamName(res.data.name)
      setMembers(res.data.members)
    })
  }, [tid])

  const handleAddMember = e => {
    e.preventDefault()
    if (username !== '') {
      setError('What did I just tell you?')
    } else {
      setMemberError('Please enter a username')
    }
  }
  
  const handleInputChange = e => {
    const { target } = e
    const { value, name } = target

    switch (name) {
      case 'boardName':
        setBoardName(value)
        break
        
      case 'username':
        setUsername(value)
        break
        
      default: setError('No value')
    }
  }

  const handleCreateBoard = e => {
    e.preventDefault()
    if (boardName !== '') {
      const data = {
        title: boardName,
        team: tid,
      }
      createBoard(data)
      setBoardName('')
    } else {
      setBoardError('Please enter a name for your board')
    }
  }

  const isBoardsList = boardObj && Object.values(boardObj).length !== 0

  return (
    <Main>
      <SubHeading>Team {teamName}</SubHeading>
      {error && <Message value={error} />}
      <Container>
        <CreateBoardCard
          error={boardError}
          handleCreate={handleCreateBoard}
          name={boardName}
          handleInputChange={handleInputChange}
          boardList={isBoardsList}
          boardObj={boardObj}
          isLoading={boardObj === undefined}
        />
        <CreateUserCard
          memberError={memberError}
          handleAddMember={handleAddMember}
          username={username}
          handleInputChange={handleInputChange}
          isMemberList={members.length !== 0}
          memberObj={members}
        />
      </Container>
    </Main>
  )
}

export default TeamPage
