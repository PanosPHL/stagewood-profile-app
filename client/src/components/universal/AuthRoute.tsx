import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

interface AuthRouteProps {
  userId: number | null;
  path: string;
  render: React.FC<any>;
}

const AuthRoute = ({ userId, path, render }: AuthRouteProps) => {
  if (!userId) {
    return <Redirect exact to="/login" />;
  } else {
    return <Route path={path} render={render} />;
  }
};

AuthRoute.propTypes = {
  userId: PropTypes.number,
  path: PropTypes.string.isRequired,
  render: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
};

export default AuthRoute;
