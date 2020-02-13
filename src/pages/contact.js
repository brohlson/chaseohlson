import React, { Fragment } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

import Container from '../components/Container';
import ContactForm from '../components/ContactForm';
import PageSEO from '../components/PageSEO';

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
const contactQuery = graphql`
  {
    page: datoCmsContactPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      hubspotForm
      hubspotPortal
    }
  }
`;

const Contact = () => {
  const { page } = useStaticQuery(contactQuery);
  return (
    <Fragment>
      <PageSEO meta={page.seoMetaTags} />
      <ContactWrapper>
        <Container>
          <h2>{page.title}</h2>
          <ContactForm
            hubspotForm={page.hubspotForm}
            hubspotPortal={page.hubspotPortal}
          />
        </Container>
      </ContactWrapper>
    </Fragment>
  );
};

export default Contact;
