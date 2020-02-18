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
  const [fname, setFName] = useState('')
  const [lname, setLName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  useMemo(() => {
    getUser(uid).then(res => {
      setUserObj(res.data)
      setFName(res.data.fname)
      setLName(res.data.lname)
      setUsername(res.data.uname)
      setEmail(res.data.email)
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
    const data = { ...userObj, fname, lname, email, username }
    updateUser(uid, data, setError)
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
              onChange={handleInputChange}
              placeholder='First Name'
            />
            <Input
              name="lname"
              id="lname"
              type="text"
              onChange={handleInputChange}
              placeholder='Last Name'
            />
            <Input
              name="uname"
              id="uname"
              type="text"
              onChange={handleInputChange}
              placeholder='Username'
            />
            <Input
              name="email"
              id="email"
              type="text"
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
