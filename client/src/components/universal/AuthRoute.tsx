import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

interface AuthRouteProps {
  userId: number | null;
  path: string;
  component: React.FC<any>;
}

const AuthRoute = ({ userId, path, component }: AuthRouteProps) => {
  if (!userId) {
    return <Redirect exact to="/login" />;
  } else {
    return <Route path={path} component={component} />;
  }
};

AuthRoute.propTypes = {
  userId: PropTypes.number,
  path: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
};

export default AuthRoute;
