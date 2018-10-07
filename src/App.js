import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import PitchList from './components/PitchList';
require('dotenv').config();

// ApolloClient config
const client = new ApolloClient({
  uri: 'http://localhost:7777/graphql',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client} >
        <div id="main">
          <h1>Test</h1>
          <PitchList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
