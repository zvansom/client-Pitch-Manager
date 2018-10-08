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
        const response = await axios
        .post(SERVER_URL + "/auth/me/from/token", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.setState({
          user: response.data.user,
          checkLogin: true,
        });
      }
      catch(err) {
        localStorage.removeItem("mernToken");
        this.setState({
          user: null,
          checkLogin: true,
        });
      }
    } else {
      this.setState({
        user: null,
        checkLogin: true,
      });
    }
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div id="main">
            <Navbar />
            <div className="inner">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
              </Switch>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
