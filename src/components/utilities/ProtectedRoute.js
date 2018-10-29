import React from 'react';
import {
  Route,
  Redirect,
} from "react-router-dom";
import PropTypes from 'prop-types';

export const ProtectedRoute = ({component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to="/login"
        />
      )
    }
  />
);

ProtectedRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
}