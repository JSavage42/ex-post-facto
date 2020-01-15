import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Section from './styled/Section'
import Card from './styled/Card'

const BoardsList = ({ isList, obj }) => (
  <Section>
    <Card>
      <h3>Boards</h3>
      <ul>
        {isList ? (
          Object.values(obj).map(value => (
            <li key={value.id}>
              <Link to={`/board/${value.id}`} alt={value.title}>
                {value.title}
              </Link>
            </li>
          ))
        ) : (<div>Loading ...</div>)}
      </ul>
    </Card>
  </Section>
)

BoardsList.propTypes = {
  isList: PropTypes.bool.isRequired,
  obj: PropTypes.instanceOf(Object).isRequired,
}

export default BoardsList
