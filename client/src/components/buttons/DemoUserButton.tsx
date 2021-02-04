import React from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  button: {
    width: '100%',
    marginTop: '4%',
    height: '32px',
  },
}));

const DemoUserButton: React.FC<unknown> = () => {
  const { button } = useStyles();
  return (
    <Button className={button} type="button" variant="contained" size="small">
      Continue as Demo User
    </Button>
  );
};

export default DemoUserButton;
