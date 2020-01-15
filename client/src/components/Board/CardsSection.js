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
      font-size: 1.75rem;
      font: var(--small-header-font)
    }

    button {
      background: var(--red-hex);
      border: none;
      color: var(--white-hex);
      display: block;
      font-size: 1rem;
      margin: 0.5rem 0;
      padding: 0.5rem;

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
    flex: 0 0 5rem;
    flex-flow: wrap;
    overflow: scroll;

    article {
      background-color: var(--green-hex);
      border-radius: 5%;
      box-shadow: 0.25rem 0.25rem 0.25rem 0.125rem rgba(0,0,0,0.3);
      color: #2f2f2f;
      font-size: 1.5rem;
      height: 20rem;
      margin: 0.5rem 0;
      width: 15rem;
      padding: 1rem;
    }

    button {
      background: none;
      border-radius: 0.5rem;
      color: var(--white-hex);
      font-size: 1.5rem;

      &:active, &:hover {
        background: var(--green-hex);
        color: var(--white-hex)
      }
    }
  }

  .went-well .card-container article,
  .needs-improved .card-container article,
  .action-items .card-container article {
    border: 1px solid;
  }
  .went-well .card-container article,
  .went-well .card-container textarea {
    background: var(--green-hex);
  }
  .needs-improved .card-container article,
  .needs-improved .card-container textarea {
    background: var(--red-hex);
  }
  .action-items .card-container article,
  .action-items .card-container textarea {
    background: var(--black-hex);
  }
`

const CardsSection = ({
  wentWellArray,
  needsImprovedArray,
  actionItemsArray,
  handleAddCard,
  bid,
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
        bid={bid}
        updateContent={updateContent}
        plusOne={plusOne}
      />
      <CardContainer
        title="Needs Improvement"
        cardArray={needsImprovedArray}
        type={CardContainer.Variants.NEEDS_IMPROVE}
        handleAddCard={handleAddCard}
        bid={bid}
        updateContent={updateContent}
        plusOne={plusOne}
      />
      <CardContainer
        title="Action Items"
        cardArray={actionItemsArray}
        type={CardContainer.Variants.ACTION_ITEMS}
        handleAddCard={handleAddCard}
        bid={bid}
        updateContent={updateContent}
        plusOne={plusOne}
      />
    </Section>
  )
}

CardsSection.propTypes = {
  wentWellArray: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired),
  needsImproveArray: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired),
  actionItemsArray: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired),
  handleAddCard: PropTypes.func.isRequired,
}

export default CardsSection
