import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CardContainer from './CardContainer'

const Section = styled.section`
  display: flex;
  overflow: scroll;
  height: 100%;

  section {
    border-right: 4px solid var(--black-hex);
    height: 100%;
    overflow: scroll;
    width: calc(100%/3);

    &:last-child {
      border-right: none;
    }
  }

  section header {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1rem;
    margin-top: 1rem;
    text-align: center;

    h2 {
      color: var(--red-hex);
    }

    button {
      background: var(--green-hex);
      border: none;
      border-radius: 50%;
      color: var(--white-hex);
      display: block;
      font-size: 2rem;
      height: 5rem;
      line-height: 3rem;
      margin-top: 0.5rem;
      width: 5rem;

      &:active, &:hover {
        color: var(--yellow-hex);
      }
    }
  }

  .card-container {
    align-content: flex-start;
    color: var(--red-hex);
    display: flex;
    justify-content: space-around;
    flex: 0 0 10rem;
    flex-flow: wrap;
    overflow: scroll;

    article {
      background-color: var(--green-hex);
      border-radius: 5%;
      box-shadow: 0.65rem 0.65rem 0.75rem 0.125rem rgba(0,0,0,0.3);
      color: #2f2f2f;
      font-size: 2.5rem;
      height: 25rem;
      margin: 2rem 0.5rem;
      max-width: 30rem;
      min-width: 22rem;
      padding: 1rem;
    }

    button {
      background: var(--yellow-hex);
      border-radius: 50%;
      color: var(--white-hex);
      padding: 0.5rem;

      &:active, &:hover {
        background: var(--green-hex);
        color: var(--white-hex)
      }
    }
  }

  .went-well .card-container article,
  .needs-improve .card-container article,
  .action-items .card-container article {
    border: 3px solid;
  }
  .went-well .card-container article {
    border-color: var(--black-hex);
  }
  .needs-improve .card-container article {
    border-color: var(--red-hex);
  }
  .action-items .card-container article {
    border-color: var(--yellow-hex);
  }
`

const CardsSection = ({
  wentWellObj,
  needsImproveObj,
  actionItemsObj,
  handleAddCard,
  bid,
  updateContent,
}) => {
  return (
    <Section>
      <CardContainer
        title="Went Well"
        cardObj={wentWellObj}
        type={CardContainer.Variants.WENT_WELL}
        handleAddCard={handleAddCard}
        bid={bid}
        updateContent={updateContent}
      />
      <CardContainer
        title="Needs Improvement"
        cardObj={needsImproveObj}
        type={CardContainer.Variants.NEEDS_IMPROVE}
        handleAddCard={handleAddCard}
        bid={bid}
        updateContent={updateContent}
      />
      <CardContainer
        title="Action Items"
        cardObj={actionItemsObj}
        type={CardContainer.Variants.ACTION_ITEMS}
        handleAddCard={handleAddCard}
        bid={bid}
        updateContent={updateContent}
      />
    </Section>
  )
}

CardsSection.propTypes = {
  wentWellArray: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired),
  needsImproveArray: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired),
  actionItemsArray: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired),
  handleAddCard: PropTypes.func.isRequired,
}

export default CardsSection
