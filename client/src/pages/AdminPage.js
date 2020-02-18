import React, { useState, useMemo } from 'react'

import Container from '../components/styled/Container'
import CreateBoardCard from '../components/CreateBoardCard'
import CreateTeamCard from '../components/CreateTeamCard'
import Main from '../components/styled/Main'
import Message from '../components/Message'
import SubHeading from '../components/styled/SubHeading'
import UsersList from '../components/UsersList'

import { createBoard } from '../api/boards/boards'
import { getTeams, createTeam } from '../api/teams/teams'
import { getUsers } from '../api/users/users'

const AdminPage = () => {
  const [teamName, setTeamName] = useState('')
  const [boardName, setBoardName] = useState('')
  const [boardTeam, setBoardTeam] = useState('')
  const [teamError, setTeamError] = useState('')
  const [boardError, setBoardError] = useState()
  const [teamsObj, setTeamsObj] = useState({})
  const [usersObj, setUsersObj] = useState({})
  const [error, setError] = useState()

  useMemo(() => {
    getTeams().then(res => {
      setTeamsObj(res.data)
    })
  }, [])

  useMemo(() => {
    getUsers().then(res => {
      setUsersObj(res.data)
    })
  }, [])
  
  const handleInputChange = e => {
    const { target } = e
    const { value, name } = target

    switch (name) {
      case 'boardName':
        setBoardName(value)
        break
      case 'teamName':
        setTeamName(value)
        break
      case 'boardTeam':
        setBoardTeam(value)
        break
      default: setError('No value to change')
    }
  }

  function handleCreateTeam(e) {
    e.preventDefault()
    if (teamName !== '') {
      createTeam(teamName)
    } else {
      setTeamError('Please enter a name')
    }
  }

  function handleCreateBoard(e) {
    e.preventDefault()
    if (boardName !== '' && boardTeam !== '') {
      const data = {
        title: boardName,
        team: boardTeam,
      }
      createBoard(data)
    } else {
      setBoardError('Please enter a name')
    }
  }

  const isTeamsList = Object.values(teamsObj).length !== 0
  const isUsersList = Object.values(usersObj).length !== 0

  return (
    <Main>
      <SubHeading>Admin Dashboard</SubHeading>
      {error && <Message value={error} />}
      <Container>
        <CreateTeamCard
          error={teamError}
          handleCreate={handleCreateTeam}
          name={teamName}
          onNameChange={handleInputChange}
          isList={isTeamsList}
          obj={teamsObj}
        />
        <CreateBoardCard
          error={boardError}
          handleCreate={handleCreateBoard}
          name={boardName}
          handleInputChange={handleInputChange}
          isList={isTeamsList}
          obj={teamsObj}
          teamSelect
        />
        <UsersList isList={isUsersList} obj={usersObj} />
      </Container>
    </Main>
  )
}

export default AdminPage
