import React from 'react'

import { teams, boards } from '../components/contexts/FirebaseAPI/firebase';
import Header from '../components/Header'
import Hourglass from '../components/styled/Hourglass'
import Card from '../components/styled/Card';
import Main from '../components/styled/Main';
import Container from '../components/styled/Container';
import Section from '../components/styled/Section';

const LandingPage = () => {
  const [teamsObj, setTeamsObj] = React.useState({})
  const [boardObj, setBoardObj] = React.useState({})

  React.useMemo(() => {
    teams().on('value', snapshot => {
      setTeamsObj(snapshot.val());
    })
  }, [setTeamsObj])

  React.useMemo(() => {
    boards().on('value', snapshot => {
      setBoardObj(snapshot.val());
    })
  }, [setBoardObj])

  const isTeamsList = Object.values(teamsObj).length !== 0;
  const isBoardsList = Object.values(boardObj).length !== 0;
  const isLoading = !(isTeamsList || isBoardsList);
  return (
    <Main>
      <Header />
      <Section>
        <h2>Dashboard</h2>
      </Section>
      <Container className={isLoading ? '-isLoading' : ''}>
        {isLoading && <Hourglass />}
        <Section>
          <Card>
            <h3>Admin</h3>
            <a href="/admin">Go to Admin Dashboard</a>
          </Card>
        </Section>
        <Section>
          <Card>
            <h3>Teams</h3>
            <p>{isTeamsList ? 'Click a team to join' : ''}</p>
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
          <h3>Boards</h3>
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
      </Container>
    </Main>
  )
}

export default LandingPage
