import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

import { AuthButton, } from './utilities/AuthButton';

import "../styles/Navbar.css";

export default class Navbar extends Component {
  siteNav() {
    if(this.props.authenticated){ 
      return(
        <>
          <NavLink 
            className="nav__link" 
            activeClassName="nav__link--active" 
            to="/pitch/new"
          >
            Add a Pitch
          </NavLink>
          <NavLink 
            className="nav__link" 
            activeClassName="nav__link--active" 
            to="/pitches"
          >
            My Pitches
          </NavLink>
        </>
      );
    }
  }

  handleLogout = () => {
    localStorage.removeItem('mernToken');
    this.props.updateUser();
  }

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
          {this.siteNav()}
        </div> 
        <div className="nav__section nav__section--user">        
          {!this.props.authenticated &&
            <NavLink 
              className="nav__link" 
              activeClassName="nav__link--active" 
              to="/register"
            >
              Register
            </NavLink>
          }
          <AuthButton 
            logout={this.handleLogout}
            authenticated={this.props.authenticated}
          />
        </div> 
      </nav>
    )
  }
}
