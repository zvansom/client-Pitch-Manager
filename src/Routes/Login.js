import React, { Component } from 'react'
import axios from 'axios';

import { SERVER_URL } from '../variables';

import '../styles/forms.css';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
  }

loginUser = async e => {
  e.preventDefault();
  const { email, password } = this.state;
  const response = await axios.post(`${SERVER_URL}/login`, {
    email,
    password,
  });
  if(response.data.errors.length) {
    response.data.errors.forEach(error => console.error(error));
    return;
  }
  this.setState({
    email: '',
    password: '',
  });
}

  render() {
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
