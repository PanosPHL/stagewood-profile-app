import React from 'react';
import Paper from '@material-ui/core/Paper';
import { LoginForm } from '../forms';

const Login: React.FC<unknown> = (props) => {
  return (
    <div>
      <Paper elevation={2}>
        <LoginForm />
      </Paper>
    </div>
  );
};

export default Login;
