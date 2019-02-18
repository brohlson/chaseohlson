import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'

const LinkButtonWrapper = styled(Link)`
  opacity: ${props => (props.disabled ? `.3` : `1`)};
  pointer-events: ${props => (props.disabled ? `none` : `all`)};
  button {
    pointer-events: ${props => (props.disabled ? `none` : `all`)};
    background: transparent;
    border: 0.1rem solid ${props => props.theme.colors.black};
    height: 6rem;
    width: 210px;
    max-width: 100%;
    span {
      color: ${props => props.theme.colors.black};
    }
  }
`

const ActionButtonWrapper = styled.div`
  opacity: ${props => (props.disabled ? `.3` : `1`)};
  pointer-events: ${props => (props.disabled ? `none` : `all`)};
  button {
    pointer-events: ${props => (props.disabled ? `none` : `all`)};
    background: transparent;
    border: 0.1rem solid ${props => props.theme.colors.black};
    height: 6rem;
    width: 210px;
    max-width: 100%;
  }
`
export default class Button extends React.Component {
  renderLinkButton = () => {
    return (
      <LinkButtonWrapper disabled={this.props.disabled} to={this.props.link}>
        <button>
          <span>{this.props.text.toUpperCase()}</span>
        </button>
      </LinkButtonWrapper>
    )
  }
  renderActionButton = () => {
    return (
      <ActionButtonWrapper disabled={this.props.disabled}>
        <button onClick={this.props.action}>
          <span>{this.props.text.toUpperCase()}</span>
        </button>
      </ActionButtonWrapper>
    )
  }
  render() {
    let { type } = this.props
    return type === 'link' ? this.renderLinkButton() : this.renderActionButton()
  }
}

Button.propTypes = {
  link: PropTypes.string,
  action: PropTypes.func,
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['action', 'link']).isRequired,
}
