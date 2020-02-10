import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Section from './styled/Section'

const TeamsList = ({ isList, obj }) => (
  <Section title="Teams">
    <ul>
      {
        Object.values(obj).map(value => (
          <li key={value._id}>
            <Link to={`/team/${value._id}`} alt={value.name}>
              {value.name}
            </Link>
          </li>
        ))
      }
    </ul>
  </Section>
)

TeamsList.propTypes = {
  isList: PropTypes.bool.isRequired,
  obj: PropTypes.instanceOf(Object).isRequired,
}

export default TeamsList
