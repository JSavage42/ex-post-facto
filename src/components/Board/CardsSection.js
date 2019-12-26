import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CardContainer from './CardContainer'

const Section = styled.section`
  display: flex;
  overflow: scroll;
  height: 100%;

  section {
    border-right: 4px solid black;
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
      text-decoration: underline;
    }

    button {
      border: 2px solid blue;
      border-radius: 50%;
      color: #2f2f2f;
      display: block;
      font-size: 2rem;
      height: 5rem;
      line-height: 3rem;
      margin-top: 0.5rem;
      width: 5rem;

      &:active {
        background: darkblue;
        color: white
      }
    }
  }

  .card-container {
    align-content: flex-start;
    color: #440440;
    display: flex;
    justify-content: space-around;
    flex: 0 0 10rem;
    flex-flow: wrap;
    overflow: scroll;

    article {
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
      background: green;
      border-radius: 50%;
      color: white;
      padding: 0.5rem;

      &:active {
        background: black;
        color: white
      }
    }
  }

  .went-well .card-container article {
    border: 3px solid green;
  }
  .needs-improve .card-container article {
    border: 3px solid orange;
  }
  .action-items .card-container article {
    border: 3px solid blue;
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
