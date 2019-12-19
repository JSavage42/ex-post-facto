import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CardContainer from './CardContainer'

const Section = styled.section`
  display: flex;
  padding-top: 2rem;
  height: 100%;
  justify-content: space-around;

  section header {
    display: flex;
    justify-content: center;
    text-align: center;

    h2 {
      text-decoration: underline;
    }

    button {
      background: none;
      color: white;
      border: none;
      font-size: 1.5rem;
      margin-left: 0.5rem;

      &:active {
        background: white;
        color: black;
      }
    }
  }

  .card-container {
    display: flex;
    justify-content: space-around;
    flex-flow: wrap;
    font-size: 1.25rem;
    flex: 0 0 10rem;
    overflow: scroll;

    article {
      font-size: 1.25rem;
      height: 10rem;
      margin: 0.25rem;
      width: 15rem;
    }

  }


  .went-well .card-container article {
    background: green;
  }
  .needs-improve .card-container article {
    background: orange;
    color: black;
  }
  .action-items .card-container article {
    background: blue;
    color: white;
  }
`

const CardsSection = ({
  wentWellObj,
  needsImproveObj,
  actionItemsObj,
}) => {
  return (
    <Section>
      <CardContainer
        title="Went Well"
        cardObj={wentWellObj}
        type={CardContainer.Variants.WENT_WELL}
      />
      <CardContainer
        title="Needs Improvement"
        cardObj={needsImproveObj}
        type={CardContainer.Variants.NEEDS_IMPROVE}
      />
      <CardContainer
        title="Action Items"
        cardObj={actionItemsObj}
        type={CardContainer.Variants.ACTION_ITEMS}
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
}

export default CardsSection
