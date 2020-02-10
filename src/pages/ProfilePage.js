import React, { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import Button from '../components/styled/Button'
import Container from '../components/styled/Container'
import Input from '../components/styled/Input'
import Main from '../components/styled/Main'
import Message from '../components/Message'
import Section from '../components/styled/Section'
import SubHeading from '../components/styled/SubHeading'

import { updateUser, getUser } from '../api/users/users'

const ProfilePage = () => {
  const [userObj, setUserObj] = useState({})
  const location = useLocation()
  const uid = location.pathname.substring(6)
  const [fname, setFName] = useState(userObj.fname)
  const [lname, setLName] = useState(userObj.lname)
  const [username, setUsername] = useState(userObj.uname)
  const [email, setEmail] = useState(userObj.email)
  const [error, setError] = useState()

  useMemo(() => {
    getUser(uid).then(res => {
      setUserObj(res.data)
    })
  }, [uid])
  
  const handleInputChange = e => {
    const target = e.target
    const value = target.value
    const name = target.name

    switch (name) {
      case 'fname':
        setFName(value)
        break
      case 'lname':
        setLName(value)
        break
      case 'uname':
        setUsername(value)
        break
      case 'email':
        setEmail(value)
        break
      default: setError('No value to change')
    }
  }

  const updateUserProfile = e => {
    e.preventDefault()
    console.log(uid)
    const data = { fname, lname, email, username }
    console.log(data)
    updateUser(uid, data)
  }

  return (
    <Main>
      <SubHeading>{`${userObj.fname} ${userObj.lname}'s Profile`}</SubHeading>
      {error && <Message value={error} />}
      <Container>
        <Section title="Personal Information">
          <p>Email: <a href={`mailto:${userObj.email}`}>{userObj.email}</a></p>
          <p>Username: {userObj.username}</p>
        </Section>
        <Section title="Update Information">
          <form onSubmit={updateUserProfile}>
            <Input
              name="fname"
              id="fname"
              type="text"
              value={fname}
              onChange={handleInputChange}
              placeholder='First Name'
            />
            <Input
              name="lname"
              id="lname"
              type="text"
              value={lname}
              onChange={handleInputChange}
              placeholder='Last Name'
            />
            <Input
              name="uname"
              id="uname"
              type="text"
              value={username}
              onChange={handleInputChange}
              placeholder='Username'
            />
            <Input
              name="email"
              id="email"
              type="text"
              value={email}
              onChange={handleInputChange}
              placeholder='Email'
            />
            <Button
              type="submit"
              title="Update"
              variant="emphasis"
            />
          </form>
        </Section>
      </Container>
    </Main>
  )
}

export default ProfilePage
