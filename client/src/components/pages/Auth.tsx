import React from 'react';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { SignUpForm, LoginForm } from '../forms';
import { DemoUserButton } from '../buttons';
import { AuthHorizontalRule } from '../misc';
import logo from '../../assets/stagewood_consortium_logo.png';
import logoText from '../../assets/stagewood_consortium_text.png';
import background from '../../assets/bg-pattern-tile.svg';

export enum AuthPageType {
  Login = 'login',
  SignUp = 'signup',
}

interface AuthProps {
  pageType: AuthPageType;
}

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${background})`,
    backgroundPositionX: '200px',
    backgroundSize: '1000px',
  },
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
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
    fontWeight: 'lighter',
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.dark,
    },
  },
}));

const Auth: React.FC<AuthProps> = ({ pageType }) => {
  const {
    background,
    container,
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
    <div className={background}>
      <section className={container}>
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
            <DemoUserButton />
            <AuthHorizontalRule />
            {pageType === AuthPageType.SignUp ? (
              <>
                <SignUpForm />
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
                <LoginForm />
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
      </section>
    </div>
  );
};

export default Auth;
