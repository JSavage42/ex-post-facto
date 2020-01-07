import axios from 'axios'
import { GET, POST, HEADERS } from '../constants'

const LOCAL_URL = `${process.env.MONGO_URL}:${process.env.MONGO_PORT}/api/boards`

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
      type
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

export const updateCardContent = (bid, data) => (
  axios({
    url: `${LOCAL_URL}/${bid}/${data._id}/update`,
    method: POST,
    headers: HEADERS,
    data,
  })
)
