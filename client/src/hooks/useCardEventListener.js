import { useEffect } from 'react'

const useCardEventListener = (bid, type, setArray) => {
  const eventName = 'cards'
  const element = new EventSource(`http://localhost:5000/api/cards/${bid}/${type}`)

  const handler = ({ data }) => {
    const cards = JSON.parse(data).cards
    setArray(cards)
  }
  
  useEffect(() => {
    const isSupported = element && element.addEventListener
    if (!isSupported) return
    
    // Add event listener
    element.addEventListener(eventName, handler)
  }, [eventName, handler, element])
}

export default useCardEventListener
