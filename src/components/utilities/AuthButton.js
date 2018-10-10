import React from "react";
import {
  withRouter,
  NavLink,
} from "react-router-dom";
import PropTypes from 'prop-types';

export const AuthButton = withRouter(({ logout, authenticated }) => {
  return (  
    authenticated ? (
      <button
        className="nav__link"
        onClick={() => { logout() }}
      >
        Sign out
      </button>
    ) : (
      <NavLink
        to='/login'
        className="nav__link" 
        activeClassName="nav__link--active"
      >
        Login
      </NavLink>
    )
  );
});

AuthButton.propTypes = {
  authenticated: PropTypes.bool,
  logout: PropTypes.func,
}