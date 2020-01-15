import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Section from './styled/Section'
import Card from './styled/Card'

const TeamsList = ({ isList, obj }) => (
  <Section>
    <Card>
      <h3>Teams</h3>
      <p>{isList ? 'Click a team to join' : ''}</p>
      <ul>
        {isList ? (
          Object.values(obj).map(value => (
            <li key={value.id}>
              <Link to={`/team/${value.id}`} alt={value.name}>
                {value.name}
              </Link>
            </li>
          ))
        ) : (<div>Loading ...</div>)}
      </ul>
    </Card>
  </Section>
)

TeamsList.propTypes = {
  isList: PropTypes.bool.isRequired,
  obj: PropTypes.instanceOf(Object).isRequired,
}

export default TeamsList
