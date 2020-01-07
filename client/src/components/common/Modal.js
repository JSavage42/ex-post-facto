import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ModalContainer = styled.div`
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid black;
  z-index: 9999;
`

const ModalView = styled.div`
  background: white;
  display: flex;
  font-size: 2rem;
  min-height: 50%;
  left: 50%;
  padding: 2rem;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
`

const CloseButton = styled.button`
  background: gray;
  box-shadow: 0 0 0 5px rgba(0,0,0,0.9);
  color: white;
  font-size: 3rem;
  height: 5rem;
  margin-top: 1.5rem;
  margin-right: 1.5rem;
  position: fixed;
  right: 0;
  top: 0;
  width: 5rem;
`

const Modal = ({
  isOpen,
  setIsOpen,
}) => {
  document.body.addEventListener('keydown', event => {
    if (event.keyCode === 27) {
      setIsOpen(false)
    }
  })
  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    isOpen && (
      <ModalContainer id="modal">
        <ModalView>
          Testing
          <CloseButton onClick={handleClose}>X</CloseButton>
        </ModalView>
      </ModalContainer>
    )
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
}

export default Modal
