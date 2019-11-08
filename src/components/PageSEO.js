import React from 'react';
import PropTypes from 'prop-types';
import { HelmetDatoCms } from 'gatsby-source-datocms';

const PageSEO = ({ meta }) => {
  return <HelmetDatoCms seo={meta} />;
};

PageSEO.propTypes = {
  meta: PropTypes.object.isRequired,
};

export default PageSEO;
