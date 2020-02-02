import React from 'react';
import PropTypes from 'prop-types';
import GlobalStyle from '../styles/Global';
import Theme from '../styles/Theme';
import styled, { ThemeProvider } from 'styled-components';
import Header from './UI/Header';
import Footer from './UI/Footer';

const SiteRoot = styled.div`
  background: white;
  padding-top: 80px;
`;

const Layout = ({ children, location }) => (
  <SiteRoot>
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
