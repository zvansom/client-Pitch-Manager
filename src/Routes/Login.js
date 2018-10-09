import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { SERVER_URL } from '../variables';

import '../styles/forms.css';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    redirectToReferrer: false,
  }

  loginUser = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}/login`, this.state);
      localStorage.setItem('mernToken', response.data.token);
      this.setState({
        email: '',
        password: '',
        redirectToReferrer: true,
      });
      this.props.updateUser();
      // TODO: Add a redirect to pitches page
    }
    catch(err) {
      console.error(err);
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if(redirectToReferrer) { 
      return <Redirect to={from} />;
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
