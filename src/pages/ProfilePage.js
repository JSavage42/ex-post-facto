import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import { onUpdateProfile, users } from '../components/contexts/FirebaseAPI/firebase'
import Header from '../components/Header'
import Input from '../components/styled/Input'
import Button from '../components/styled/Button'
import Card from '../components/styled/Card'
import { useAuthContext } from '../components/contexts/AuthContext'

const Main = styled.main`
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  h2 {
    color: var(--yellow);
    padding: 2rem;
    font-size: 4rem;
  }

  h3 {
    color: var(--yellow);
    font-size: 3rem;
  }

`

const Section = styled.section`
  margin: 0 auto;
  padding: 2rem;
`

const ProfilePage = props => {
  const [userObj, setUserObj] = React.useState({})
  const user = useAuthContext()
  const location = useLocation()
  const uid = location.pathname.substring(5)
  console.log(userObj)
  const [fname, setFName] = React.useState(userObj.fname)
  const [lname, setLName] = React.useState(userObj.lname)

  React.useMemo(() => {
    users().child(uid).on('value', snapshot => {
      setUserObj(snapshot.val())
    })
  }, [uid])

  const onFNameChange = (e) => {
    const { value } = e.target
    setFName(value)
  }
  const onLNameChange = (e) => {
    const { value } = e.target
    setLName(value)
  }

  const updateUserProfile = () => {
    const displayName = `${fname} ${lname}`
    onUpdateProfile(user, displayName)
  }

  return (
    <Main>
      <Header />
      <Section>
        <h2>{userObj.displayName}'s Profile</h2>
      </Section>
      <Section>
        <Card>
          <h3>Personal Information</h3>
          <form onSubmit={updateUserProfile}>
            <Input
              name="fname"
              id="fname"
              type="text"
              value={fname}
              onChange={onFNameChange}
            />
            <Input
              name="lname"
              id="lname"
              type="text"
              value={lname}
              onChange={onLNameChange}
            />
            <Button
              type="submit"
              title="Create"
              variant="emphasis"
            />
          </form>
        </Card>
      </Section>
    </Main>
  )
}

export default ProfilePage
