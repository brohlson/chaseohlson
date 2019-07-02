import React, { Fragment } from 'react'
import styled from 'styled-components'
import SEO from '../components/SEO'
import Container from '../components/UI/Container'
import ContactForm from '../components/Common/ContactForm'

const ContactWrapper = styled.div`
  background: white;
  margin: 6rem 0;
  section {
    width: 1020px;
    max-width: 100%;
    margin: auto;
    flex-direction: column;
  }
`

const Contact = () => (
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
        <h2>Let's build a thing</h2>
        <ContactForm />
      </Container>
    </ContactWrapper>
  </Fragment>
)

export default Contact
