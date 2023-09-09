```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Create a http link to connect to the graphql server
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

// Create a new Apollo client and provide the URL to the API server.
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

```
This file initializes the React application and sets up the connection between the frontend and the Apollo GraphQL server.