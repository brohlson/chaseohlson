import React, { Fragment, useState } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Container from '../components/UI/Container';
import Button from '../components/UI/Button';
import PostCardGroup from '../components/Common/PostCardGroup';

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
  const [blogPage, setPage] = useState(1);
  const [allLoaded, setAllLoaded] = useState(false);

  const renderPosts = () => {
    const { edges } = blogData;
    const chunks = helpers.chunkArray(Array.from(edges), 2);
    const paginated = Array.from(chunks).splice(0, blogPage * 2);
    return paginated.map((group, index) => (
      <PostCardGroup
        posts={group}
        topBorder={index === 0}
        key={`group-${index}`}
      />
    ));
  };

  const onLoad = () => {
    const { edges } = blogData;
    const allPostsLoaded = (blogPage + 1) * 2 >= edges.length / 2;
    setPage(blogPage + 1);
    setAllLoaded(allPostsLoaded);
  };

  const { edges } = blogData;
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
        <Container>
          {renderPosts()}
          {edges.length >= 2 * 2 + 1 && (
            <div className="load">
              <Button
                type={'action'}
                action={onLoad}
                text={allLoaded ? 'All Posts Loaded' : 'Load More Posts'}
                disabled={allLoaded}
              />
            </div>
          )}
        </Container>
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
            createdAt(formatString: "MMMM Do, YYYY")
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
