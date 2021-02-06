import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({ uri: '/graphql' });
const authLink = setContext(async (req: any, { headers }: any) => {
  const token = localStorage.getItem('token');

  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const link = authLink.concat(httpLink as any);

const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache(),
});

export default client;
