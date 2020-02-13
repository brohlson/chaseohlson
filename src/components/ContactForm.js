/* eslint-disable quotes */
/* eslint-disable no-console */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';
import endpoints from '../util/endpoints';
import ReCAPTCHA from 'react-google-recaptcha';
import LoadingIcon from '../images/loading.svg';

const Confirm = styled(ReCAPTCHA)`
  margin-bottom: 2rem;
`;

const Loading = styled.div`
  min-height: 78px;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  opacity: ${props => (props.loading === 'true' ? `.5` : `1`)};
  transition: opacity 0.3s ease;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-top: 3rem;
  max-width: 100%;

  @media screen and (max-width: 600px) {
    select,
    textarea,
    input {
      font-size: 16px !important;
    }
  }

  input,
  textarea {
    font-family: 'Roboto Mono';
    background: white;
    font-size: inherit;
    border: none;
    outline: none;
    padding: 1em;
    &::-webkit-input-placeholder {
      color: ${props => props.theme.colors.black};
      text-transform: uppercase;
    }
    &::-moz-placeholder {
      color: ${props => props.theme.colors.black};
      text-transform: uppercase;
    }
    &:-ms-input-placeholder {
      color: ${props => props.theme.colors.black};
      text-transform: uppercase;
    }
    &:-moz-placeholder {
      color: ${props => props.theme.colors.black};
      text-transform: uppercase;
    }
    &:required {
      box-shadow: none;
    }
    &:focus {
      outline: none;
    }
  }
  &::before {
    content: '';
    background: black;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    transition: 0.2s all;
    opacity: ${props => (props.overlay ? '.8' : '0')};
    visibility: ${props => (props.overlay ? 'visible' : 'hidden')};
  }
`;

const Input = styled.input.attrs(() => ({
  'data-hj-whitelist': '',
}))`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  border-radius: 0;
`;

const InputWrapper = styled.div`
  padding: 0.2rem;
  border: 0.1rem solid ${props => props.theme.colors.black};
  margin-bottom: 2rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${InputWrapper} {
    width: 49%;
  }
`;

const Message = styled.textarea.attrs(() => ({
  'data-hj-whitelist': '',
}))`
  width: 100%;
  line-height: 1.6;
  resize: vertical;
  min-height: 150px;
`;

const SubmitButton = styled.button`
  border: 0.1rem solid ${props => props.theme.colors.black} !important;
  color: ${props => props.theme.colors.black};
  font-family: 'Roboto Mono';
  text-transform: uppercase;
  background: white;
  height: 6rem;
  width: 210px;
  max-width: 100%;
  border-radius: 0;
  opacity: ${props => (props.buttonDisabled ? 0.5 : 1)} !important;
  pointer-events: ${props =>
    props.buttonDisabled ? 'none' : 'all'} !important;
`;

const Modal = styled.div`
  background: white;
  padding: 2em;
  position: fixed;
  min-width: 75%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  z-index: 9999999;
  display: flex;
  flex-flow: column;
  text-align: center;
  align-items: flex-start;
  transition: all 0.3s ease;
  opacity: ${props => (props.visible === 'true' ? '1' : '0')};
  visibility: ${props => (props.visible === 'true' ? 'visible' : 'hidden')};
  @media screen and (min-width: ${props => props.theme.sizes.mobile}) {
    min-width: inherit;
    max-width: 400px;
  }
`;

export default class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
      showModal: false,
      valid: false,
      error: false,
      loading: false,
    };
  }

  static propTypes = {
    hubspotForm: PropTypes.string.isRequired,
    hubspotPortal: PropTypes.string.isRequired,
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleError = () => {
    this.setState({
      showModal: true,
      valid: false,
      loading: false,
      error: true,
    });
  };

  handleSubmit = e => {
    if (e) e.preventDefault();
    const {
      firstname,
      lastname,
      email,
      phone,
      subject,
      message,
      valid,
      loading,
    } = this.state;
    if (!valid || loading) return null;

    this.setState({ loading: true });
    const data = { firstname, lastname, email, phone, subject, message };
    fetch(endpoints.contact, {
      method: 'post',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, application/xml, text/plain, text/html, *.*',
      }),
    })
      .then(() => this.submitHubspotData(data))
      .catch(() => this.handleError());
  };

  submitHubspotData = data => {
    const isBrowser = typeof window !== 'undefined';
    const hutk = isBrowser ? Cookies.get('hubspotutk') : null;
    const pageUri = isBrowser ? window.location.href : null;
    const pageName = isBrowser ? document.title : null;
    const postUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${this.props.hubspotPortal}/${this.props.hubspotForm}`;

    const body = {
      submittedAt: Date.now(),
      fields: [
        {
          name: 'firstname',
          value: data.firstname,
        },
        {
          name: 'lastname',
          value: data.lastname,
        },
        {
          name: 'email',
          value: data.email,
        },
        {
          name: 'message',
          value: data.message,
        },
        {
          name: 'subject',
          value: data.subject,
        },
      ],
      context: {
        hutk,
        pageUri,
        pageName,
      },
    };

    if (data.phone) {
      body.fields.push({
        name: 'phone',
        value: data.phone,
      });
    }

    fetch(postUrl, {
      method: 'post',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, application/xml, text/plain, text/html, *.*',
      }),
    })
      .then(res => res.json())
      .then(() => {
        this.setState({
          firstname: '',
          lastname: '',
          phone: '',
          email: '',
          subject: '',
          message: '',
          showModal: true,
          valid: false,
          loading: false,
          error: false,
        });
      })
      .catch(err => {
        console.warn(err);
        this.handleError();
      });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  onConfirm = () => {
    this.setState({ valid: true });
  };

  render() {
    let {
      firstname,
      lastname,
      email,
      phone,
      subject,
      message,
      loading,
      error,
      valid,
    } = this.state;
    return (
      <Form
        data-form-id={this.props.hubspotForm}
        data-portal-id={this.props.hubspotPortal}
        name="Contact Chase Ohlson"
        onSubmit={this.handleSubmit}
        overlay={this.state.showModal}
        onClick={this.closeModal}
        loading={this.state.loading.toString()}
      >
        <InputGroup>
          <InputWrapper>
            <Input
              name="firstname"
              type="text"
              placeholder="First Name *"
              value={firstname}
              onChange={this.handleInputChange}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              name="lastname"
              type="text"
              placeholder="Last Name *"
              value={lastname}
              onChange={this.handleInputChange}
              required
            />
          </InputWrapper>
        </InputGroup>
        <InputGroup>
          <InputWrapper>
            <Input
              name="email"
              type="email"
              placeholder="Email *"
              value={email}
              onChange={this.handleInputChange}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              name="phone"
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={this.handleInputChange}
            />
          </InputWrapper>
        </InputGroup>

        <InputWrapper>
          <Input
            name="subject"
            type="subject"
            placeholder="Subject *"
            value={subject}
            onChange={this.handleInputChange}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Message
            name="message"
            type="text"
            placeholder="Message *"
            value={message}
            onChange={this.handleInputChange}
            required
          />
        </InputWrapper>
        {!loading && (
          <Confirm
            sitekey="6Lft9pEUAAAAAG8g30HbjfOZd38GhdWvMTLqlVc7"
            theme="dark"
            onChange={() => this.onConfirm()}
          />
        )}
        {loading && (
          <Loading>
            <img alt="loading" src={LoadingIcon} />
          </Loading>
        )}

        <SubmitButton buttonDisabled={!valid} name="submit" type="submit">
          Send It
        </SubmitButton>

        <Modal visible={this.state.showModal.toString()}>
          <p>
            {error
              ? `Oops! Something went wrong.  Ensure you're using a valid email address & try again. `
              : `Thank you for reaching out. I'll get back to you as soon as
            possible.`}
          </p>
        </Modal>
      </Form>
    );
  }
}
