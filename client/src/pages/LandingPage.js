import React from 'react'
import Header from '../components/Header'
import Hourglass from '../components/styled/Hourglass'
import Main from '../components/styled/Main'
import Container from '../components/styled/Container'
import BoardsList from '../components/BoardsList'
import TeamsList from '../components/TeamsList'
import AdminCard from '../components/AdminCard'
import { getTeams } from '../api/teams'
import { getBoards } from '../api/boards'

const LandingPage = () => {
  const [teamsObj, setTeamsObj] = React.useState({})
  const [boardObj, setBoardObj] = React.useState({})

  React.useMemo(() => {
    getTeams().then(res => {
      setTeamsObj(res.data)
    })
  }, [setTeamsObj])

  React.useMemo(() => {
    getBoards().then(res => {
      setBoardObj(res.data)
    })
  }, [setBoardObj])

  const isTeamsList = Object.values(teamsObj).length !== 0
  const isBoardsList = Object.values(boardObj).length !== 0
  const isLoading = !(isTeamsList || isBoardsList)
  return (
    <Main>
      <Header />
      <Container className={isLoading ? '-isLoading' : ''}>
        {isLoading && <Hourglass />}
        <AdminCard />
        <TeamsList isList={isTeamsList} obj={teamsObj} />
        <BoardsList isList={isBoardsList} obj={boardObj} />
      </Container>
    </Main>
  )
}

export default LandingPage
