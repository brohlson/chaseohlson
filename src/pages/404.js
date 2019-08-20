import React, { Fragment } from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

const Wrap = styled.div`
  background: ${props => props.theme.gradients.red};
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: calc(100vh - 454px);
  min-height: 300;
`;

const NotFoundPage = () => (
  <Fragment>
    <SEO title="404 | Page Not Found | Chase Ohlson" />
    <Wrap>
      <h1>404</h1>
      <p>Page Not Found</p>
    </Wrap>
  </Fragment>
);

export default NotFoundPage;
