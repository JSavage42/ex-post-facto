import axios from 'axios'
import { GET, POST, HEADERS, DB } from '../constants'
const LOCAL_URL = `${DB.url}:${DB.port}/api/teams`

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

export const createTeam = teamName => {
  const data = { name: teamName }
  return (
    axios({
      url: `${LOCAL_URL}/create`,
      method: POST,
      headers: HEADERS,
      data,
    })
  )
}
