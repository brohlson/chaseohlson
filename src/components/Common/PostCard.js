import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../UI/Button';
import Moment from 'react-moment';

const PostCardWrapper = styled.div`
  background: white;
  width: 48.5%;
  padding: 5rem 0;
  @media screen and (max-width: ${props => props.theme.sizes.mobile}) {
    width: 100%;
    padding-top: 0;
  }
  .date {
    span {
      text-transform: uppercase;
      font-size: 1.2rem;
      letter-spacing: 0.5px;
    }
  }
  .postTitle {
    width: 90%;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 2rem 0;
    h4 {
      font-family: ${props => props.theme.fonts.robo};
      font-size: 3rem;
      line-height: 3.9rem;
      text-transform: capitalize;
      letter-spacing: 1.3px;
    }
  }
  .button {
    margin-top: 4rem;
  }
`;

const PostCard = ({ data }) => (
  <PostCardWrapper>
    <div className="date">
      <span>
        <Moment
          date={data.node.dateOverride || data.node.createdAt}
          format={'MMMM Do, YYYY'}
        />
      </span>
    </div>
    <div className="postTitle">
      <h4>{data.node.title}</h4>
    </div>
    <div className="excerpt">
      <p>{data.node.content.childMarkdownRemark.excerpt}</p>
    </div>
    <div className="button">
      <Button type={'link'} link={data.node.slug} text={'Read More'} />
    </div>
  </PostCardWrapper>
);

PostCard.propTypes = {
  data: PropTypes.object,
};

export default PostCard;
