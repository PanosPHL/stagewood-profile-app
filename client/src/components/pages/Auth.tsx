import React, { Dispatch, SetStateAction } from 'react';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { SignUpForm, LoginForm } from '../forms';
import { DemoUserButton } from '../buttons';
import { AuthHorizontalRule } from '../misc';
import { User } from '../../App';
import logo from '../../assets/stagewood_consortium_logo.png';
import logoText from '../../assets/stagewood_consortium_text.png';
import PatternBackground, { PageType } from '../universal/PatternBackground';

export enum AuthPageType {
  Login = 'login',
  SignUp = 'signup',
}

export interface AuthFormProps {
  setUser: Dispatch<SetStateAction<User>>;
}

interface AuthProps extends AuthFormProps {
  pageType: AuthPageType;
}

const useStyles = makeStyles((theme) => ({
  formCard: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '512px',
    height: '672px',
    padding: theme.spacing(3, 7, 0),
    [theme.breakpoints.down('xs')]: {
      height: '100vh',
      width: '100vw',
    },
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardHeader: {
    height: '28%',
    justifyContent: 'space-between',
  },
  cardContent: {
    width: '100%',
  },
  cardFooter: {
    marginTop: '4%',
    marginBottom: '2%',
  },
  logoStyle: {
    width: '56px',
  },
  logoTextStyle: {
    width: '228px',
  },
  subheaderText: {
    color: '#555555',
    fontWeight: 'normal',
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.dark,
    },
  },
}));

const Auth: React.FC<AuthProps> = ({ pageType, setUser }) => {
  const {
    formCard,
    logoStyle,
    logoTextStyle,
    link,
    flexColumn,
    cardHeader,
    cardContent,
    cardFooter,
    subheaderText,
  } = useStyles();

  return (
    <PatternBackground pageType={PageType.Auth}>
      <Paper variant="outlined" elevation={3} className={formCard}>
        <div className={`${flexColumn} ${cardHeader}`}>
          <img className={logoStyle} src={logo} alt="Stagewood Consortium" />
          <img
            className={logoTextStyle}
            src={logoText}
            alt="StageWood Consortium Inc."
          />
          <Typography
            className={subheaderText}
            align="center"
            variant="subtitle1"
          >
            Dream. Express. Produce.
          </Typography>
        </div>
        <div className={`${flexColumn} ${cardContent}`}>
          <DemoUserButton setUser={setUser} />
          <AuthHorizontalRule />
          {pageType === AuthPageType.SignUp ? (
            <>
              <SignUpForm setUser={setUser} />
              <div className={`${flexColumn} ${cardFooter}`}>
                <Typography className={subheaderText} variant="body2">
                  Have an account?
                </Typography>
                <Link className={link} to="/login">
                  <Typography variant="body2">Sign In</Typography>
                </Link>
              </div>
            </>
          ) : (
            <>
              <LoginForm setUser={setUser} />
              <div className={`${flexColumn} ${cardFooter}`}>
                <Typography className={subheaderText} variant="body2">
                  Need an account?
                </Typography>
                <Link className={link} to="/signup">
                  <Typography variant="body2">Sign Up</Typography>
                </Link>
              </div>
            </>
          )}
        </div>
      </Paper>
    </PatternBackground>
  );
};

export default Auth;
