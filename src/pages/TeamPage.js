import React from 'react'
import { useLocation } from 'react-router-dom'

import {
  team,
  teams,
  board,
  boards,
} from '../components/contexts/FirebaseAPI/firebase';
import Header from '../components/Header'
import Input from '../components/styled/Input'
import Button from '../components/styled/Button'
import Card from '../components/styled/Card'
import Main from '../components/styled/Main';
import Container from '../components/styled/Container';
import Section from '../components/styled/Section';

const TeamPage = () => {
  const [teamName, setTeamName] = React.useState('');
  const [boardName, setBoardName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [members, setMembers] = React.useState({});
  const [boardObj, setBoardObj] = React.useState([]);
  const location = useLocation();
  const tid = location.pathname.substring(6);

  React.useMemo(() => {
    team(tid).on('value', snapshot => {
      setTeamName(snapshot.val().name)
      setMembers(snapshot.val().members);
    })
  }, [tid])

  React.useMemo(() => {
    const boardList = [];
    boards().on('value', snapshot => {
      Object.values(snapshot.val()).forEach(value => {
        if (value.team === tid) {
          console.log('got one', value);
          boardList.push(value)
        }
      })
      setBoardObj(boardList);
    })
  }, [tid])

  const handleAddMember = e => {
    e.preventDefault()
    const newMemberRef = team(tid).child('members').push();
    const newMemberId = newMemberRef.key;
    team(tid).child('members').push({
      uid: newMemberId,
      username,
    })
  }

  const onUsernameChange = e => {
    const { value } = e.target;
    setUsername(value);
  }

  const onBoardNameChange = (e) => {
    const { value } = e.target;
    setBoardName(value);
  }

  const handleCreateBoard = e =>{
    e.preventDefault()
    const newBoardRef = teams().push();
    const newBoardId = newBoardRef.key;
    board(newBoardId).set({
      bid: newBoardId,
      title: boardName,
      team: tid,
    })
  }

  const isBoardsList = Object.values(boardObj).length !== 0;

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
                    <a href={`/board/${value.bid}`} alt={value.title}>
                      {value.title}
                    </a>
                  </li>
                ))
              ) : (<div>Loading ...</div>)}
            </ul>
          </Card>
        </Section>
        <Section>
          <Card>
            <h3>Members</h3>
            {members &&
              Object.values(members).map(member => (
                <p key={member.uid}>{member.username}</p>
              ))}
          </Card>
        </Section>
        <Section>
          <Card>
            <h3>Add Members</h3>
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
