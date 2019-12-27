import React from 'react'
import styled from 'styled-components'

import { team, teams, onAuthUserListener } from '../components/contexts/FirebaseAPI/firebase';
import Header from '../components/Header'
import Input from '../components/styled/Input'
import Button from '../components/styled/Button'

const Main = styled.main`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  h2 {
    padding: 2rem;
    font-size: 4rem;
  }
`

const Section = styled.section`
  margin: 0 auto;
  padding: 2rem;
  width: 80%;

  h3 {
    font-size: 3rem;
  }
  form input,
  form button {
    width: 50%;
  }
`

const AdminPage = props => {
  const [name, setName] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    const currentUser = onAuthUserListener();
    setCurrentUser(currentUser);
  }, []);

  const onNameChange = (e) => {
    const { value } = e.target;
    setName(value);
  }

  function handleCreateTeam(e) {
    e.preventDefault();
    const newTeamRef = teams().push();
    const newTeamId = newTeamRef.key;
    team(newTeamId).set({
      tid: newTeamId,
      name,
    })
  }

  console.log(currentUser);

  return (
    <Main>
      <Header />
      <h2>Admin</h2>
      <Section>
        <h3>Teams</h3>
        <form onSubmit={handleCreateTeam}>
          <Input
            placeholder="Username"
            name="username"
            id="username"
            type="text"
            value={name}
            onChange={onNameChange}
          />
          <Button
            type="submit"
            title="Create"
            variant="emphasis"
          />
        </form>
      </Section>
      {currentUser && (
        <Section>
          <h3>User</h3>
          {currentUser.displayName}
        </Section>
      )}
    </Main>
  )
}

export default AdminPage
