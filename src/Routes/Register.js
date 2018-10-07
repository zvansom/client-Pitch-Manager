import React, { Component } from 'react'

export default class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }

  submitForm = e => {
    e.preventDefault();

  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
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
        <button>Register</button>
      </form>
    )
  }
}
