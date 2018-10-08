import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

import "../styles/Navbar.css";

export default class Navbar extends Component {
  handleLogout = e => {
    console.log('logging out...');
    e.preventDefault();
    localStorage.removeItem('mernToken');
    this.props.updateUser();
  }

  userNav() {
    if(!this.props.user){
      return(
        <div className="nav__section nav__section--user">        
          <NavLink 
            className="nav__link" 
            activeClassName="nav__link--active" 
            to="/register">
            Register
          </NavLink>
          <NavLink 
            className="nav__link" 
            activeClassName="nav__link--active" 
            to="/login">
            Login
          </NavLink>
        </div>        
      )
    } else {
      return(
        <button className="nav__link" onClick={this.handleLogout}>
          Logout
        </button>
      )
    }
  }

  render() {
    return (
      <nav className="nav">
        <div className="nav__section nav__section--pages">
          <NavLink 
            className="nav__link" 
            activeClassName="nav__link--active" 
            exact to="/">
            Home
          </NavLink>
        </div>
        {this.userNav()}
      </nav>
    )
  }
}
