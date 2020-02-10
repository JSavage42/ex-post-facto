import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Button from './styled/Button'
import Input from './styled/Input'
import Message from './Message'
import Section from './styled/Section'

const CreateTeamCard = ({ error, handleCreate, name, onNameChange, isList, obj }) => (
  <Section title="Team">
    {error && <Message value={error} size="small" />}
    <form onSubmit={handleCreate}>
      <Input
        placeholder="Team Name"
        name="teamName"
        id="teamName"
        type="text"
        value={name}
        onChange={onNameChange}
      />
      <Button
        type="submit"
        title="Create"
        variant="emphasis"
      />
    </form>
    <ul>
      {isList ? (
        Object.values(obj).map(value => (
          <li key={value._id}>
            <Link to={`/team/${value._id}`} alt={value.name}>
              {value.name}
            </Link>
          </li>
        ))
      ) : (<div>Loading ...</div>)}
    </ul>
  </Section>
)

CreateTeamCard.propTypes = {
  error: PropTypes.string,
  handleCreate: PropTypes.func.isRequired,
  isList: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  obj: PropTypes.instanceOf(Object).isRequired,
  onNameChange: PropTypes.func.isRequired,
}

export default CreateTeamCard
