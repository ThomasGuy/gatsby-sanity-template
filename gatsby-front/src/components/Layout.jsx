import React, { createContext, useState } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Nav from './Nav';
import { GlobalStyles } from '../styles';
import SEO from './SEO';

const ContentStyles = styled.div`
  background-color: var(--bg);
  max-width: var(--maxWidth);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
`;

const Inner = styled.div`
  padding: 0 2rem;
`;

export const TitleContext = createContext({
  title: 'Sport',
  setTitle: () => {},
});

const Layout = ({ children, siteTitle, siteURL, description }) => {
  const [title, setTitle] = useState(siteTitle);
  return (
    <>
      <GlobalStyles />

      <ContentStyles>
        <Nav title={title} />
        <TitleContext.Provider value={{ title, setTitle }}>
          <Inner>{children}</Inner>
        </TitleContext.Provider>
        <Footer />
      </ContentStyles>
    </>
  );
};

export default Layout;
