/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */

import { graphql } from 'gatsby';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { TitleContext } from '../components/Layout';
import SanityImageBox from '../components/SanityImageBox';
import { Modal } from '../components/SimpleModal';
import SEO from '../components/SEO';
import { GalleryLayout } from '../styles';
import { useBreakpoint } from '../hooks/useBreakpoint';

const Gallery = ({ data }) => {
  const { setTitle } = useContext(TitleContext);
  const [openModal, setOpen] = useState(false);
  const [index, _setIndex] = useState(-1);
  const indexRef = useRef(index);
  const mql = useBreakpoint();
  console.log(mql);

  useEffect(() => {
    setTitle(data.title.name);
  }, [setTitle, data.title.name]);

  const propsArray = data.allSanityPicture.edges.map(({ node }) => {
    const { image, name, dimensions, id, category } = node;
    return {
      image,
      id,
      alt: name,
      name,
      show: category.border,
      aspectRatio: image.asset.metadata.dimensions.aspectRatio,
      dimensions,
    };
  });

  const sorted = propsArray.sort(function (p1, p2) {
    return p2.aspectRatio - p1.aspectRatio;
  });

  const pictures = sorted.map((props, idx) => {
    const { aspectRatio, ...rest } = props;
    return <SanityImageBox idx={idx} mql={mql} {...rest} />;
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
      {pictures.map(pic => {
        const { image, id, name } = pic.props;
        return (
          <div key={id}>
            <SEO title={name} imageSrc={image.asset.url} />
            {pic}
          </div>
        );
      })}
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
    ) {
      edges {
        node {
          name
          id
          dimensions {
            height
            width
          }
          category {
            border
          }
          image {
            asset {
              url
              gatsbyImageData(
                layout: CONSTRAINED
                width: 350
                placeholder: BLURRED
              )
              metadata {
                dimensions {
                  aspectRatio
                }
              }
            }
          }
        }
      }
    }
    title: sanityCategory(slug: { current: { eq: $slug } }) {
      name
    }
  }
`;
