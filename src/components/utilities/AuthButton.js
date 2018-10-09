import React from "react";
import {
  withRouter,
  NavLink,
} from "react-router-dom";

export const AuthButton = withRouter(({ history, logout, authenticated }) => {
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