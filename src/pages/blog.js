import React, { Component } from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Container from '../components/UI/Container'
import Button from '../components/UI/Button'
import PostCardGroup from '../components/Common/PostCardGroup'
import { graphql } from 'gatsby'
import helpers from '../util/helpers'

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
`

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
`

class Blog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      chunksPerPage: 2,
      allLoaded: false,
    }
  }

  renderPosts = () => {
    let { edges } = this.props.data.blogData
    let { page, chunksPerPage } = this.state
    let chunks = helpers.chunkArray(Array.from(edges), 2)
    let paginated = Array.from(chunks).splice(0, page * chunksPerPage)
    return paginated.map((group, index) => (
      <PostCardGroup posts={group} topBorder={index === 0} key={index} />
    ))
  }

  onLoad = () => {
    let { page, chunksPerPage } = this.state
    let { edges } = this.props.data.blogData
    let allLoaded = (page + 1) * chunksPerPage >= edges.length / 2
    this.setState({ page: page + 1, allLoaded: allLoaded })
  }

  render() {
    let { allLoaded, chunksPerPage } = this.state
    let { edges } = this.props.data.blogData
    return (
      <Layout>
        <SEO
          title="Web Development Blog | Chase Ohlson"
          url={'https://chaseohlson.com/blog'}
          description="Chase Ohlson's web development blog.  Covering topics like React & Gatsby and other stuff"
        />
        <HeroWrapper>
          <Container>
            <h1>The</h1>
            <h1>Latest</h1>
          </Container>
        </HeroWrapper>
        <PostsWrapper>
          <Container>
            {this.renderPosts()}
            {edges.length >= chunksPerPage * 2 + 1 && (
              <div className="load">
                <Button
                  type={'action'}
                  action={this.onLoad}
                  text={allLoaded ? 'All Posts Loaded' : 'Load More Posts'}
                  disabled={allLoaded}
                />
              </div>
            )}
          </Container>
        </PostsWrapper>
      </Layout>
    )
  }
}

export default Blog

export const blogQuery = graphql`
  {
    blogData: allContentfulStandardPost(
      sort: { fields: [createdAt], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          slug
          title
          dateOverride
          createdAt
          content {
            childMarkdownRemark {
              excerpt
            }
          }
        }
      }
    }
  }
`
