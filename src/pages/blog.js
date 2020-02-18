import React, { Fragment, useState } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Container from '../components/Container';
import Button from '../components/Button';
import PostCardGroup from '../components/PostCardGroup';

import helpers from '../util/helpers';
import PageSEO from '../components/PageSEO';

const HeroWrapper = styled.div`
  height: 400px;
  background: ${props => props.theme.gradients.red};
  section {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: center;
    width: 1020px;
    max-width: 100%;
    margin: auto;
    h1 {
      margin: 0;
      color: white;
      font-size: 6rem;
      line-height: 8rem;
    }
  }
`;

const PostsWrapper = styled.div`
  padding: 6rem 0;
  section {
    width: 1020px;
    max-width: 100%;
    flex-direction: column;
    div.load {
      text-align: center;
      margin-top: 6rem;
    }
  }
`;

export default function Blog({ data: { page, blogData } }) {
  const renderPosts = () => {
    const { edges } = blogData;
    const chunks = helpers.chunkArray(Array.from(edges), 2);
    return chunks.map((group, index) => (
      <PostCardGroup
        posts={group}
        topBorder={index === 0}
        key={`group-${index}`}
      />
    ));
  };

  return (
    <Fragment>
      <PageSEO meta={page.seoMetaTags} />
      <HeroWrapper>
        <Container>
          <h1>The</h1>
          <h1>Latest</h1>
        </Container>
      </HeroWrapper>
      <PostsWrapper>
        <Container>{renderPosts()}</Container>
      </PostsWrapper>
    </Fragment>
  );
}

Blog.propTypes = {
  data: PropTypes.object.isRequired,
};

export const blogQuery = graphql`
  {
    page: datoCmsBlogPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
    }
    blogData: allDatoCmsStandardBlog(
      sort: { fields: [meta___publishedAt], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          id
          slug
          title
          dateOverride(formatString: "MMMM Do, YYYY")
          meta {
            firstPublishedAt(formatString: "MMMM Do, YYYY")
            publishedAt(formatString: "MMMM Do, YYYY")
          }
          contentNode {
            childMarkdownRemark {
              excerpt
            }
          }
        }
      }
    }
  }
`;
