import React, { Component } from 'react'
import axios from 'axios';
import { SERVER_URL } from '../variables';

import '../styles/forms.css';

export default class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }
  
  submitForm = async e => {
    e.preventDefault();
    console.log('submit new user:', this.state);
    try {
      const response = await axios.post(`${SERVER_URL}/register`, this.state)
      localStorage.setItem('mernToken', response.data.token);
      this.setState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
      });
      console.log('make a call to update user')
      this.props.updateUser();
    }
    catch(err) {
      console.error(err);
    }
  }

  render() {
    return (
      <form className="form" onSubmit={this.submitForm}>
        <h2>Register</h2>
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          onChange={ e => { this.setState({ name: e.target.value }) } }
          value={this.state.name}
        />
        <label htmlFor="email">Email</label>
        <input 
          type="text" 
          id="email" 
          onChange={ e => { this.setState({ email: e.target.value }) } }
          value={this.state.email}
        />
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          onChange={ e => { this.setState({ password: e.target.value }) } }
          value={this.state.password}
        />
        <label htmlFor="password-confirm">Confirm Password</label>
        <input 
          type="password" 
          id="password-confirm" 
          onChange={ e => { this.setState({ passwordConfirm: e.target.value }) } }
          value={this.state.passwordConfirm}
        />
        <input 
          className="button"
          type="submit"
          value="Register Now"
        />
      </form>
    )
  }
}
