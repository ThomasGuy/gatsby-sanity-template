/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */

import { graphql } from 'gatsby';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SanityImageBox from '../components/SanityImageBox';
import { Modal } from '../components/SimpleModal';

const GalleryLayout = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 10rem;
  overflow: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  & > {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  @media screen and (min-width: 476px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }

  @media screen and (min-width: 668px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 12rem;
  }

  @media screen and (min-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const Gallery = ({ data }) => {
  const [openModal, setOpen] = useState(false);
  const [index, _setIndex] = useState(-1);
  const indexRef = useRef(index);
  const pictures = data.allSanityPicture.edges.map(({ node }, idx) => {
    const { image, name, id } = node;
    return (
      <SanityImageBox name={name} image={image} key={id} idx={idx} alt={name} />
    );
  });
  const setIndex = useCallback(
    idx => {
      idx += pictures.length;
      idx %= pictures.length;
      indexRef.current = idx;
      _setIndex(idx);
    },
    [pictures.length]
  );

  const clickHandler = useCallback(
    evt => {
      if (evt.target.nodeName !== 'IMG') {
        return;
      }
      setOpen(true);
      setIndex(parseInt(evt.target.attributes.idx.value));
    },
    [setIndex, setOpen]
  );

  const handleKeyUp = useCallback(
    e => {
      const keys = {
        27: () => {
          e.preventDefault();
          setOpen(state => !state);
          window.removeEventListener('keyup', handleKeyUp, false);
        },
      };

      if (keys[e.keyCode]) {
        keys[e.keyCode]();
      }
    },
    [setOpen]
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp, false);
    document.addEventListener('click', clickHandler, false);

    return () => {
      window.removeEventListener('keyup', handleKeyUp, false);
      document.removeEventListener('click', clickHandler, false);
    };
  }, [clickHandler, handleKeyUp]);

  return (
    <GalleryLayout onClick={clickHandler}>
      {pictures}
      {openModal && (
        <Modal onCloseRequest={() => setOpen(false)}>{pictures[index]}</Modal>
      )}
    </GalleryLayout>
  );
};

export default Gallery;

export const pageQuery = graphql`
  query GalleryPageQuery($slug: String!) {
    allSanityPicture(
      filter: { category: { slug: { current: { eq: $slug } } } }
      sort: { fields: image___asset___fluid___aspectRatio, order: DESC }
    ) {
      edges {
        node {
          name
          id
          image {
            asset {
              fluid {
                src
              }
              gatsbyImageData(
                layout: CONSTRAINED
                width: 600
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  }
`;
