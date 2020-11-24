import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./../contexts/AuthContext";
import { PropTypes } from "prop-types";
/**
 * private routs checks if current user exists then renders
 * accordingly
 * @property {Function}
 * @param {PropTypes} props
 */
function PrivateRoute({ component: Component, ...rest }) {
  /**
   * loading current user from auth context
   */
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}
PrivateRoute.propTypes = {
  Component: PropTypes.element,
};
export default PrivateRoute;
