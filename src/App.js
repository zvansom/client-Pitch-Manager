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
import Pitches from './components/Pitches';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/utilities/ProtectedRoute';

import "./styles/helpers.css";

// ApolloClient config
const client = new ApolloClient({
  uri: `${SERVER_URL}/graphql`,
});

class App extends Component {
  state = {
    user: null,
    isAuthenticated: false,
  };

  componentDidMount = () => {
    this.getUser();
  };

  handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem('mernToken');
    this.getUser();
  }

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
          isAuthenticated: true,
        });
      } 
      catch(err) {
        console.error('error', err);
        localStorage.removeItem("mernToken");
        this.setState({
          user: null,
          isAuthenticated: false,
        });
      }
    } else {
      this.setState({
        user: null,
        isAuthenticated: false,
      });
    }
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div id="main">
            <Navbar 
              user={this.state.user} 
              updateUser={this.getUser} 
              authenticated={this.state.isAuthenticated}
            />
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
                  component={() => (<Login updateUser={this.getUser} />)}
                  authenticated={this.state.isAuthenticated} />
                <ProtectedRoute
                  path="/profile"
                  component={Pitches}
                  user={this.state.user}
                  authenticated={this.state.isAuthenticated} />
              </Switch>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
