import React from 'react';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  bg: {
    backgroundColor: '#ef5350',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 10),
  },
}));

interface NavbarProps {
  handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleLogout }) => {
  const { bg, toolbar } = useStyles();
  return (
    <AppBar position="static" color="secondary" className={bg}>
      <Toolbar className={toolbar}>
        <Button
          onClick={() => handleLogout()}
          style={{ color: 'white' }}
          color="primary"
          variant="outlined"
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
