import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

import "../Navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="nav">
        <div className="nav__section nav__section--pages">
          <NavLink 
            className="nav__link" 
            activeClassName="nav__link--active" 
            exact to="/"
          >
            Home
          </NavLink>
        </div>
        <div className="nav__section nav__section--user">
          <NavLink 
            className="nav__link" 
            activeClassName="nav__link--active" 
            to="/register"
          >
            Register
          </NavLink>
          <NavLink 
            className="nav__link" 
            activeClassName="nav__link--active" 
            to="/login"
          >
            Login
          </NavLink>
        </div>
      </nav>
    )
  }
}
