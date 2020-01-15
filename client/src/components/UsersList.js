import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Section from './styled/Section'
import Card from './styled/Card'

const UsersList = ({ isList, obj }) => (
  <Section>
    <Card>
      <h3>Users</h3>
      <ul>
        {isList ? (
          Object.values(obj).map(value => (
            <li key={value.id}>
              <Link to={`/user/${value.id}`} alt={value.name}>
                {value.name}
              </Link>
            </li>
          ))
        ) : (<div>Loading ...</div>)}
      </ul>
    </Card>
  </Section>
)

UsersList.propTypes = {
  isList: PropTypes.bool.isRequired,
  obj: PropTypes.instanceOf(Object).isRequired,
}

export default UsersList
