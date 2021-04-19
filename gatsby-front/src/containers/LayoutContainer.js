import React from 'react';
import Layout from '../components/Layout';
import useSiteMetadata from '../hooks/useSiteMetadata';

function LayoutContainer(props) {
  const { title, siteURL, description } = useSiteMetadata();
  return (
    <Layout
      {...props}
      siteTitle={title}
      siteURL={siteURL}
      decription={description}
    />
  );
}

export default LayoutContainer;
