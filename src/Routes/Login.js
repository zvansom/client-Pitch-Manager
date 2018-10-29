import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import { SERVER_URL } from '../variables';

import '../styles/forms.css';

export default class Login extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    updateUser: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  loginUser = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}/login`, this.state);
      localStorage.setItem('mernToken', response.data.token);
      this.setState({
        email: '',
        password: '',
      });
      this.props.updateUser();
    }
    catch(err) {
      // TODO: Pass message to client side with error message.
      console.error(err);
    }
  }

  render() {
    if(this.props.authenticated) {
      return <Redirect to="/pitches" />
    }

    return (
      <form className="form" onSubmit={this.loginUser}>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          value={this.state.email}
          onChange={ e => { this.setState({ email: e.target.value }) } }
        />
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          value={this.state.password}
          onChange={ e => { this.setState({ password: e.target.value }) } }
        />
        <input 
          className="button"
          type="submit" 
          value="Login" 
        />
      </form>
    )
  }
}
