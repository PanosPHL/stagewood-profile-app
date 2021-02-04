import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { SignUpForm } from '../forms';
import logo from '../../assets/stagewood_consortium_logo.png';

const Auth: React.FC<unknown> = (props) => {
  return (
    <section>
      <Paper elevation={2}>
        <img src={logo} alt="Stagewood Consortium" />
        <Typography variant="h3" component="h1">
          Stagewood Consortium
        </Typography>
        <Typography variant="subtitle1">Dream. Express. Produce.</Typography>
        <SignUpForm />
        <Typography variant="body2">Have an account?</Typography>
        <Link to="/login">
          <Typography variant="body2">Sign In</Typography>
        </Link>
      </Paper>
    </section>
  );
};

export default Auth;
