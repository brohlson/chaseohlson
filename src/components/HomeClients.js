import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Container from './Container';
import Img from 'gatsby-image';

const ClientsWrapper = styled.div`
  background: white;
  margin-bottom: 10rem;
  section {
    flex-direction: column;
    .title,
    .logos {
      width: 900px;
      max-width: 100%;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      .logo {
        width: 25%;
        @media screen and (max-width: ${props => props.theme.sizes.mobile}) {
          width: 50%;
        }
      }
      h2 {
        color: ${props => props.theme.colors.red};
        margin-bottom: 2rem;
      }
    }
  }
`;

const LogoImg = styled(Img)`
  width: 100% !important;
  max-width: 100% !important;
`;

const HomeClients = ({ logos }) => (
  <ClientsWrapper id="clients">
    <Container>
      <div className="title">
        <h2>I&apos;ve Worked With</h2>
      </div>
      {logos && (
        <div className="logos">
          {logos.map((logo, idx) => (
            <div key={idx} className="logo">
              <LogoImg fluid={logo.fluid} />
            </div>
          ))}
        </div>
      )}
    </Container>
  </ClientsWrapper>
);

HomeClients.propTypes = {
  logos: PropTypes.array,
};

export default HomeClients;
