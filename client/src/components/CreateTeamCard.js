import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Input from './styled/Input'
import Button from './styled/Button'
import Card from './styled/Card'
import Section from './styled/Section'

const CreateTeamCard = ({ error, handleCreate, name, onNameChange, isList, obj }) => (
  <Section>
    <Card>
      <h3>Team</h3>
      {error && <p>{error}</p>}
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
    </Card>
  </Section>
)

CreateTeamCard.propTypes = {
  error: PropTypes.string,
  handleCreate: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  isList: PropTypes.bool.isRequired,
  obj: PropTypes.instanceOf(Object).isRequired,
}

export default CreateTeamCard
