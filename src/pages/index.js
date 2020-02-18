import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Hero from '../components/Hero';
import PageSEO from '../components/PageSEO';
import HomeAbout from '../components/HomeAbout';
import HomeExp from '../components/HomeExp';
import HomeProjects from '../components/HomeProjects';
import HomeClients from '../components/HomeClients';
import Testimonials from '../components/Testimonials';
import Recent from '../components/Recent';

const IndexPage = ({ data: { home, blog, desktopImage, mobileImage } }) => {
  return (
    <Fragment>
      <PageSEO meta={home.seoMetaTags} />
      <Hero
        desktop={desktopImage.childImageSharp.fluid}
        mobile={mobileImage.childImageSharp.fluid}
        title={home.headline}
      />
      <HomeAbout title="About" body={home.aboutNode.childMarkdownRemark.html} />
      <HomeExp blocks={home.experience} />
      <HomeProjects title={'Recent Projects'} projects={home.projects} />
      <HomeClients logos={home.clientLogos} />
      <Testimonials testimonials={home.testimonials} />
      <Recent posts={blog.edges} />
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
      testimonials {
        id
        quote
        person
        company
      }
      experience {
        id
        company
        job
        timeframe
        detailsNode {
          childMarkdownRemark {
            html
          }
        }
      }
      clientLogos {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid_noBase64
        }
      }
      projects {
        id
        projectTitle
        projectTags
        projectLink
        projectImage {
          fluid(maxWidth: 600, imgixParams: { fm: "png", auto: "compress" }) {
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
      }
    }
    blog: allDatoCmsStandardBlog(
      sort: { fields: [meta___publishedAt], order: DESC }
      limit: 2
    ) {
      edges {
        node {
          id
          title
          slug
          meta {
            firstPublishedAt(formatString: "MMMM Do, YYYY")
            publishedAt(formatString: "MMMM Do, YYYY")
          }
          dateOverride(formatString: "MMMM Do, YYYY")
          contentNode {
            childMarkdownRemark {
              excerpt(truncate: true)
            }
          }
        }
      }
    }
    desktopImage: file(relativePath: { eq: "bg.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    mobileImage: file(relativePath: { eq: "cm.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;
