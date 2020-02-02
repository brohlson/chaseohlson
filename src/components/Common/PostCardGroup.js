import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PostCard from './PostCard';

const PostCardGroupWrapper = styled.div`
  background: white;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  position: relative;

  @media screen and (min-width: ${props => props.theme.sizes.mobile}) {
    &:after {
      content: '';
      position: absolute;
      height: 0.2rem;
      width: 100%;
      bottom: 0;
      left: 0;
      background: ${props => props.theme.gradients.red};
      z-index: 100;
    }
    &:before {
      content: '';
      position: absolute;
      height: 0.2rem;
      width: ${props => (props.topBorder ? '100%' : '0%')};
      top: 0;
      left: 0;
      background: ${props => props.theme.gradients.red};
      z-index: 100;
    }
  }
  @media screen and (min-width: ${props => props.theme.sizes.tablet}) {
    flex-wrap: wrap;
    padding: 5rem 0;
  }
  @media screen and (max-width: ${props => props.theme.sizes.mobile}) {
    flex-wrap: wrap;
  }
`;

const PostCardGroup = ({ posts, topBorder }) => (
  <PostCardGroupWrapper topBorder={topBorder}>
    {posts && posts.map(post => <PostCard key={post.node.id} data={post} />)}
  </PostCardGroupWrapper>
);

PostCardGroup.propTypes = {
  posts: PropTypes.array.isRequired,
  topBorder: PropTypes.bool,
};

export default PostCardGroup;
