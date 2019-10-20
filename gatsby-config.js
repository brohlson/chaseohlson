const proxy = require('http-proxy-middleware');
const siteConfig = require('./config/siteConfig');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    ...siteConfig,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: siteConfig.sitemapPath,
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: siteConfig.siteUrl,
      },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/Layout.js'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#212529',
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'chase-ohlson',
        short_name: 'Chase',
        start_url: '/',
        background_color: '#212529',
        theme_color: '#212529',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://chaseohlson.com',
        sitemap: 'https://chaseohlson.com/sitemap.xml',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: true,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ID,
        head: false,
      },
    },
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: process.env.SMALLCHAT_SCRIPT,
      },
    },
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV,
        enabled: (() => ['production'].indexOf(process.env.NODE_ENV) !== -1)(),
      },
    },
  ],
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      })
    );
  },
};
