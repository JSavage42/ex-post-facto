import axios from 'axios'
import { GET, POST, HEADERS, DB } from '../constants'
const LOCAL_URL = `${DB.url}:${DB.port}/api/boards`

export const getBoards = () => (
  axios({
    url: `${LOCAL_URL}/`,
    GET,
    headers: HEADERS,
  })
)

export const getBoard = (bid) => (
  axios({
    url: `${LOCAL_URL}/${bid}`,
    GET,
    headers: HEADERS,
  })
)

export const updateBoard = (bid, data) => (
  axios({
    url: `${LOCAL_URL}/${bid}/update`,
    POST,
    headers: HEADERS,
    data,
  })
)

export const getBoardFromTid = (tid, setObject) => {
  const source = new EventSource(`http://localhost:5000/api/boards/team/${tid}`)
  source.addEventListener(
    'connect',
    ({ data }) => {
      const boards = JSON.parse(data).boards
      setObject(boards)
    },
    false,
  )
  source.addEventListener(
    'boards',
    ({ data }) => {
      const boards = JSON.parse(data).boards
      setObject(boards)
    },
    false,
  )
}

export const createBoard = data => (
  axios({
    url: `${LOCAL_URL}/create`,
    method: POST,
    headers: HEADERS,
    data,
  })
)
