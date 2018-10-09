import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

import AuthButton from './utilities/AuthButton';

import "../styles/Navbar.css";

export default class Navbar extends Component {
  siteNav() {
    if(this.props.user){ 
      return(
        <NavLink 
            className="nav__link" 
            activeClassName="nav__link--active" 
            exact to="/">
            Home
          </NavLink>
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
          {this.siteNav()}
        </div> 
        <div className="nav__section nav__section--user">        
          <NavLink 
            className="nav__link" 
            activeClassName="nav__link--active" 
            to="/register">
            Register
          </NavLink>
          <AuthButton 
            className="nav__link" 
            activeClassName="nav__link--active" 
            to="/login" />
        </div> 
      </nav>
    )
  }
}
