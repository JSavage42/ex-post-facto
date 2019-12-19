import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card';

const CardContainerEnum = Object.freeze({
  WENT_WELL: 'went-well',
  NEEDS_IMPROVE: 'needs-improve',
  ACTION_ITEMS: 'action-items',
})

const CardContainer = (props) => {
  const { type, title, cardObj } = props;
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
        <button>+</button>
      </header>
      <article className="card-container">
        {card.length !== 0 && card.map(({ content, votes}) => {
          return (
            <Card content={content} votes={votes} key={`card-${content}`}/>
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
  ).isRequired,
  type: PropTypes.oneOf([
    'went-well',
    'needs-improve',
    'action-items',
  ]),
}

export default CardContainer
export { CardContainerEnum }
