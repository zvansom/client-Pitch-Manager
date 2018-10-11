import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Pitch Manager</h1>
        <h2>Sign up for an account</h2>
        <a className="button" href="/register">Sign up</a>
        <a className="button" href="/login">Login</a>
      </div>
    )
  }
}
