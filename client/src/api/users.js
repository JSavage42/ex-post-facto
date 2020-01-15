import axios from 'axios'
import { GET, POST, HEADERS, database as db } from './constants'

const LOCAL_URL = `http://${db.host}:${db.port}/api/users`

export const getUsers = () => (
  axios({
    url: `${LOCAL_URL}`,
    GET,
    headers: HEADERS,
  })
)
export const getUser = uid => (
  axios({
    url: `${LOCAL_URL}/${uid}`,
    GET,
    headers: HEADERS,
  })
)

export const updateUser = (uid, data) => (
  axios({
    url: `${LOCAL_URL}/${uid}`,
    POST,
    headers: HEADERS,
    data,
  })
)

export const login = (data) => (
  axios({
    url: `${LOCAL_URL}/login`,
    POST,
    headers: HEADERS,
    data,
  })
)