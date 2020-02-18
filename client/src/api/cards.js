import axios from 'axios'

import { GET, POST, HEADERS, DB } from './constants'

const LOCAL_URL = `${DB.url}:${DB.port}/api/cards`

export const getCards = ({ bid }) => (
  axios({
    url: `${LOCAL_URL}/board/${bid}`,
    method: GET,
    headers: HEADERS,
  })
)

export const getCard = (cid) => (
  axios({
    url: `${LOCAL_URL}/${cid}`,
    method: GET,
    headers: HEADERS,
  })
)

export const updateCard = (cid, data) => {
  return (
    axios({
      url: `${LOCAL_URL}/${cid}/update`,
      method: POST,
      headers: HEADERS,
      data,
    })
  )
}
export const getCardsOfType = (bid, type, setArray) => {
  const source = new EventSource(`http://localhost:5000/api/cards/${bid}/${type}`)
  const handleEventStream = event => {
    const { data } = event
    const cards = JSON.parse(data).cards
    setArray(cards)
  }
  source.addEventListener(
    'connect',
    handleEventStream,
    false,
  )
  source.addEventListener(
    'cards',
    handleEventStream,
    false,
  )
  // return source.removeEventListener('cards', handleEventStream)
}

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
