import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import { TwitterFollowButton } from 'react-twitter-embed';

import Container from '../components/Container';
import TextContent from '../components/TextContent';
import PageSEO from '../components/PageSEO';

const Wrapper = styled.div`
  background: white;
`;

const ImgWrapper = styled.div`
  position: relative;
  height: 500px;

  @media screen and (max-width: 600px) {
    height: 250px;
  }
`;

const PostImg = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  height: 500px;

  @media screen and (max-width: 600px) {
    height: 250px;
  }

  & > img {
    object-fit: 'cover' !important;
    object-position: '50% 50%' !important;
  }
`;

const BodyWrapper = styled.div`
  margin: 6rem 0;
  @media screen and (max-width: 600px) {
    margin: 3rem 0;
  }
  section {
    width: 1020px;
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

const TitleWrapper = styled.div`
  background: white;
  h1 {
    line-height: 8rem;
    margin: 0;
    padding-bottom: 30px;
    @media screen and (max-width: 600px) {
      font-size: 3.5rem;
      line-height: 4.5rem;
    }
  }
  p {
    text-transform: uppercase;
    position: relative;
    margin-left: 1.5rem;
    margin-top: 0;

    margin-right: 3.5rem;

    &:last-child {
      margin-bottom: 0;
      margin-right: 0;
    }
    &:before {
      content: '';
      position: absolute;
      height: 8px;
      width: 1px;
      background: ${props => props.theme.colors.greyDark};
      top: 0.9rem;
      left: -1rem;
      z-index: 5;
    }
    &:after {
      content: '';
      position: absolute;
      height: 8px;
      width: 1px;
      background: ${props => props.theme.colors.greyDark};
      top: 0.9rem;
      left: -1rem;
      z-index: 5;
      transform: rotate(90deg);
    }
  }
  .details {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 1.2rem;
  }
  .author {
    padding-bottom: 3rem;
  }
`;

const PostWrapper = styled.div`
  position: relative;
  padding: 6rem 0;
  max-width: 100%;

  code {
    &.language-text {
      border-radius: 0;
      padding: 0.2rem;
    }
  }

  blockquote {
    background: #f9f9f9;
    padding: 1.2rem;
    padding-left: 2rem;
    border-left: 0.4rem solid #222;
    margin-bottom: 2rem;
    p {
      margin: 0;
      font-style: italic;
    }
  }

  img {
    max-width: 100%;
    margin: 2rem 0 3rem 0;
  }

  h2 {
    margin-bottom: 2rem;
  }

  a {
    text-decoration: none;
    position: relative;
    transition: all 0.3s ease;
    padding: 0.2rem 0.4rem;
    color: white;
    z-index: 10;
    &:hover {
      color: ${props => props.theme.colors.black};
      &::before {
        height: 0.2rem;
        width: 100%;
        opacity: 1;
      }
    }
    &:before {
      z-index: -1;
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      bottom: -1px;
      left: 0;
      opacity: 1;
      color: white;
      transition: all 0.3s ease;
      background: ${props => props.theme.gradients.red};
    }
  }

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
    width: 100%;
    top: 0;
    left: 0;
    background: ${props => props.theme.gradients.red};
    z-index: 100;
  }
`;

const StandardBlog = ({ data: { blog } }) => {
  const splitTags = blog.tags.split(',');
  const hasBeenUpdated = blog.meta.firstPublishedAt !== blog.meta.publishedAt;
  return (
    <Fragment>
      <PageSEO meta={blog.seoMetaTags} />
      <Wrapper>
        <ImgWrapper>
          <PostImg
            backgroundColor={'#2B2B2B'}
            fluid={blog.featuredImage.fluid}
          />
        </ImgWrapper>
        <BodyWrapper>
          <Container>
            <TitleWrapper>
              <div className="title">
                <h1>{blog.title}</h1>
              </div>
              <div className="details">
                {hasBeenUpdated && <p>Updated: {blog.meta.publishedAt}</p>}
                <p>Posted: {blog.dateOverride || blog.meta.firstPublishedAt}</p>
                <p>
                  Topics:{' '}
                  {splitTags.map((item, index) =>
                    index + 1 === splitTags.length ? (
                      <span key={index}>{item}</span>
                    ) : (
                      <span key={index}>{item}, </span>
                    )
                  )}
                </p>
              </div>
              <div className="author">
                <TwitterFollowButton screenName={'chase_ohlson'} />
              </div>
            </TitleWrapper>
            <PostWrapper>
              <TextContent
                content={blog.contentNode.childMarkdownRemark.html}
              />
            </PostWrapper>
          </Container>
        </BodyWrapper>
      </Wrapper>
    </Fragment>
  );
};

StandardBlog.propTypes = {
  pageContext: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export const blogQuery = graphql`
  query($slug: String!) {
    blog: datoCmsStandardBlog(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
      dateOverride(formatString: "MMMM Do, YYYY")
      meta {
        firstPublishedAt(formatString: "MMMM Do, YYYY")
        publishedAt(formatString: "MMMM Do, YYYY")
      }
      tags
      contentNode {
        childMarkdownRemark {
          html
        }
      }
      featuredImage {
        fluid(maxWidth: 2000, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid_noBase64
        }
      }
    }
  }
`;

export default StandardBlog;
