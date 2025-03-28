import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: createHttpLink({
    uri: `${process.env.NEXTAUTH_URL}/api/graphql`,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});

export default client;
