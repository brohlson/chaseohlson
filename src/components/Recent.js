import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Container from './Container';
import PostCardGroup from './PostCardGroup';

const RecentWrapper = styled.div`
  background: white;
  margin-bottom: 10rem;
  section {
    flex-direction: column;
    .title, .posts {
      width: 900px;
      max-width: 100%;
      margin: auto;
      h2 {
        color: ${props => props.theme.colors.red};
        margin-bottom: 2rem;
      }
    }
`;

const Recent = ({ posts }) => (
  <RecentWrapper>
    <Container>
      <div className="title">
        <h2>Recent Posts</h2>
      </div>
      <div className="posts">
        <PostCardGroup posts={posts} topBorder={true} />
      </div>
    </Container>
  </RecentWrapper>
);

Recent.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Recent;
