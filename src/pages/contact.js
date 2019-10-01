import React, { Fragment } from 'react';
import styled from 'styled-components';
import useClipboard from 'react-use-clipboard';

import SEO from '../components/SEO';
import Container from '../components/UI/Container';
import ContactForm from '../components/Common/ContactForm';

const ContactWrapper = styled.div`
  background: white;
  margin: 6rem 0;
  section {
    width: 1020px;
    max-width: 100%;
    margin: auto;
    flex-direction: column;
  }
`;

const CopyText = styled.div`
  font-size: 1.2rem;
  text-transform: uppercase;
  margin-top: 2rem;
  cursor: pointer;
`;

const Contact = () => {
  const [isCopied, setCopied] = useClipboard('chase@chaseohlson.com', {
    successDuration: 1000,
  });
  return (
    <Fragment>
      <SEO
        title={'Contact | Chase Ohlson'}
        description={
          'Looking for a new website or ongoing support on your React app? Contact Chase Ohlson here.'
        }
        url={'https://chaseohlson.com/contact'}
      />
      <ContactWrapper>
        <Container>
          <h2>Let&apos;s build a thing</h2>
          <ContactForm />
          <CopyText onClick={() => setCopied(true)}>
            {isCopied ? 'Copied!' : 'Or click to copy email address'}
          </CopyText>
        </Container>
      </ContactWrapper>
    </Fragment>
  );
};

export default Contact;
