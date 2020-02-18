import axios from 'axios'
import { GET, POST, HEADERS, DB } from './constants'
const LOCAL_URL = `${DB.url}:${DB.port}/api/users`

export const getUsers = () => (
  axios({
    url: `${LOCAL_URL}`,
    method: GET,
    headers: HEADERS,
  })
)
export const getUser = uid => (
  axios({
    url: `${LOCAL_URL}/${uid}`,
    method: GET,
    headers: HEADERS,
  })
)

export const updateUser = (uid, data, setError) => {
  return (
    axios({
      url: `${LOCAL_URL}/${uid}/update`,
      method: POST,
      headers: HEADERS,
      data,
    }).catch(e => setError(`${e}: No user`))
  )
}

export const login = (data) => (
  axios({
    url: `${LOCAL_URL}/login`,
    method: POST,
    headers: HEADERS,
    data,
  })
)
