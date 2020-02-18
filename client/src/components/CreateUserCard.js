import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from './styled/Button'
import Input from './styled/Input'
import Message from './Message'
import Section from './styled/Section'

const OutOfOrder = styled.b`
  font-size: 2rem;
  color: red;
`

const CreateUserCard = ({
  memberError,
  handleAddMember,
  username,
  handleInputChange,
  isMemberList,
  memberObj,
}) => {
  return (
    <Section title="Add Members">
      <OutOfOrder>This don't work yet</OutOfOrder>
      {memberError && <Message value={memberError} size='small' />}
      <form onSubmit={handleAddMember}>
        <Input
          placeholder="User Name"
          name="username"
          id="username"
          type="text"
          value={username}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          title="Add"
          variant="emphasis"
        />
      </form>
      {isMemberList && (
        Object.values(memberObj).map(value => (
          <ul>
            <Link to={`/user/${value._id}`}>  
              <li key={value._id}>
                {`${value.fname} ${value.lname}`}
              </li>
            </Link>
          </ul>
        ))
      )}
    </Section>
  )
}

CreateUserCard.propTypes = {
  handleAddMember: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  isMemberList: PropTypes.bool,
  memberError: PropTypes.string,
  memberObj: PropTypes.instanceOf(Object),
  username: PropTypes.string,
}

export default CreateUserCard
