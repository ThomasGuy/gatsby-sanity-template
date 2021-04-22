import styled from 'styled-components';
import { mediaQuery } from './mediaQuery';

export const GalleryLayout = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 2rem;
  margin-top: 10rem;
  overflow: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  & > {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  ${mediaQuery('xs')`
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
    `};

  ${mediaQuery('sm')`
    grid-template-columns: 1fr 1fr 1fr;
    `};

  ${mediaQuery('md')`
    column-gap: 3rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    `};

  ${mediaQuery('lg')`
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    column-gap: 4rem;
    row-gap: 3rem;
    `};

  ${mediaQuery('xl')`
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr ;
  `};
`;
