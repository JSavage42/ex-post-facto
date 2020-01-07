import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Input from '../components/styled/Input'
import Button from '../components/styled/Button'
import Card from '../components/styled/Card'
import { updateUser, getUser } from '../api/users/users'

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

const ProfilePage = () => {
  const [userObj, setUserObj] = React.useState({})
  const location = useLocation()
  const uid = location.pathname.substring(5)
  console.log(userObj)
  const [fname, setFName] = React.useState(userObj.fname)
  const [lname, setLName] = React.useState(userObj.lname)
  const [email, setEmail] = React.useState(userObj.email)

  React.useMemo(() => {
    getUser(uid).then(res => {
      setUserObj(res.data)
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
  const onEmailChange = (e) => {
    const { value } = e.target
    setEmail(value)
  }

  const updateUserProfile = () => {
    const name = `${fname} ${lname}`
    const data = { name, email }
    updateUser(uid, data)
  }

  return (
    <Main>
      <Header />
      <Section>
        <h2>{userObj.name}'s Profile</h2>
        <small>{userObj.email}</small>
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
              placeholder='First Name'
            />
            <Input
              name="lname"
              id="lname"
              type="text"
              value={lname}
              onChange={onLNameChange}
              placeholder='Last Name'
            />
            <Input
              name="email"
              id="email"
              type="text"
              value={email}
              onChange={onEmailChange}
              placeholder='Email'
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
