import React from 'react'
import styled from 'styled-components'

import { onAuthUserListener, onUpdateProfile } from '../components/contexts/FirebaseAPI/firebase';
import Header from '../components/Header'
import Input from '../components/styled/Input'
import Button from '../components/styled/Button'

const Main = styled.main`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  h2 {
    padding: 2rem;
    font-size: 4rem;
  }
`

const Section = styled.section`
  margin: 0 auto;
  padding: 2rem;
  width: 80%;

  h3 {
    font-size: 3rem;
  }
  form input,
  form button {
    width: 50%;
  }
`

const ProfilePage = props => {
  const [fname, setFName] = React.useState('');
  const [lname, setLName] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    const currentUser = onAuthUserListener();
    setCurrentUser(currentUser);
  }, []);

  const onFNameChange = (e) => {
    const { value } = e.target;
    setFName(value);
  }
  const onLNameChange = (e) => {
    const { value } = e.target;
    setLName(value);
  }

  const updateUserProfile = () => {
    const displayName = `${fname} ${lname}`
    onUpdateProfile(displayName);
  };

  console.log(currentUser)

  return (
    <Main>
      <Header />
      <h2>Profile</h2>
      <Section>
        <h3>Personal Information</h3>
        <form onSubmit={updateUserProfile}>
          <Input
            placeholder="First Name"
            name="fname"
            id="fname"
            type="text"
            value={fname}
            onChange={onFNameChange}
          />
          <Input
            placeholder="Last Name"
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
      </Section>
    </Main>
  )
}

export default ProfilePage
