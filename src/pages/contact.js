import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
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
  <Layout>
    <SEO
      title={'Contact | Chase Ohlson'}
      description={
        'Looking for a new website or ongoing support on your React app? Contact Chase Ohlson here.'
      }
      url={'https://chaseohlson.com/contact'}
      preconnect={'https://www.gstatic.com'}
    />
    <ContactWrapper>
      <Container>
        <h2>Let's build a thing</h2>
        <ContactForm />
      </Container>
    </ContactWrapper>
  </Layout>
)

export default Contact
