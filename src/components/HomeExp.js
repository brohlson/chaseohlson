import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Container from './Container';
import Animations from '../styles/Animations';

const ExpWrapper = styled.div`
  margin-bottom: 10rem;
  section {
    flex-direction: column;
    width: 1020px;
    max-width: 100%;
    h2 {
      color: ${props => props.theme.colors.red};
      margin-bottom: 2rem;
    }
    .module {
      display: flex;
      min-height: 31.5rem;
      .left {
        position: relative;
        width: 22rem;
        padding-left: 0.2rem;
        flex-shrink: 0;
        &:before {
          transition: all 0.2s ease;
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0.2rem;
          height: 100%;
          background: ${props => props.theme.gradients.redVert};
          z-index: 100;
        }
      }
      .right {
        padding-left: 3.5rem;
      }
      @media screen and (max-width: ${props => props.theme.sizes.mobile}) {
        .right {
          display: none;
        }
        .left {
          width: 100%;
        }
      }
    }
  }
`;

const TitleBlockWrapper = styled.div`
  background: white;
  padding-left: 1.5rem;
  padding: 3rem 0 3rem 1.5rem;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  flex-wrap: wrap;

  &:after {
    transition: all 0.2s ease;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => (props.selected ? '100%' : '0%')};
    height: 0.2rem;
    background: ${props => props.theme.gradients.blackRed};
    z-index: 100;
  }
  span,
  .title {
    transition: all 0.2s ease;
    text-transform: uppercase;
    pointer-events: none;
    color: ${props =>
      props.selected ? props.theme.colors.red : props.theme.colors.black};
    font-weight: ${props => (props.selected ? '500' : 'normal')};
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;
const Arrow = styled.div`
  @media screen and (min-width: ${props => props.theme.sizes.mobile}) {
    display: none;
  }
  height: 15px;
  width: 15px;
  position: relative;
  &:before {
    transition: all 0.2s ease;
    content: '';
    position: absolute;
    bottom: 0;
    left: -5px;
    width: 0.15rem;
    height: 100%;
    background: ${props => props.theme.gradients.red};
    z-index: 100;
    transform: rotate(${props => (props.selected ? '45deg' : '-45deg')});
  }
  &:after {
    transition: all 0.2s ease;
    content: '';
    position: absolute;
    bottom: 0;
    left: 5px;
    width: 0.15rem;
    height: 100%;
    background: ${props => props.theme.gradients.redVert};
    z-index: 100;
    transform: rotate(${props => (props.selected ? '-45deg' : '45deg')});
  }
`;

const DetailBlockWrapper = styled.div`
  animation: ${Animations.fadeInUp} 0.2s;
  transition: opacity 0.2s ease;
  position: relative;
  display: ${props => (props.selected ? 'flex' : 'none')};
  flex-direction: column;
  .position {
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .timeframe {
    font-style: italic;
    margin-bottom: 1rem;
  }
  .details {
    ul {
      margin-top: 1rem;
      list-style: none;
      li {
        margin-bottom: 1rem;
        position: relative;
        &:last-child {
          margin-bottom: 0;
        }
        &:before {
          content: '';
          position: absolute;
          height: 8px;
          width: 2px;
          background: ${props => props.theme.gradients.red};
          top: 0.85rem;
          left: -1.5rem;
          z-index: 5;
        }
        &:after {
          content: '';
          position: absolute;
          height: 8px;
          width: 2px;
          background: ${props => props.theme.gradients.red};
          top: 0.85rem;
          left: -1.5rem;
          z-index: 5;
          transform: rotate(90deg);
        }
      }
    }
  }
`;

const TitleDetailBlockWrapper = styled.div`
  flex-direction: column;
  .wrap {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    max-height: ${props => (props.selected ? '800px' : '0')};
    span {
      color: ${props => props.theme.colors.black};
      text-transform: none;
    }
  }
  .position-sm {
    font-weight: bold;
    margin-bottom: 1rem;
    margin-top: 3rem;
  }
  .timeframe-sm {
    font-style: italic;
    margin-bottom: 1rem;
  }
  .details {
    margin-bottom: 3rem;
    ul {
      list-style: none;
      margin-top: 1rem;
      li {
        margin-bottom: 1rem;
        position: relative;
        &:last-child {
          margin-bottom: 0;
        }
        &:before {
          content: '';
          position: absolute;
          height: 8px;
          width: 2px;
          background: ${props => props.theme.gradients.red};
          top: 0.85rem;
          left: -1.5rem;
          z-index: 5;
        }
        &:after {
          content: '';
          position: absolute;
          height: 8px;
          width: 2px;
          background: ${props => props.theme.gradients.red};
          top: 0.85rem;
          left: -1.5rem;
          z-index: 5;
          transform: rotate(90deg);
        }
      }
    }
  }
  @media screen and (min-width: ${props => props.theme.sizes.mobile}) {
    display: none;
  }
`;

function HomeExp({ blocks }) {
  const [index, setIndex] = useState(0);

  const handleLeftClick = idx => {
    let val = index === parseInt(idx) ? null : parseInt(idx);
    setIndex(val);
  };

  const renderLeftBlocks = () => {
    return blocks.map((block, idx) => {
      let { company, detailsNode, position, timeframe } = block;
      return (
        <TitleBlockWrapper
          selected={index === idx}
          key={idx}
          onClick={() => handleLeftClick(idx)}
        >
          <div className="title">
            <span>{company}</span>
            <Arrow selected={index === idx} />
          </div>

          <TitleDetailBlockWrapper selected={index === idx}>
            <div className="wrap">
              <div className="position-sm">
                <span>{position}</span>
              </div>
              <div className="timeframe-sm">
                <span>{timeframe}</span>
              </div>
              <div
                className="details"
                dangerouslySetInnerHTML={{
                  __html: detailsNode.childMarkdownRemark.html,
                }}
              />
            </div>
          </TitleDetailBlockWrapper>
        </TitleBlockWrapper>
      );
    });
  };

  const renderDetailBlocks = () => {
    return blocks.map((block, idx) => {
      let { detailsNode, position, timeframe } = block;
      return (
        <DetailBlockWrapper selected={index === idx} key={idx}>
          <div className="position">
            <span>{position}</span>
          </div>
          <div className="timeframe">
            <span>{timeframe}</span>
          </div>
          <div
            className="details"
            dangerouslySetInnerHTML={{
              __html: detailsNode.childMarkdownRemark.html,
            }}
          />
        </DetailBlockWrapper>
      );
    });
  };

  return (
    <ExpWrapper id="experience">
      <Container>
        <div className="title">
          <h2>Experience</h2>
        </div>
        <div className="module">
          <div className="left">{renderLeftBlocks()}</div>
          <div className="right">{renderDetailBlocks()}</div>
        </div>
      </Container>
    </ExpWrapper>
  );
}

HomeExp.propTypes = {
  blocks: PropTypes.array.isRequired,
};

export default HomeExp;
