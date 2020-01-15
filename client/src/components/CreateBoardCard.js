import React from 'react'
import PropTypes from 'prop-types'
import Input from './styled/Input'
import Button from './styled/Button'
import Card from './styled/Card'
import Section from './styled/Section'

const CreateBoardCard = ({ error, handleCreate, name, onNameChange, onTeamChange, isList, obj }) => (
  <Section>
    <Card>
      <h3>Board</h3>
      {error && <p>{error}</p>}
      <form onSubmit={handleCreate}>
        <Input
          placeholder="Board Name"
          name="boardName"
          id="boardName"
          type="text"
          value={name}
          onChange={onNameChange}
        />
        <div className="select">
          <select onChange={onTeamChange}>
            {isList && (
              Object.values(obj).map(value => (
                <option
                  key={value.id}
                  value={value.id}
                >
                  {value.name}
                </option>
              ))
            )}
          </select>
        </div>
        <Button
          type="submit"
          title="Create"
          variant="emphasis"
        />
      </form>
    </Card>
  </Section>
)

CreateBoardCard.propTypes = {
  error: PropTypes.string,
  handleCreate: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onTeamChange: PropTypes.func.isRequired,
  isList: PropTypes.bool.isRequired,
  obj: PropTypes.instanceOf(Object).isRequired,
}

export default CreateBoardCard
