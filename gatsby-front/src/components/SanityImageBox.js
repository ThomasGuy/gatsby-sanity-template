import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const Box = styled.div`
  width: 100%;
  height: auto;
  overflow-y: auto;

  p {
    text-align: center;
    color: var(--offWhite);
    opacity: 0.8;
    font-size: 1.7rem;
    margin: 0;
    padding-bottom: 1rem;
  }
`;

const SanityImageBox = ({ image, name, idx, alt }) => (
  <Box>
    <GatsbyImage
      image={image.asset.gatsbyImageData}
      alt={alt}
      idx={idx}
      loading="eager"
      imgStyle={{ border: '15px solid hsl(34, 75%, 51%)' }}
    />
    <p>{name}</p>
  </Box>
);

export default SanityImageBox;
