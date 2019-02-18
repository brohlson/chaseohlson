import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Container from '../UI/Container'
import Animations from '../../styles/Animations'

const TestWrapper = styled.div`
  background: white;
  margin-bottom: 10rem;
  section {
    flex-direction: column;
    .title,
    .module {
      width: 900px;
      max-width: 100%;
      margin: auto;
      h2 {
        color: ${props => props.theme.colors.red};
        margin-bottom: 2rem;
      }
    }
    .module {
      background: ${props => props.theme.gradients.red};
      padding: 0.2rem;
      min-height: 500px;
      .inner {
        background: white;
        min-height: 500px;
        display: flex;
        padding: 2rem;
        position: relative;
        flex-direction: column;
        justify-content: center;
        .nav {
          position: absolute;
          top: 2rem;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          z-index: 10;
        }
      }
    }
  }
`

const CopyWrapper = styled.div`
  animation: ${Animations.fadeInUp} 0.2s;
  display: ${props => (props.active ? `flex` : `none`)};
  flex-direction: column;
  padding: 0 3rem;
  position: relative;
  @media screen and (max-width: ${props => props.theme.sizes.mobile}) {
    padding: 0 1rem;
  }
  .top {
    padding: 4rem 0;
    p {
      font-family: ${props => props.theme.fonts.exo};
      font-size: 2.4rem;
      font-weight: bold;
      line-height: 3.5rem;
    }
  }
  .bottom {
    animation: ${Animations.fadeInUp} 0.4s;
    position: relative;
    text-align: right;
    p:first-child {
      font-weight: bold;
      margin: 0;
    }
  }
`

const Dot = styled.button.attrs({
  'aria-label': `Testimonial Page Button`,
})`
  height: 1rem;
  width: 1rem;
  border: none;
  border-radius: 50rem;
  padding: 0;
  background: ${props => props.theme.gradients.red};
  position: relative;
  margin-right: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:last-child {
    margin-right: 0;
  }
  &:focus {
    outline: none;
  }
  div {
    transition: all 0.1s;
    height: ${props => (props.active ? `0rem` : `.6rem`)};
    width: ${props => (props.active ? `0rem` : `.6rem`)};
    background: white;
    border-radius: 50rem;
  }
`

const Copy = ({ person, company, quote, active }) => (
  <CopyWrapper active={active}>
    <div
      className="top"
      dangerouslySetInnerHTML={{ __html: quote.childMarkdownRemark.html }}
    />
    <div className="bottom">
      <p>{person}</p>
      <p>{company}</p>
    </div>
  </CopyWrapper>
)
export default class Testimonials extends Component {
  constructor(props) {
    super(props)
    this.state = { index: 0 }
  }

  static propTypes = {
    testimonials: PropTypes.array.isRequired,
  }

  handleDotClick = idx => {
    this.setState({ index: idx })
  }

  render() {
    let { testimonials } = this.props
    let { index } = this.state
    return (
      <TestWrapper id="testimonials">
        <Container>
          <div className="title">
            <h2>Things People Say</h2>
          </div>
          <div className="module">
            <div className="inner">
              <div className="nav">
                {testimonials &&
                  Array.from(testimonials).map((noop, idx) => (
                    <Dot
                      onClick={() => this.handleDotClick(idx)}
                      active={index === idx}
                      key={idx}
                      num={idx}
                    >
                      <div />
                    </Dot>
                  ))}
              </div>
              {testimonials &&
                testimonials.map((item, idx) => (
                  <Copy
                    key={idx}
                    active={index === idx}
                    person={item.person}
                    company={item.company}
                    quote={item.quote}
                  />
                ))}
            </div>
          </div>
        </Container>
      </TestWrapper>
    )
  }
}
