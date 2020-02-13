import React, { useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { useScrollYPosition } from 'react-use-scroll-position';
import { AnchorLink } from 'gatsby-plugin-anchor-links';

import Container from './Container';

const HeaderWrapper = styled.nav`
  background: transparent;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  section {
    height: 80px;
    align-items: center;
    justify-content: space-between;
    transition: height 0.3s ease;
    .nav-m {
      &.open {
        button {
          div {
            background: ${props => props.theme.gradients.red};
            &.second {
              opacity: 0;
            }
            &.first {
              transform: rotate(45deg);
              top: 1.1rem;
            }
            &.third {
              transform: rotate(-45deg);
              bottom: 1.1rem;
            }
          }
        }
      }
      button {
        height: 2.5rem;
        width: 3.5rem;
        position: relative;
        background: transparent;
        padding: 0;
        border: none;
        div {
          transition: all 0.2s;
          height: 3px;
          width: 100%;
          background: ${props => props.theme.colors.black};
          position: absolute;

          &.first {
            top: 0;
            left: 0;
          }
          &.second {
            top: calc(50% - 1.5px);
            left: 0;
          }
          &.third {
            bottom: 0;
            left: 0;
          }
        }
      }
    }
    .nav-d {
      display: none;
      a {
        color: ${props => props.theme.colors.black};
        font-size: 1.4rem;
        line-height: 2.8rem;
        text-transform: uppercase;
        margin-left: 1.5rem;
        font-size: 1.4rem;
        position: relative;
        text-decoration: none;
        transition: all 0.3s ease;
        padding: 0.2rem 0.4rem;
        z-index: 10;
        &:hover {
          color: white;
          &::before {
            height: 100%;
            width: 100%;
            opacity: 1;
          }
        }
        &:before {
          z-index: -1;
          content: '';
          position: absolute;
          height: 0%;
          width: 100%;
          bottom: -1px;
          left: 0;
          opacity: 1;
          transition: all 0.3s ease;
          background: ${props => props.theme.gradients.red};
        }
      }
      .divider {
        position: relative;
        margin-right: 2rem;
        &::after {
          content: '';
          height: 3rem;
          width: 0.1rem;
          background: black;
          position: absolute;
          top: -0.3rem;
          right: -2rem;
        }
      }
    }
    .nav-mm {
      font-size: 1.4rem;
      line-height: 2.8rem;
      text-transform: uppercase;
      transform: translateX(${props => (props.open ? '0%' : '100%')});
      transition: transform 0.3s ease;
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 80px;
      left: 0;
      width: 100%;
      background: white;
      height: calc(100vh - 80px);
      padding: 2rem;
      @media (min-width: ${props => props.theme.sizes.mobile}) {
        padding: 4rem;
      }
      a {
        color: ${props => props.theme.colors.black};
        margin-bottom: 3rem;
        &.divider {
          margin-bottom: 6rem;
          position: relative;
          &:after {
            content: '';
            position: absolute;
            bottom: -3rem;
            left: 0;
            width: 100%;
            height: 0.2rem;
            background: ${props => props.theme.gradients.red};
          }
        }
      }
    }
    @media (min-width: ${props => props.theme.sizes.tablet}) {
      .nav-m {
        display: none;
      }
      .nav-d {
        display: flex;
      }
      .nav-mm {
        display: none;
      }
    }
  }
`;

const HeaderMenuMask = styled.div`
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => (props.triggered ? '100%' : '0%')};
  transition: 0.3s all;
  z-index: -1;
  height: 100%;
`;

const HeaderScrolledMask = styled.div`
  background: white;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  transition: width 0.3s ease;
  z-index: -1;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  width: ${props => (props.triggered ? '100%' : '0%')};
`;

const LogoImg = styled(Img)`
  width: 6rem;
`;

export default function Header({ location }) {
  const [open, setOpen] = useState(false);

  const scrollY = typeof window !== 'undefined' ? useScrollYPosition() : 0,
    scrolled = scrollY !== 0;

  useEffect(() => {
    setOpen(false);
  }, [location, scrollY]);

  function renderLinks() {
    return (
      <Fragment>
        <AnchorLink to="/#about">About</AnchorLink>
        <AnchorLink to="/#experience">Experience</AnchorLink>
        <AnchorLink to="/#work">Work</AnchorLink>
        <AnchorLink to="/#clients">Clients</AnchorLink>
        <AnchorLink to="/#testimonials">Testimonials</AnchorLink>
        <Link className="divider" to={'/contact'}>
          Contact
        </Link>
        <Link to={'/blog'}>Blog</Link>
      </Fragment>
    );
  }

  return (
    <HeaderWrapper triggered={scrolled} open={open}>
      <HeaderMenuMask triggered={open} />
      <HeaderScrolledMask triggered={scrolled} />
      <Container>
        <div className="logo">
          <StaticQuery
            query={graphql`
              query {
                file(relativePath: { eq: "logo-grey.png" }) {
                  childImageSharp {
                    fluid(maxWidth: 80) {
                      ...GatsbyImageSharpFluid_noBase64
                    }
                  }
                }
              }
            `}
            render={data => (
              <Link to="/">
                <LogoImg fluid={data.file.childImageSharp.fluid} />
              </Link>
            )}
          />
        </div>
        <div className="nav-d">{renderLinks()}</div>
        <div className={`nav-m${open ? ' open' : ''}`}>
          <button
            aria-label="Toggle Menu"
            onClick={() => setOpen(!open)}
            className="icon"
          >
            <div className="first" />
            <div className="second" />
            <div className="third" />
          </button>
        </div>
        <div className="nav-mm">{renderLinks()}</div>
      </Container>
    </HeaderWrapper>
  );
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
};
