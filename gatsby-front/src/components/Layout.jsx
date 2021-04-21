import React, { createContext, useState } from 'react';
import styled from 'styled-components';
import { BreakpointProvider } from '../hooks/useBreakpoint';
import { GlobalStyles } from '../styles';
import Footer from './Footer';
import Nav from './Nav';
import SEO from './SEO';

const ContentStyles = styled.div`
  background-color: var(--bg);
  max-width: var(--maxWidth);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
`;

const Main = styled.div`
  padding: 0 3rem;
`;

const queries = {
  xs: '(max-width: 320px)',
  sm: '(max-width: 480px)',
  md: '(max-width: 668px)',
  or: '(orientation: portrait)', // we can check orientation also
  navChange: '(min-width: 74rem)',
};

export const TitleContext = createContext({
  title: 'Sport',
  setTitle: () => {},
});

const Layout = ({ children, siteTitle, siteDescription }) => {
  const [title, setTitle] = useState(siteTitle);
  return (
    <>
      <GlobalStyles />
      <SEO title={siteTitle} description={siteDescription} />
      <ContentStyles>
        <Nav title={title} />
        <BreakpointProvider queries={queries}>
          <TitleContext.Provider value={{ title, setTitle }}>
            <Main>{children}</Main>
          </TitleContext.Provider>
        </BreakpointProvider>
        <Footer />
      </ContentStyles>
    </>
  );
};

export default Layout;
