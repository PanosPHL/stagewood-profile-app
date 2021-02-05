import React, { SetStateAction, useState, Dispatch } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ErrorArray } from '../../contexts/ErrorContext';

const Transition = React.forwardRef<JSX.Element, SlideProps>((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface ErrorModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  errors: ErrorArray;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ open, setOpen, errors }) => {
  const handleClose = () => setOpen(false);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="error-modal-slide-title"
      aria-describedby="error-modal-slide-description"
    >
      <DialogTitle id="error-modal-slide-title">Errors</DialogTitle>
      <DialogContent>
        <DialogContentText id="error-modal-slide-description">
          <List>
            {errors.map((error, i) => {
              if (error) {
                const errorKey = Object.keys(error)[0];
                return (
                  <ListItem key={`error-${i + 1}`}>
                    <ListItemText
                      primaryTypographyProps={{ color: 'error' }}
                      primary={`${errorKey}: ${error ? error[errorKey] : ''}`}
                    />
                  </ListItem>
                );
              }
            })}
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
