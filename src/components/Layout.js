/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/Global';
import Theme from '../styles/Theme';

import Header from './Header';
import Footer from './Footer';

const SiteRoot = styled.div`
  background: white;
  padding-top: 80px;
`;

const Layout = ({ children, location }) => (
  <SiteRoot>
    <Helmet>
      <link rel="preconnect" href="https://datocms-assets.com" />
    </Helmet>
    <GlobalStyle />
    <ThemeProvider theme={Theme}>
      <>
        <Header location={location} />
        {children}
        <Footer />
      </>
    </ThemeProvider>
  </SiteRoot>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
