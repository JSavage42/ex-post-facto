import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Card from './Card'

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
  }

  .card-container article {
    font-size: 1.25rem;
    height: 10rem;
    margin: 0.25rem;
    width: 15rem;
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
  wentWellArray,
  needsImproveArray,
  actionItemsArray,
}) => {
  const isWentWell = wentWellArray && wentWellArray.length > 0;
  const isNeedsImprove = needsImproveArray && needsImproveArray.length > 0;
  const isActionItems = actionItemsArray && actionItemsArray.length > 0;
  return (
    <Section>
      <section className="went-well">
        <header>
          <h2>Went Well</h2>
          <button>+</button>
        </header>
        <article className="card-container">
          {isWentWell && wentWellArray.map(card => (
            <Card content={card} />
          ))}
        </article>
      </section>
      <section className="needs-improve">
        <header>
          <h2>Needs Improvement</h2>
          <button>+</button>
        </header>
        <article className="card-container">
          {isNeedsImprove && needsImproveArray.map(card => (
            <Card content={card} />
          ))}
        </article>
      </section>
      <section className="action-items">
        <header>
          <h2>Action Items</h2>
          <button>+</button>
        </header>
        <article className="card-container">
          {isActionItems && actionItemsArray.map(card => (
            <Card content={card} />
          ))}
        </article>
      </section>
    </Section>
  )
}

CardsSection.propTypes = {
  children: PropTypes.node,
  wentWellArray: PropTypes.arrayOf(PropTypes.node).isRequired,
  needsImproveArray: PropTypes.arrayOf(PropTypes.node).isRequired,
  actionItemsArray: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export default CardsSection
