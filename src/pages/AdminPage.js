import React from 'react'
import { useHistory } from 'react-router-dom'

import { team, teams, board, users, } from '../components/contexts/firebase'
import Header from '../components/Header'
import Main from '../components/styled/Main'
import Container from '../components/styled/Container'
import Section from '../components/styled/Section'
import { useAuthenticationContext } from '../components/contexts/Authentication'
import CreateTeamCard from '../components/CreateTeamCard'
import CreateBoardCard from '../components/CreateBoardCard'
import UsersList from '../components/UsersList'

const AdminPage = () => {
  const [teamName, setTeamName] = React.useState('')
  const [boardName, setBoardName] = React.useState('')
  const [boardTeamName, setBoardTeamName] = React.useState('')
  const [teamError, setTeamError] = React.useState('')
  const [boardError, setBoardError] = React.useState()
  const [teamsObj, setTeamsObj] = React.useState({})
  const [usersObj, setUsersObj] = React.useState({})
  const user = useAuthenticationContext()
  const history = useHistory()

  React.useMemo(() => {
    teams().on('value', snapshot => {
      setTeamsObj(snapshot.val())
    })
  }, [setTeamsObj])

  React.useMemo(() => {
    users().on('value', snapshot => {
      setUsersObj(snapshot.val())
    })
  }, [setUsersObj])

  const onTeamNameChange = (e) => {
    const { value } = e.target
    setTeamName(value)
  }

  const onBoardNameChange = (e) => {
    const { value } = e.target
    setBoardName(value)
  }

  const onBoardTeamChange = (e) => {
    const { value } = e.target
    setBoardTeamName(value)
  }

  function handleCreateTeam(e) {
    e.preventDefault()
    if (teamName !== '') {
      const newTeamRef = teams().push()
      const newTeamId = newTeamRef.key
      team(newTeamId).set({
        tid: newTeamId,
        name: teamName,
      })
    } else {
      setTeamError('Please enter a name')
    }
  }

  function handleCreateBoard(e) {
    e.preventDefault()
    if (boardName !== '') {
      const newBoardRef = teams().push()
      const newBoardId = newBoardRef.key
      board(newBoardId).set({
        bid: newBoardId,
        title: boardName,
        team: boardTeamName,
      })
      history.push(`/board/${newBoardId}`)
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
          onTeamChange={onBoardTeamChange}
          isList={isTeamsList}
          obj={teamsObj}
        />
        {user && <UsersList isList={isUsersList} obj={usersObj} />}
        )}
      </Container>
    </Main>
  )
}

export default AdminPage
