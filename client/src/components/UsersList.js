import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Section from './styled/Section'

const UsersList = ({ isList, obj }) => (
  <Section title="Users">
    <ul>
      {isList && (
        Object.values(obj).map(value => (
          <li key={value._id}>
            <Link to={`/user/${value._id}`} alt={value.name}>
              {`${value.fname} ${value.lname}`}
            </Link>
          </li>
        ))
      )}
    </ul>
  </Section>
)

UsersList.propTypes = {
  isList: PropTypes.bool.isRequired,
  obj: PropTypes.instanceOf(Object).isRequired,
}

export default UsersList
