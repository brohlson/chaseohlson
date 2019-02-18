import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Home/Hero'
import SEO from '../components/SEO'
import About from '../components/Home/About'
import Exp from '../components/Home/Exp'
import Projects from '../components/Home/Projects'
import Clients from '../components/Home/Clients'
import Testimonials from '../components/Home/Testimonials'
import Recent from '../components/Home/Recent'
import { graphql } from 'gatsby'

const IndexPage = ({
  data: { homeData, blogData, desktopImage, mobileImage },
}) => (
  <Layout>
    <SEO
      title={homeData.edges[0].node.titleTag}
      description={homeData.edges[0].node.meta}
      preconnect={'https://p.scdn.co'}
    />
    <Hero
      desktop={desktopImage.childImageSharp.fluid}
      mobile={mobileImage.childImageSharp.fluid}
      title={homeData.edges[0].node.h1}
    />
    <About
      title="About"
      body={homeData.edges[0].node.aboutText.childMarkdownRemark.html}
    />
    <Exp blocks={homeData.edges[0].node.experienceBlocks} />
    <Projects
      title={'Recent Projects'}
      projects={homeData.edges[0].node.projectBlocks}
    />
    <Clients logos={homeData.edges[0].node.clientLogos} />
    <Testimonials testimonials={homeData.edges[0].node.testimonialBlocks} />
    <Recent posts={blogData.edges} />
  </Layout>
)

export default IndexPage

export const homeQuery = graphql`
  {
    homeData: allContentfulHome {
      edges {
        node {
          titleTag
          meta
          h1
          aboutText {
            childMarkdownRemark {
              html
            }
          }
          experienceBlocks {
            company
            position
            timeframe
            details {
              childMarkdownRemark {
                html
              }
            }
          }
          projectBlocks {
            projectTitle
            projectDescription {
              childMarkdownRemark {
                html
              }
            }
            projectTags
            projectColor
            projectLink
            projectImage {
              fluid(maxWidth: 800) {
                sizes
                src
                srcSet
                aspectRatio
              }
            }
          }
          clientLogos {
            fluid(maxWidth: 400) {
              sizes
              src
              srcSet
              aspectRatio
            }
          }
          testimonialBlocks {
            company
            person
            quote {
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
    }
    blogData: allContentfulStandardPost(
      sort: { fields: [createdAt], order: DESC }
      limit: 2
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
    desktopImage: file(relativePath: { eq: "bg.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    mobileImage: file(relativePath: { eq: "cm.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`
