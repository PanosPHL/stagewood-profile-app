import React from 'react';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Navbar } from '../universal';
import { User } from '../../App';
import { Typography } from '@material-ui/core';
import PatternBackground, { PageType } from '../universal/PatternBackground';
import partyBG from '../../assets/party-bg.jpg';

interface HomeProps {
  user: User;
  handleLogout: () => void;
}

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    height: '100%',
  },
  profile: {
    width: '40%',
    height: '80%',
    borderRadius: '8px',
    margin: theme.spacing(7, 'auto'),
    [theme.breakpoints.down('lg')]: {
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: '0',
    },
  },
  partyBackground: {
    height: '30%',
    background: `linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),url(${partyBG})`,
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    padding: theme.spacing(4, 4, 0),
    display: 'flex',
    justifyContent: 'center',
  },
  outerImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '290px',
    width: '290px',
    borderRadius: '50%',
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '50%',
    height: '260px',
    width: '260px',
    overflow: 'hidden',
    border: '1px solid rgba(0, 0, 0, 0.15)',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  outerTextContainer: {
    margin: theme.spacing(4, 0, 0),
    padding: theme.spacing(8, 4),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '50%',
    [theme.breakpoints.between('sm', 'md')]: {
      margin: theme.spacing(8, 0, 0),
      height: '56%',
    },
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 300,
    color: '#969696',
    margin: theme.spacing(2, 0, 1),
    [theme.breakpoints.down('sm')]: {
      visibility: 'hidden',
      margin: theme.spacing(0),
    },
  },
}));

const Home: React.FC<HomeProps> = ({
  user: { id, username, email, name, profilePicture },
  handleLogout,
}) => {
  const {
    main,
    profile,
    outerImageContainer,
    imageContainer,
    image,
    partyBackground,
    textContainer,
    label,
    outerTextContainer,
  } = useStyles();
  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      <PatternBackground pageType={PageType.Home}>
        <main className={main}>
          <Paper elevation={4} className={profile}>
            <div className={partyBackground}>
              <Paper elevation={6} className={outerImageContainer}>
                <div className={imageContainer}>
                  <div
                    className={image}
                    style={{
                      backgroundImage: `url(${profilePicture})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                </div>
              </Paper>
            </div>
            <div className={outerTextContainer}>
              <div className={textContainer}>
                <div>
                  <Typography variant="h3" className={label}>
                    Name:{' '}
                  </Typography>
                  <Typography variant="h3">{name}</Typography>
                </div>
                <div>
                  <Typography variant="h3" className={label}>
                    Username:{' '}
                  </Typography>
                  <Typography variant="h3">{username}</Typography>
                </div>
                <div>
                  <Typography variant="h3" className={label}>
                    Email:{' '}
                  </Typography>
                  <Typography variant="h3">{email}</Typography>
                </div>
              </div>
            </div>
          </Paper>
        </main>
      </PatternBackground>
    </div>
  );
};

export default Home;
