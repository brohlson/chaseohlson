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

const IndexPage = ({ data: { home, blog, desktopImage, mobileImage } }) => {
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
      <Clients logos={home.clientLogos} />
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
        fluid(maxWidth: 400, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid_noBase64
        }
      }
      projects {
        id
        projectTitle
        projectTags
        projectLink
        projectImage {
          fluid(maxWidth: 800, imgixParams: { fm: "png", auto: "compress" }) {
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
