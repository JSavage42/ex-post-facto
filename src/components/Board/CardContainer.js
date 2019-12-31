import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card';

const CardContainerEnum = Object.freeze({
  WENT_WELL: 'went-well',
  NEEDS_IMPROVE: 'needs-improve',
  ACTION_ITEMS: 'action-items',
})

const CardContainer = (props) => {
  const {
    type,
    title,
    cardObj,
    handleAddCard,
    bid,
    updateContent,
  } = props;
  const card = [];
  if (cardObj !== null) {
    Object.values(cardObj).forEach(value =>
      card.push(value)
    );
  }
  return (
    <section className={type}>
      <header>
        <h2>{title}</h2>
        <button onClick={() => handleAddCard(type)}>Add</button>
      </header>
      <article className="card-container">
        {card.length !== 0 && card.map(({ content, votes, id }) => {
          return (
            <Card
              bid={bid}
              type={type}
              content={content}
              votes={votes}
              id={id}
              key={`card-${content}`}
              updateContent={updateContent}
            />
          )
        })}
      </article>
    </section>
  )
}

CardContainer.Variants = CardContainerEnum;
CardContainer.propTypes = {
  title: PropTypes.string.isRequired,
  cardObj: PropTypes.objectOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
    })
  ),
  type: PropTypes.oneOf([
    'went-well',
    'needs-improve',
    'action-items',
  ]),
  handleAddCard: PropTypes.func.isRequired,
}

export default CardContainer
export { CardContainerEnum }
