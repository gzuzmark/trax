import { Box } from '@chakra-ui/layout';
import { FC, ReactNode } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Header } from './Header';
import Sidebar from './Sidebar';

type Page = {
  children: ReactNode;
};

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: radnika_next;
  src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
  font-weight: normal ;
  font-style: normal ;

}
html {
    --yellow: #ffc600;
    --light: #ffffff;
    --dark: #000000;    
    --lightGray: var(--lightGrey);
    --imGoingToFaint: #fbfbfb;        
    --red: #ff0000;
    --black: #393939;
    --grey: #3A3A3A;
    --gray: var(--grey);
    --lightGrey: #d8d8d8;
    --lightGray: var(--lightGrey);
    --offWhite: #ededed;
    --maxWidth: 1200px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

body {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height:2;
  }
  a {
    text-decoration: none;
    color: var(--black);
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

const PageLayout: FC = ({ children }) => (
  // <Box width="100vw" height="100vh">
  //   <Box position="absolute" top="0" width="250px" left="0">
  //     {/* <Sidebar /> */}
  //   </Box>
  //   <Box marginLeft="250px" marginBottom="100px">
  //     {children}
  //   </Box>
  //   <Box position="absolute" left="0" bottom="0">
  //     player
  //   </Box>
  // </Box>
  <div>
    <GlobalStyles />
    <Header />
    <InnerStyles>{children}</InnerStyles>
  </div>
);

export default PageLayout;
