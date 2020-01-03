import React from 'react'

import { teams, boards } from '../components/contexts/firebase'
import Header from '../components/Header'
import Hourglass from '../components/styled/Hourglass'
import Main from '../components/styled/Main'
import Container from '../components/styled/Container'
import Section from '../components/styled/Section'
import { useAuthorizationStateContext } from '../components/contexts/Authorization'
import BoardsList from '../components/BoardsList'
import TeamsList from '../components/TeamsList'
import AdminCard from '../components/AdminCard'

const LandingPage = ({ currentUser }) => {
  const [teamsObj, setTeamsObj] = React.useState({})
  const [boardObj, setBoardObj] = React.useState({})
  const { userAuthorization } = useAuthorizationStateContext()

  React.useMemo(() => {
    teams().on('value', snapshot => {
      setTeamsObj(snapshot.val())
    })
  }, [setTeamsObj])

  React.useMemo(() => {
    boards().on('value', snapshot => {
      setBoardObj(snapshot.val())
    })
  }, [setBoardObj])

  const isTeamsList = Object.values(teamsObj).length !== 0
  const isBoardsList = Object.values(boardObj).length !== 0
  const isLoading = !(isTeamsList || isBoardsList)
  return (
    <Main>
      <Header />
      <Section>
        <h2>Dashboard</h2>
      </Section>
      <Container className={isLoading ? '-isLoading' : ''}>
        {isLoading && <Hourglass />}
        {userAuthorization === 'ADMIN' && <AdminCard />}
        <TeamsList isList={isTeamsList} obj={teamsObj} />
        <BoardsList isList={isBoardsList} obj={boardObj} />
      </Container>
    </Main>
  )
}

export default LandingPage
