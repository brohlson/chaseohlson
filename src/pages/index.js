import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Hero from '../components/Home/Hero';
import PageSEO from '../components/PageSEO';
import About from '../components/Home/About';
import Exp from '../components/Home/Exp';
import Projects from '../components/Home/Projects';
import Clients from '../components/Home/Clients';
import Testimonials from '../components/Home/Testimonials';
import Recent from '../components/Home/Recent';
import { graphql } from 'gatsby';

const IndexPage = ({
  data: { home, homeData, blogData, desktopImage, mobileImage },
}) => {
  console.log(home);
  return (
    <Fragment>
      <PageSEO meta={home.seoMetaTags} />
      <Hero
        desktop={desktopImage.childImageSharp.fluid}
        mobile={mobileImage.childImageSharp.fluid}
        title={home.headline}
      />
      <About title="About" body={home.aboutNode.childMarkdownRemark.html} />
      <Exp blocks={home.experience} />
      <Projects title={'Recent Projects'} projects={home.projects} />
      <Clients logos={homeData.edges[0].node.clientLogos} />
      <Testimonials testimonials={homeData.edges[0].node.testimonialBlocks} />
      <Recent posts={blogData.edges} />
    </Fragment>
  );
};

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default IndexPage;

export const homeQuery = graphql`
  {
    home: datoCmsHome {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      headline
      aboutNode {
        childMarkdownRemark {
          html
        }
      }
      experience {
        company
        job
        timeframe
        detailsNode {
          childMarkdownRemark {
            html
          }
        }
      }
      projects {
        projectTitle
        projectTags
        projectLink
        projectImage {
          fluid(maxWidth: 1000, imgixParams: { fm: "png", auto: "compress" }) {
            ...GatsbyDatoCmsFluid_noBase64
          }
        }
        projectDescriptionNode {
          childMarkdownRemark {
            html
          }
        }
        projectColor {
          hex
        }
        id
      }
    }
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
`;
