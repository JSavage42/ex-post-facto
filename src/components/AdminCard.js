import React from 'react'
import { Link } from 'react-router-dom'

import Section from './styled/Section'

const AdminCard = () => (
  <Section title="Admin">
    <Link to="/admin">Go to Admin Dashboard</Link>
  </Section>
)

export default AdminCard
