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
  bid,
  updateContent,
  plusOne,
}) => (
  <section className={type}>
    <header>
      <h2>{title}</h2>
      <button onClick={() => handleAddCard(type)}>Add Card</button>
    </header>
    <article className="card-container">
      {cardArray && cardArray.length >= 1 && cardArray.map(({ content, votes, id }) => {
        return (
          <Card
            bid={bid}
            type={type}
            content={content}
            votes={votes}
            id={id}
            key={id}
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
  title: PropTypes.string.isRequired,
  cardArray: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ),
  type: PropTypes.oneOf([
    'went-well',
    'needs-improved',
    'action-items',
  ]),
  handleAddCard: PropTypes.func.isRequired,
}

export default CardContainer
export { CardContainerEnum }
