import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Button from './styled/Button'
import Input from './styled/Input'
import Message from './Message'
import Section from './styled/Section'

const CreateBoardCard = ({
  error,
  handleCreate,
  name,
  handleInputChange,
  isList,
  obj,
  teamSelect,
  boardList,
  boardObj,
  isLoading,
}) => (
  <Section title="Boards">
    {error && <Message type="error" value={error} size="small" />}
    <form onSubmit={handleCreate}>
      <Input
        placeholder="Board Name"
        name="boardName"
        id="boardName"
        type="text"
        value={name}
        onChange={handleInputChange}
      />
      {teamSelect && (
        <div className="select">
          <select name="boardTeam" onChange={handleInputChange} defaultValue="none">
            <option value="none" disabled hidden>
              Select an Option
            </option>
            {isList && (
              Object.values(obj).map(value => (
                <option
                  key={value._id}
                  value={value._id}
                >
                  {value.name}
                </option>
              ))
            )}
          </select>
        </div>
      )}
      <Button
        type="submit"
        title="Create"
        variant="emphasis"
      />
    </form>
    {boardList && (
      Object.values(boardObj).map(value => (
        <li key={value._id}>
          <Link to={`/board/${value._id}`} alt={value.title}>
            {value.title}
          </Link>
        </li>
      ))
    )}
    {isLoading && <Message type="info" value='Loading...' size="small" />}
  </Section>
)

CreateBoardCard.propTypes = {
  boardList: PropTypes.bool,
  boardObj: PropTypes.instanceOf(Object),
  error: PropTypes.string,
  handleCreate: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  isList: PropTypes.bool,
  isLoading: PropTypes.bool,
  name: PropTypes.string.isRequired,
  obj: PropTypes.instanceOf(Object),
  teamSelect: PropTypes.bool,
}

export default CreateBoardCard
