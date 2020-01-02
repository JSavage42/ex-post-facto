import React from 'react'
import { useHistory } from 'react-router-dom'

import { team, teams, board, users, } from '../components/contexts/FirebaseAPI/firebase'
import Header from '../components/Header'
import Input from '../components/styled/Input'
import Button from '../components/styled/Button'
import Card from '../components/styled/Card'
import Main from '../components/styled/Main'
import Container from '../components/styled/Container'
import Section from '../components/styled/Section'
import { useAuthContext } from '../components/contexts/AuthContext'

const AdminPage = () => {
  const [teamName, setTeamName] = React.useState('')
  const [boardName, setBoardName] = React.useState('')
  const [boardTeamName, setBoardTeamName] = React.useState('')
  const [teamError, setTeamError] = React.useState('')
  const [boardError, setBoardError] = React.useState()
  const [teamsObj, setTeamsObj] = React.useState({})
  const [usersObj, setUsersObj] = React.useState({})
  const user = useAuthContext()
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
        <Section>
          <Card>
            <h3>Team</h3>
            {teamError && <p>{teamError}</p>}
            <form onSubmit={handleCreateTeam}>
              <Input
                placeholder="Team Name"
                name="teamName"
                id="teamName"
                type="text"
                value={teamName}
                onChange={onTeamNameChange}
              />
              <Button
                type="submit"
                title="Create"
                variant="emphasis"
              />
            </form>
            <ul>
              {isTeamsList ? (
                Object.values(teamsObj).map(value => (
                  <li key={value.tid}>
                    <a href={`/team/${value.tid}`} alt={value.name}>
                      {value.name}
                    </a>
                  </li>
                ))
              ) : (<div>Loading ...</div>)}
            </ul>
          </Card>
        </Section>
        <Section>
          <Card>
            <h3>Board</h3>
            {boardError && <p>{boardError}</p>}
            <form onSubmit={handleCreateBoard}>
              <Input
                placeholder="Board Name"
                name="boardName"
                id="boardName"
                type="text"
                value={boardName}
                onChange={onBoardNameChange}
              />
              <div className="select">
                <select onChange={onBoardTeamChange}>
                  {isTeamsList && (
                    Object.values(teamsObj).map(value => (
                      <option
                        key={value.tid}
                        value={value.tid}
                      >
                        {value.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <Button
                type="submit"
                title="Create"
                variant="emphasis"
              />
            </form>
          </Card>
        </Section>
        {user && (
          <Section>
            <Card>
              <h3>Users</h3>
              <ul>
                {isUsersList ? (
                  Object.values(usersObj).map(value => (
                    <li key={value.bid}>
                      <a href={`/user/${value.uid}`} alt={value.username}>
                        {value.displayName}
                      </a>
                    </li>
                  ))
                ) : (<div>Loading ...</div>)}
              </ul>
            </Card>
          </Section>
        )}
      </Container>
    </Main>
  )
}

export default AdminPage
