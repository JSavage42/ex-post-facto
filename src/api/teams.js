import axios from 'axios'
import { GET, POST, HEADERS, database as db } from './constants'

const LOCAL_URL = `http://${db.host}:${db.port}/api/teams`

export const getTeams = () => (
  axios({
    url: `${LOCAL_URL}`,
    method: GET,
    headers: HEADERS,
  })
)
export const getTeam = tid => (
  axios({
    url: `${LOCAL_URL}/${tid}`,
    method: GET,
    headers: HEADERS,
  })
)

export const createTeam = (teamName) => {
  const data = { name: teamName }
  console.log(data)
  axios({
    url: `${LOCAL_URL}/create`,
    method: POST,
    headers: HEADERS,
    data,
  }).then(res => {
    console.log()
  })
}
