import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const Box = styled.div`
  /* set max-width to sane width as gatsbyImageData */
  max-width: 35rem;
  /* height: auto; */
  margin: 0 auto;

  p {
    text-align: center;
    color: var(--white);
    opacity: 0.9;
    font-size: 1.8rem;
    margin: 0;
    margin-top: 0.6rem;
    padding-bottom: 1rem;
    line-height: 1.8;
  }
  .dim {
    color: var(--offWhite);
    opacity: 0.8;
    font-size: 1.5rem;
  }
`;

const styles = {
  container: flip => ({
    width: '100%',
    height: 'auto',
    border: `${flip ? '15px' : '25px'} solid #fff`,
  }),
};

const SanityImageBox = ({
  image,
  name,
  idx,
  alt,
  show,
  mql,
  dimensions = null,
}) => {
  const trigger = mql.md;
  return (
    <Box>
      <GatsbyImage
        image={image.asset.gatsbyImageData}
        alt={alt}
        idx={idx}
        loading="eager"
        imgStyle={show && { border: `${trigger ? '15px' : '25px'} solid #fff` }}
      />
      {name && (
        <p>
          {name}
          {'  '}
          <span className="dim">
            {dimensions ? `${dimensions.height}x${dimensions.width}cm` : ``}
          </span>
        </p>
      )}
    </Box>
  );
};

export default SanityImageBox;
