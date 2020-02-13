import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Container from './Container';
import Button from './Button';

const HeroWrapper = styled.div`
  margin-top: -80px;
  position: relative !important;
  height: 700px;
  background: ${props => props.theme.colors.red};
  @media screen and (max-width: ${props => props.theme.sizes.tablet}) {
    height: unset;
    padding-top: 100px;
  }
  section {
    align-items: center;
    position: relative;
    z-index: 100;
    .content {
      position: relative;
      z-index: 100;
      width: 60%;
      margin-left: 2rem;
      @media screen and (max-width: ${props => props.theme.sizes.tablet}) {
        width: 100%;
        margin-left: 0;
        button {
          width: 100%;
        }
      }
      h1,
      h2,
      p {
        margin: 0;
      }
      h1,
      p {
        line-height: 2.2rem;
        font-weight: 700;
      }
      h2 {
        font-size: 6rem;
        line-height: 6rem;
        margin-bottom: 1rem;
        margin-top: 0.5rem;
      }
      h1,
      p {
        font-size: 1.6rem;
        font-family: ${props => props.theme.fonts.robo} !important;
        text-transform: none !important;
        font-weight: 400 !important;
      }
      button {
        margin-top: 2rem;
      }
    }
  }
`;
const HeroImg = styled(Img)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  height: 700px;
  @media screen and (max-width: ${props => props.theme.sizes.tablet}) {
    display: none;
  }

  & > img {
    object-fit: 'cover' !important;
    object-position: '50% 50%' !important;
  }
`;

const MobileHeroImg = styled(Img)`
  margin-top: 3rem;
  @media screen and (min-width: ${props => props.theme.sizes.tablet}) {
    display: none;
  }
`;

const Hero = props => (
  <HeroWrapper>
    <Container>
      <div className="content">
        <p>Hi, my name is</p>
        <h2>Chase Ohlson</h2>
        <h1>{props.title}</h1>
        <Button type="link" link="/contact" text="Get In Touch" />
        <MobileHeroImg backgroundColor={'#EF412D'} fluid={props.mobile} />
      </div>
      <HeroImg backgroundColor={'#EF412D'} fluid={props.desktop} />
    </Container>
  </HeroWrapper>
);

Hero.propTypes = {
  desktop: PropTypes.object.isRequired,
  mobile: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default Hero;
