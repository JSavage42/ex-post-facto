import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import CardContainer from './CardContainer'

const Section = styled.section`
  display: flex;
  overflow: scroll;
  height: 100%;

  section {
    border-right: 4px solid var(--board-section-border-color);
    height: 100%;
    overflow: scroll;
    padding: 1rem;
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
      color: var(--board-section-heading-color);
      font-size: 1.75rem;
      font: var(--board-section-heading-font)
    }

    button {
      background: var(--board-section-button-bg-color);
      border: none;
      border-radius: 1.75rem;
      color: var(--board-section-button-font-color);
      display: block;
      font-size: 1.5rem;
      margin: 0.5rem 0;
      padding: 0.75rem;

      &:active, &:hover {
        background: var(--board-section-button-bg-color-hover);
      }
    }
  }

  .card-container {
    align-content: flex-start;
    color: var(--gold);
    display: flex;
    justify-content: space-around;
    flex: 0 0 5rem;
    flex-flow: wrap;
    overflow: scroll;

    article {
      border-radius: 1.75rem;
      box-shadow: var(--board-card-bs);
      font-size: 1.5rem;
      height: 20rem;
      margin: 0.5rem 0;
      padding: 1rem;
      transition: box-shadow 0.5s;
      width: 25rem;
      
      &:hover {
        box-shadow: var(--board-card-bs-hover);
        transition: box-shadow 0.5s;
      }
    }

    button {
      background: none;
      border-radius: 0.5rem;
      color: var(--board-card-plus-one-button-color);
      font-size: 1.5rem;

      &:active, &:hover {
        background: var(--board-card-plus-one-button-active-bg-color);
        color: var(--board-card-plus-one-button-active-color)
      }
    }
  }

  .went-well .card-container article,
  .went-well .card-container textarea, 
  .went-well button {
    background: var(--board-card-went-well-bg-color);
    color: var(--board-card-content-font-color);
  }
  
  .went-well button:hover,
  .needs-improved button:hover,
  .action-items button:hover {
    background: var(--board-card-button-bg-color-hover)
  }
  
  .needs-improved .card-container article,
  .needs-improved .card-container textarea,
  .needs-improved button {
    background: var(--board-card-needs-improved-bg-color);
    color: var(--board-card-content-font-color);
  }

  .action-items .card-container article,
  .action-items .card-container textarea,
  .action-items button {
    background: var(--board-card-action-items-bg-color);
    color: var(--board-card-content-font-color);
  }
`

const CardsSection = ({
  wentWellArray,
  needsImprovedArray,
  actionItemsArray,
  handleAddCard,
  updateContent,
  plusOne,
}) => {
  return (
    <Section>
      <CardContainer
        title="Went Well"
        cardArray={wentWellArray}
        type={CardContainer.Variants.WENT_WELL}
        handleAddCard={handleAddCard}
        updateContent={updateContent}
        plusOne={plusOne}
      />
      <CardContainer
        title="Needs Improvement"
        cardArray={needsImprovedArray}
        type={CardContainer.Variants.NEEDS_IMPROVE}
        handleAddCard={handleAddCard}
        updateContent={updateContent}
        plusOne={plusOne}
      />
      <CardContainer
        title="Action Items"
        cardArray={actionItemsArray}
        type={CardContainer.Variants.ACTION_ITEMS}
        handleAddCard={handleAddCard}
        updateContent={updateContent}
        plusOne={plusOne}
      />
    </Section>
  )
}

const CardShape = {
  _id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
}
CardsSection.propTypes = {
  actionItemsArray: PropTypes.arrayOf(PropTypes.shape(CardShape).isRequired),
  handleAddCard: PropTypes.func.isRequired,
  needsImprovedArray: PropTypes.arrayOf(PropTypes.shape(CardShape).isRequired),
  plusOne: PropTypes.func.isRequired,
  updateContent: PropTypes.func.isRequired,
  wentWellArray: PropTypes.arrayOf(PropTypes.shape(CardShape).isRequired),
}

export default CardsSection