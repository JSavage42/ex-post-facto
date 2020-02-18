import React from 'react'
import PropTypes from 'prop-types'

import Card from './Card'

const CardContainerEnum = Object.freeze({
  WENT_WELL: 'went-well',
  NEEDS_IMPROVE: 'needs-improved',
  ACTION_ITEMS: 'action-items',
})

const CardContainer = ({
  type,
  title,
  cardArray,
  handleAddCard,
  updateContent,
  plusOne,
}) => (
  <section className={type}>
    <header>
      <h2>{title}</h2>
      <button onClick={() => handleAddCard(type)}>Add Card</button>
    </header>
    <article className="card-container">
      {cardArray && cardArray.length >= 1 && cardArray.map(({ content, votes, _id }) => {
        return (
          <Card
            type={type}
            content={content}
            votes={votes}
            _id={_id}
            key={_id}
            updateContent={updateContent}
            plusOne={plusOne}
          />
        )
      })}
    </article>
  </section>
)

CardContainer.Variants = CardContainerEnum
CardContainer.propTypes = {
  cardArray: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
    }),
  ),
  handleAddCard: PropTypes.func.isRequired,
  plusOne: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'went-well',
    'needs-improved',
    'action-items',
  ]),
  updateContent: PropTypes.func.isRequired,
}

export default CardContainer
export { CardContainerEnum }
