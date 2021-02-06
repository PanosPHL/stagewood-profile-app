import React from 'react';
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

export default AuthRoute;
