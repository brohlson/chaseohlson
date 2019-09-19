import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Content = styled.div`
  max-width: 100%;
  .gatsby-highlight {
    margin: 4rem 0;
    span.parameter {
      font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro,
        Courier New, monospace;
    }
  }
  p,
  pre {
    margin-bottom: 2rem;
  }
  ul {
    list-style: none;
    margin-bottom: 2rem;
    li {
      position: relative;
      margin-bottom: 0.8rem;
      &:before {
        content: '';
        position: absolute;
        height: 8px;
        width: 2px;
        background: ${props => props.theme.gradients.red};
        top: 0.9rem;
        left: -1.5rem;
        z-index: 5;
      }
      &:after {
        content: '';
        position: absolute;
        height: 8px;
        width: 2px;
        background: ${props => props.theme.gradients.red};
        top: 0.9rem;
        left: -1.5rem;
        z-index: 5;
        transform: rotate(90deg);
      }
    }
  }
`;

export default function TextContent({ content }) {
  return (
    <Content
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}

TextContent.propTypes = {
  content: PropTypes.string,
};
