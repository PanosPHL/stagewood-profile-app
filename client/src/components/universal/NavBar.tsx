import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core';

const Navbar: React.FC<unknown> = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="primary">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
