import React from 'react'
import { useLocation, Link } from 'react-router-dom'

import {
  team,
  teams,
  board,
  boards,
} from '../components/contexts/firebase'
import Header from '../components/Header'
import Input from '../components/styled/Input'
import Button from '../components/styled/Button'
import Card from '../components/styled/Card'
import Main from '../components/styled/Main'
import Container from '../components/styled/Container'
import Section from '../components/styled/Section'

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
    team(tid).on('value', snapshot => {
      setTeamName(snapshot.val().name)
      setMembers(snapshot.val().members)
    })
  }, [tid])

  React.useMemo(() => {
    const boardList = []
    boards().on('value', snapshot => {
      Object.values(snapshot.val()).forEach(value => {
        if (value.team === tid) {
          boardList.push(value)
        }
      })
      setBoardObj(boardList)
    })
  }, [tid])

  const handleAddMember = e => {
    e.preventDefault()
    if (username !== '') {

      const newMemberRef = team(tid).child('members').push()
      const newMemberId = newMemberRef.key
      team(tid).child('members').push({
        uid: newMemberId,
        username,
      })
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
      const newBoardRef = teams().push()
      const newBoardId = newBoardRef.key
      board(newBoardId).set({
        bid: newBoardId,
        title: boardName,
        team: tid,
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
                  <li key={value.bid}>
                    <Link to={`/board/${value.bid}`} alt={value.title}>
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
                  <li key={member.uid}>
                    <Link to={`/user/${member.uid}`} alt={member.displayName}>
                      {member.username}
                    </Link>
                  </li>
                ))}
            </ul>
          </Card>
        </Section>
        <Section>
          <Card>
            <h3>Add Members</h3>
            {memberError && <p>{memberError}</p>}
            <form onSubmit={handleAddMember}>
              <Input
                placeholder="User Name"
                name="username"
                id="username"
                type="text"
                value={username}
                onChange={onUsernameChange}
              />
              <Button
                type="submit"
                title="Add"
                variant="emphasis"
              />
            </form>
          </Card>
        </Section>
      </Container>
    </Main>
  )
}

export default TeamPage
