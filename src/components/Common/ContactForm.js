import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import endpoints from '../../util/endpoints';
import ReCAPTCHA from 'react-google-recaptcha';
import LoadingIcon from '../../images/loading.svg';

const Confirm = styled(ReCAPTCHA)`
  margin-bottom: 2rem;
`;

const Loading = styled.div`
  min-height: 78px;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  opacity: ${props => (props.loading ? `.55` : `1`)};
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

const Message = styled.textarea.attrs(() => ({
  'data-hj-whitelist': '',
}))`
  width: 100%;
  line-height: 1.6;
  resize: vertical;
  min-height: 150px;
`;

const Submit = styled.input`
  cursor: ${props => (props.disabled ? `not-allowed` : `pointer`)};
  border: 0.1rem solid ${props => props.theme.colors.black} !important;
  color: ${props => props.theme.colors.black};
  font-family: 'Roboto Mono';
  text-transform: uppercase;
  height: 6rem;
  width: 210px;
  max-width: 100%;
  border-radius: 0;
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
  opacity: ${props => (props.visible ? '1' : '0')};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  @media screen and (min-width: ${props => props.theme.sizes.mobile}) {
    min-width: inherit;
    max-width: 400px;
  }
`;

export default class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      subject: '',
      message: '',
      showModal: false,
      valid: false,
      error: false,
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    this.setState({ loading: true });
    let { name, email, subject, message } = this.state;
    let data = { name, email, subject, message };
    axios.post(endpoints.contact, JSON.stringify(data)).then(response => {
      if (response.status !== 200) {
        this.handleError();
      } else {
        this.handleSuccess();
      }
    });
    e.preventDefault();
  };

  handleSuccess = () => {
    this.setState({
      name: '',
      email: '',
      message: '',
      subject: '',
      showModal: true,
      valid: false,
      loading: false,
      error: false,
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

  closeModal = () => {
    this.setState({ showModal: false });
  };

  onConfirm = () => {
    this.setState({ valid: true });
  };

  render() {
    let { name, email, subject, message, loading, error } = this.state;
    return (
      <Form
        name="Contact Chase Ohlson"
        onSubmit={this.handleSubmit}
        overlay={this.state.showModal}
        onClick={this.closeModal}
        loading={this.state.loading}
      >
        <InputWrapper>
          <Input
            name="name"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={this.handleInputChange}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={this.handleInputChange}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            name="subject"
            type="subject"
            placeholder="Subject"
            value={subject}
            onChange={this.handleInputChange}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Message
            name="message"
            type="text"
            placeholder="Message"
            value={message}
            onChange={this.handleInputChange}
            required
          />
        </InputWrapper>
        {!loading && (
          <Confirm
            sitekey="6Lft9pEUAAAAAG8g30HbjfOZd38GhdWvMTLqlVc7"
            theme="dark"
            onChange={this.onConfirm}
          />
        )}
        {loading && (
          <Loading>
            <img alt="loading" src={LoadingIcon} />
          </Loading>
        )}

        <Submit
          disabled={!this.state.valid}
          name="submit"
          type="submit"
          value="Send It"
        />

        <Modal visible={this.state.showModal}>
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
