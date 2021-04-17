const dotenv = require('dotenv');

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

// eslint-disable-next-line import/first
const clientConfig = require('./client-config');

const token = process.env.SANITY_READ_TOKEN;
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  siteMetadata: {
    title: 'Charles Penny',
    siteUrl: 'https://charles.penny.co.uk',
    description: 'Gallery website',
  },
  plugins: [
    {
      resolve: 'gatsby-source-sanity',
      options: {
<<<<<<< HEAD
        ...clientConfig.sanity,
        token,
        watchMode: !isProd,
        useCdn: isProd,
        overlayDrafts: !isProd && token,
=======
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        token: process.env.SANITY_TOKEN,
        watchMode: true,
>>>>>>> d78a37c3eb824f9421d1a4b2d721424e4858038c
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    // 'gatsby-plugin-sitemap',
    'gatsby-plugin-react-svg',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/assets/typography`,
      },
    },
  ],
};
