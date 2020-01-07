import axios from 'axios'
import { GET, HEADERS } from '../constants'
const LOCAL_URL = `${process.env.MONGO_URL}:${process.env.MONGO_PORT}/api/teams`

export const getTeams = () => (
  axios({
    url: `${LOCAL_URL}`,
    GET,
    headers: HEADERS,
  })
)
export const getTeam = tid => (
  axios({
    url: `${LOCAL_URL}/${tid}`,
    GET,
    headers: HEADERS,
  })
)
