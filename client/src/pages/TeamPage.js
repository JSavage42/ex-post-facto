import React from 'react'
import { useLocation, Link } from 'react-router-dom'

import Header from '../components/Header'
import Input from '../components/styled/Input'
import Button from '../components/styled/Button'
import Card from '../components/styled/Card'
import Main from '../components/styled/Main'
import Container from '../components/styled/Container'
import Section from '../components/styled/Section'
import { getTeam } from '../api/teams/teams'
import { getBoardFromTid, createBoard } from '../api/boards/boards'

const TeamPage = () => {
  const [teamName, setTeamName] = React.useState('')
  const [boardName, setBoardName] = React.useState('')
  const [boardError, setBoardError] = React.useState()
  const [username, setUsername] = React.useState('')
  const [memberError, setMemberError] = React.useState()
  const [members, setMembers] = React.useState({})
  const [boardObj, setBoardObj] = React.useState([])
  const location = useLocation()
  const tid = location.pathname.substring(6)

  React.useMemo(() => {
    getTeam(tid).then(res => {
      setTeamName(res.data.name)
      setMembers(res.data.members)
    })
  }, [tid])

  React.useMemo(() => {
    getBoardFromTid(tid).then(res => {
      setBoardObj(res.data)
    })
  }, [tid])

  const handleAddMember = e => {
    e.preventDefault()
    if (username !== '') {
      console.log(username)
    } else {
      setMemberError('Please enter a username')
    }
  }

  const onUsernameChange = e => {
    const { value } = e.target
    setUsername(value)
  }

  const onBoardNameChange = (e) => {
    const { value } = e.target
    setBoardName(value)
  }

  const handleCreateBoard = e =>{
    e.preventDefault()
    if (boardName !== '') {
      const data = {
        title: boardName,
        team: tid,
      }
      createBoard(data).then(res => {
        getBoardFromTid(tid).then(res => {
          setBoardObj(res.data)
        })
      })
    } else {
      setBoardError('Please enter a name')
    }
  }

  const isBoardsList = Object.values(boardObj).length !== 0

  return (
    <Main>
      <Header />
      <Section>
        <h2>Team {teamName}</h2>
      </Section>
      <Container>
        <Section>
          <Card>
            <h3>Boards</h3>
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
              <Button
                type="submit"
                title="Create"
                variant="emphasis"
              />
            </form>
            <ul>
              {isBoardsList ? (
                Object.values(boardObj).map(value => (
                  <li key={value._id}>
                    <Link to={`/board/${value._id}`} alt={value.title}>
                      {value.title}
                    </Link>
                  </li>
                ))
              ) : (<div>Loading ...</div>)}
            </ul>
          </Card>
        </Section>
        <Section>
          <Card>
            <h3>Members</h3>
            <ul>
              {members &&
                Object.values(members).map(member => (
                  <li key={member._id}>
                    <Link to={`/user/${member._id}`} alt={member.name}>
                      {member.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </Card>
        </Section>
        <Section>
          <Card>
            <h3>Add Members</h3>
            <b>This don't work yet</b>
            {memberError && <p>{memberError}</p>}
            <form onSubmit={handleAddMember}>
              <Input
                placeholder="User Name"
                name="username"
                id="username"
                type="text"
                value={username}
                onChange={onUsernameChange}
                disabled
              />
              <Button
                type="submit"
                title="Add"
                variant="emphasis"
                disabled
              />
            </form>
          </Card>
        </Section>
      </Container>
    </Main>
  )
}

export default TeamPage
