import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
  variant,
  handleClick,
  title,
  type,
  disabled,
}) => (
  <button
    disabled={disabled}
    type={type}
    onClick={handleClick}
    className={`button ${variant}`}
  >
    {title}
  </button>
)

Button.propTypes = {
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  variant: PropTypes.string,
}

export default Button
