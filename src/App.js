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
import { FourOhFour } from './Routes/FourOhFour';

import Navbar from './components/Navbar';
import { ProtectedRoute } from './components/utilities/ProtectedRoute';

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
        // TODO: Pass message to client side with error message.
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
              updateUser={this.getUser} 
              authenticated={this.state.isAuthenticated}
            />
            <div className="inner">
              <Switch>
                <Route 
                  exact path="/" 
                  component={Home} />
                <Route 
                  path="/register" 
                  component={() => (
                    <Register 
                      updateUser={this.getUser} 
                      authenticated={this.state.isAuthenticated}
                /> )} />
                <Route 
                  path="/login" 
                  component={() => (
                    <Login 
                      updateUser={this.getUser} 
                      authenticated={this.state.isAuthenticated}
                /> )} />
                <ProtectedRoute
                  path="/pitches"
                  authenticated={this.state.isAuthenticated}
                  component={() => (
                    <Pitches
                      user={this.state.user}
                  /> )} />
                {/* <ProtectedRoute
                  path="/pitch/new"
                  authenticated={this.state.isAuthenticated} 
                  component={() => (
                    <AddPitch
                      user={this.state.user}
                  /> )} /> */}
                <Route component={FourOhFour} />
              </Switch>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
