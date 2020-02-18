import axios from 'axios'
import { GET, POST, HEADERS, database as db } from './constants'

const LOCAL_URL = `http://${db.host}:${db.port}/api/boards`

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

export const getCardsOfType = (bid, type) => (
  axios({
    url: `${LOCAL_URL}/${bid}/cards/${type}`,
    method: GET,
    headers: HEADERS,
  })
)

export const addCard = (bid, type) => (
  axios({
    url: `${LOCAL_URL}/${bid}/add-card`,
    method: POST,
    headers: HEADERS,
    data: {
      type,
    },
  })
)

export const getBoardFromTid = (tid) => (
  axios({
    url: `${LOCAL_URL}/team/${tid}`,
    method: GET,
    headers: HEADERS,
  })
)

export const updateCardContent = (id, data) => (
  axios({
    url: `${LOCAL_URL}/cards/${id}/update`,
    method: POST,
    headers: HEADERS,
    data,
  })
)

export const createBoard = (boardName, boardTeamId) => {
  const data = { title: boardName, team: boardTeamId }
  return (
    axios({
      url: `${LOCAL_URL}/create`,
      method: POST,
      headers: HEADERS,
      data,
    })
  )
}
