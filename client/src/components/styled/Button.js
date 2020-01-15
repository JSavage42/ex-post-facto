import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
  variant,
  handleClick,
  title,
  type,
}) => (
  <button
    type={type}
    onClick={handleClick}
    className={`button ${variant}`}
  >
    {title}
  </button>
)

Button.propTypes = {
  variant: PropTypes.string,
  handleClick: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.oneOf(['button', 'reset', 'submit'])
}

export default Button
