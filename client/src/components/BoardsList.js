import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Section from './styled/Section'

const BoardsList = ({ isList, obj }) => (
  <Section title="Boards">
    <ul>
      {isList && (
        Object.values(obj).map(value => (
          <li key={value._id}>
            <Link to={`/board/${value._id}`} alt={value.title}>
              {value.title}
            </Link>
          </li>
        ))
      )}
    </ul>
  </Section>
)

BoardsList.propTypes = {
  isList: PropTypes.bool.isRequired,
  obj: PropTypes.instanceOf(Object).isRequired,
}

export default BoardsList
