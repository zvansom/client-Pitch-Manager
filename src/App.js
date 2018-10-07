import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Home from './Routes/Home';
import Register from './Routes/Register';
import Login from './Routes/Login';

import Navbar from './components/Navbar';

// ApolloClient config
const client = new ApolloClient({
  uri: 'http://localhost:7777/graphql',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div id="main">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
