import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContainerWrapper = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 1400px;
  margin: auto;
  padding: 0 60px;
  box-sizing: border-box;
  @media (max-width: ${props => props.theme.sizes.tablet}) {
    padding: 0 40px;
  }
  @media (max-width: ${props => props.theme.sizes.mobile}) {
    padding: 0 20px;
  }
`;

const Container = ({ props, children }) => (
  <ContainerWrapper>{children}</ContainerWrapper>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
