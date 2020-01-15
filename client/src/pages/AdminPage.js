import React from 'react'
import Header from '../components/Header'
import Main from '../components/styled/Main'
import Container from '../components/styled/Container'
import Section from '../components/styled/Section'
import CreateTeamCard from '../components/CreateTeamCard'
import CreateBoardCard from '../components/CreateBoardCard'
import UsersList from '../components/UsersList'
import { getTeams, createTeam } from '../api/teams'
import { getUsers } from '../api/users'
import { createBoard } from '../api/boards'

const AdminPage = () => {
  const [teamName, setTeamName] = React.useState('')
  const [boardName, setBoardName] = React.useState('')
  const [boardTeamId, setBoardTeamId] = React.useState('')
  const [teamError, setTeamError] = React.useState('')
  const [boardError, setBoardError] = React.useState()
  const [teamsObj, setTeamsObj] = React.useState({})
  const [usersObj, setUsersObj] = React.useState({})

  React.useMemo(() => {
    getTeams().then(res => {
      setTeamsObj(res.data)
    })
  }, [])

  React.useMemo(() => {
    getUsers().then(res => {
      setUsersObj(res.data)
    })
  }, [])

  const onTeamNameChange = (e) => {
    const { value } = e.target
    setTeamName(value)
  }

  const onBoardNameChange = (e) => {
    const { value } = e.target
    setBoardName(value)
  }

  const onTeamChange = (e) => {
    const { value } = e.target
    setBoardTeamId(value)
  }

  function handleCreateTeam(e) {
    e.preventDefault()
    console.log(teamName)
    if (teamName !== '') {
      createTeam(teamName)
    } else {
      setTeamError('Please enter a name')
    }
  }

  function handleCreateBoard(e) {
    e.preventDefault()
    if (boardName !== '') {
      createBoard(boardName, boardTeamId)
    } else {
      setBoardError('Please enter a name')
    }
  }

  const isTeamsList = Object.values(teamsObj).length !== 0
  const isUsersList = Object.values(usersObj).length !== 0

  return (
    <Main>
      <Header />
      <Section>
        <h2>Admin Dashboard</h2>
      </Section>
      <Container>
        <CreateTeamCard
          error={teamError}
          handleCreate={handleCreateTeam}
          name={teamName}
          onNameChange={onTeamNameChange}
          isList={isTeamsList}
          obj={teamsObj}
        />
        <CreateBoardCard
          error={boardError}
          handleCreate={handleCreateBoard}
          name={boardName}
          onNameChange={onBoardNameChange}
          onTeamChange={onTeamChange}
          isList={isTeamsList}
          obj={teamsObj}
        />
        <UsersList isList={isUsersList} obj={usersObj} />
      </Container>
    </Main>
  )
}

export default AdminPage
