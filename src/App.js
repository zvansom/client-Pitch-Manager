import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import axios from 'axios';

import { SERVER_URL } from './variables';

import Home from './Routes/Home';
import Register from './Routes/Register';
import Login from './Routes/Login';

import Navbar from './components/Navbar';

import "./styles/helpers.css";

// ApolloClient config
const client = new ApolloClient({
  uri: `${SERVER_URL}/graphql`,
});

class App extends Component {
  state = {
    user: null,
    checkLogin: false,
  };

  componentDidMount = () => {
    this.getUser();
  };

  getUser = async () => {
    const token = localStorage.getItem("mernToken");
    if (token) {
      try {
      // There is a token in localStorage. Try to validate it!
        const response = await axios.post(SERVER_URL + "/me/from/token", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.setState({
          user: response.data.user,
          checkLogin: true,
        });
      } 
      catch(err) {
        console.error('error', err);
        localStorage.removeItem("mernToken");
        this.setState({
          user: null,
          checkLogin: true,
        });
      }
    } else {
      this.setState({
        user: null,
        checkLogin: false,
      });
    }
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div id="main">
            <Navbar user={this.state.user} updateUser={this.getUser} />
            <div className="inner">
              <Switch>
                <Route 
                  exact path="/" 
                  component={() => (<Home user={this.state.user} />)} />
                <Route 
                  path="/register" 
                  component={() => (<Register updateUser={this.getUser} />)} />
                <Route 
                  path="/login" 
                  component={() => (<Login updateUser={this.getUser} />)} />
              </Switch>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
