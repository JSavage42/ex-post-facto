import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Banner = styled.div`
  background: var(--white);
  padding: 2rem;
  font-size: 2rem;
  font-weight: 800;
  color: var(--gold);
  width: 100%;
`

const IsOnlineBanner = () => {
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    setIsOnline(navigator.onLine)
  }, [])
  return (
    <Banner className={isOnline ? '-hidden' : '-shown'}>
      You're offline, your changes will not be added to the database until you are back online.
    </Banner>
  )
}

export default IsOnlineBanner
