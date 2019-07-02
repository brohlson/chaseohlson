import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Container from '../components/UI/Container'
import SEO from '../components/SEO'
import Img from 'gatsby-image'
import Moment from 'react-moment'
import { graphql } from 'gatsby'

const Wrapper = styled.div`
  background: white;
`

const ImgWrapper = styled.div`
  position: relative;
  height: 400px;

  @media screen and (max-width: 600px) {
    height: 200px;
  }
`

const PostImg = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  height: 400px;

  @media screen and (max-width: 600px) {
    height: 200px;
  }

  & > img {
    object-fit: 'cover' !important;
    object-position: '50% 50%' !important;
  }
`

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
`

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
    &:first-child {
      margin-right: 3.5rem;
    }
    &:last-child {
      margin-bottom: 0;
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
    padding-bottom: 3rem;
  }
`

const PostWrapper = styled.div`
  position: relative;
  padding: 6rem 0;
  max-width: 100%;

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
  .content {
    max-width: 100%;
    p,
    pre {
      margin-bottom: 2rem;
    }
    ul {
      list-style: none;
      margin-bottom: 2rem;
      li {
        position: relative;
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
  }
`

const StandardBlog = ({ data: { blog } }) => (
  <Fragment>
    <SEO
      title={blog.titleTag}
      description={blog.metaDescription}
      img={blog.featuredImage.file.url}
      type={'article'}
      createdAt={blog.dateOverride || blog.createdAt}
      updatedAt={blog.updatedAt}
      url={`https://chaseohlson.com/${blog.slug}`}
    />
    <Wrapper>
      <ImgWrapper>
        <PostImg backgroundColor={'#2B2B2B'} fluid={blog.featuredImage.fluid} />
      </ImgWrapper>
      <BodyWrapper>
        <Container>
          <TitleWrapper>
            <div className="title">
              <h1>{blog.title}</h1>
            </div>
            <div className="details">
              <p>
                Date: {''}
                <Moment
                  date={blog.dateOverride || blog.createdAt}
                  format={'MMMM Do, YYYY'}
                />
              </p>
              <p>
                Topics:{' '}
                {blog.tags.map((item, index) =>
                  index + 1 === blog.tags.length ? (
                    <span key={index}>{item}</span>
                  ) : (
                    <span key={index}>{item}, </span>
                  )
                )}
              </p>
            </div>
          </TitleWrapper>
          <PostWrapper>
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: blog.content.childMarkdownRemark.html,
              }}
            />
          </PostWrapper>
        </Container>
      </BodyWrapper>
    </Wrapper>
  </Fragment>
)

StandardBlog.propTypes = {
  pageContext: PropTypes.object.isRequired,
}

export const blogQuery = graphql`
  query($slug: String!) {
    blog: contentfulStandardPost(slug: { eq: $slug }) {
      title
      slug
      titleTag
      createdAt
      updatedAt
      metaDescription
      dateOverride
      tags
      content {
        childMarkdownRemark {
          html
        }
      }
      featuredImage {
        file {
          url
        }
        fluid(maxWidth: 1400) {
          sizes
          src
          srcSet
          aspectRatio
        }
      }
    }
  }
`

export default StandardBlog
