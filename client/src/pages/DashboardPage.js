import React, { useState, useMemo } from 'react'

import AdminCard from '../components/AdminCard'
import BoardsList from '../components/BoardsList'
import Container from '../components/styled/Container'
import Main from '../components/styled/Main'
import SubHeading from '../components/styled/SubHeading'
import TeamsList from '../components/TeamsList'

import { getBoards } from '../api/boards/boards'
import { getTeams } from '../api/teams/teams'

const LandingPage = () => {
  const [teamsObj, setTeamsObj] = useState({})
  const [boardObj, setBoardObj] = useState({})
  const [fname, setFName] = useState('')
  
  useMemo(() => {
    getTeams().then(res => {
      setTeamsObj(res.data)
    })
  }, [setTeamsObj])

  useMemo(() => {
    getBoards().then(res => {
      setBoardObj(res.data)
    })
  }, [setBoardObj])

  const isTeamsList = Object.values(teamsObj).length !== 0
  const isBoardsList = Object.values(boardObj).length !== 0
  return (
    <Main>
      <SubHeading>Welcome{fname ? `, ${fname}` : ''}</SubHeading>
      <Container>
        <AdminCard />
        {isTeamsList && <TeamsList isList={isTeamsList} obj={teamsObj} />}
        {isBoardsList && <BoardsList isList={isBoardsList} obj={boardObj} />}
      </Container>
    </Main>
  )
}

export default LandingPage
