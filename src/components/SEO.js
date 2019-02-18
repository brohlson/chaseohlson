import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import social from '../images/social.jpg'
import helpers from '../util/helpers'

function SEO({
  description,
  lang,
  meta,
  keywords,
  title,
  preconnect,
  img,
  type,
  createdAt,
  updatedAt,
}) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:image`,
                content: img || social,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:url`,
                content: helpers.getUrl(),
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: type || `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
              {
                name: `twitter:image`,
                content: img || social,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )
              .concat(meta)}
          >
            {preconnect && <link rel="preconnect" href={preconnect} />}
            {createdAt && (
              <meta property="article:published_time" content={createdAt} />
            )}
            {updatedAt && (
              <meta property="og:updated_time" content={updatedAt} />
            )}
          </Helmet>
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  preconnect: PropTypes.string,
  img: PropTypes.string,
  type: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
