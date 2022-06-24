// import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import Router from 'next/router';
import { useApollo } from '../lib/withData';
import Page from '../components/Page';
import 'nprogress/nprogress.css';
import { CartStateProvider } from '../lib/CartState';

// TODO: Add chakraUI theme, for now we are stiking with styled components
// const theme = extendTheme({
//   colors: {
//     gray: {
//       100: "#F5f5f5",
//       200: "#EEEEE",
//       300: "#E0E0E0",
//       400: "#BDBDBD",
//       500: "#9E9E9E",
//       600: "#757575",
//       700: "#616161",
//       800: "#424242",
//       900: "#212121",
//     },
//   },
//   components: {
//     Button: {
//       variants: {
//         link: {
//           ":focus": {
//             outline: "none",
//             boxShadow: "none",
//           },
//         },
//       },
//     },
//   },
// });

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  );
};

export default MyApp;
