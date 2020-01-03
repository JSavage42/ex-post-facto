import React from 'react'
import { Link } from 'react-router-dom'
import Section from './styled/Section'
import Card from './styled/Card'

const AdminCard = () => (
  <Section>
    <Card>
      <h3>Admin</h3>
      <Link to="/admin">Go to Admin Dashboard</Link>
    </Card>
  </Section>
)

export default AdminCard
