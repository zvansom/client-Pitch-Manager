import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav>
        <div className="nav__section nav__section--pages">
          <NavLink activeClassName="active" exact to="/">Home</NavLink>
        </div>
        <div className="nav__section nav__section--user">
          <NavLink activeClassName="active" to="/register">Register</NavLink>
          <NavLink activeClassName="active" to="/login">Login</NavLink>
        </div>
      </nav>
    )
  }
}
