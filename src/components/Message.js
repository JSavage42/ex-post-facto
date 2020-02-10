import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const P = styled.p`
  color: red;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bolder;
  
  .small {
    font-size: 1.75rem;
  }
  
  .info {
    color: var(--black);
  }
`

const Message = ({ value, size, type }) => {
  return (
    <P>
      <span className={`${size} ${type}`}>
        {`${type === 'error' ? 'Error: ' : ''} ${value}`}
      </span>
    </P>
  )
}

Message.propTypes = {
  size: PropTypes.string,
  type: PropTypes.oneOf(['info', 'error']),
  value: PropTypes.string.isRequired,
}
Message.defaultProps = {
  type: 'error',
}

export default Message
