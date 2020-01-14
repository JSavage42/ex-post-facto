import axios from 'axios'
import { GET, HEADERS, database as db } from '../constants'

const LOCAL_URL = `http://${db.host}:${db.port}/api/teams`

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
