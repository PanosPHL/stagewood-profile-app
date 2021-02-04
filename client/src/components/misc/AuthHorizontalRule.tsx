import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    width: '100%',
    margin: theme.spacing(2, 0),
  },
  or: {
    position: 'absolute',
    backgroundColor: 'white',
    top: '-10px',
    left: '44.5%',
    height: '20px',
    width: '40px',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 2,
  },
}));

const AuthHorizontalRule: React.FC<unknown> = () => {
  const { container, or } = useStyles();

  return (
    <div className={container}>
      <hr />
      <Typography variant="body2" className={or}>
        or
      </Typography>
    </div>
  );
};

export default AuthHorizontalRule;
