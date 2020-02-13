import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

const LinkButtonWrapper = styled(Link)`
  opacity: ${props => (props.disabled ? '.3' : '1')};
  pointer-events: ${props => (props.disabled ? 'none' : 'all')};
  button {
    pointer-events: ${props => (props.disabled ? 'none' : 'all')};
    background: transparent;
    border: 0.1rem solid ${props => props.theme.colors.black};
    height: 6rem;
    width: 210px;
    max-width: 100%;
    span {
      color: ${props => props.theme.colors.black};
    }
  }
`;

const ActionButtonWrapper = styled.div`
  opacity: ${props => (props.disabled ? '.3' : '1')};
  pointer-events: ${props => (props.disabled ? 'none' : 'all')};
  button {
    pointer-events: ${props => (props.disabled ? 'none' : 'all')};
    background: transparent;
    border: 0.1rem solid ${props => props.theme.colors.black};
    height: 6rem;
    width: 210px;
    max-width: 100%;
  }
`;
export default function Button({ link, action, disabled, text, type }) {
  const renderLinkButton = () => {
    return (
      <LinkButtonWrapper disabled={disabled} to={link}>
        <button>
          <span>{text.toUpperCase()}</span>
        </button>
      </LinkButtonWrapper>
    );
  };
  const renderActionButton = () => {
    return (
      <ActionButtonWrapper disabled={disabled}>
        <button onClick={action}>
          <span>{text.toUpperCase()}</span>
        </button>
      </ActionButtonWrapper>
    );
  };
  return type === 'link' ? renderLinkButton() : renderActionButton();
}

Button.propTypes = {
  link: PropTypes.string,
  action: PropTypes.func,
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['action', 'link']).isRequired,
};
