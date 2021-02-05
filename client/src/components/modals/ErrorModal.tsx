import React, { SetStateAction, useState, Dispatch } from 'react';
import { makeStyles } from '@material-ui/core';
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
  setErrors: Dispatch<SetStateAction<ErrorArray>>;
}

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    fontSize: '2.4rem',
    fontFamily: 'Roboto',
  },
  content: {
    margin: theme.spacing(0, 'auto'),
  },
}));

const ErrorModal: React.FC<ErrorModalProps> = ({
  open,
  setOpen,
  errors,
  setErrors,
}) => {
  const handleClose = () => {
    setOpen(false);
    setErrors([]);
  };

  const { title, content } = useStyles();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="error-modal-slide-title"
      aria-describedby="error-modal-slide-description"
      fullWidth={true}
    >
      <DialogTitle
        classes={{
          root: title,
        }}
        id="error-modal-slide-title"
        disableTypography={true}
      >
        Errors
      </DialogTitle>
      <DialogContent className={content} id="error-modal-slide-list">
        <List>
          {errors.map((error, i) => {
            if (typeof error === 'string') {
              return (
                <ListItem key={`error-${i + 1}`}>
                  <ListItemText
                    primaryTypographyProps={{
                      color: 'error',
                      variant: errors.length > 1 ? 'body2' : 'h6',
                    }}
                    primary={`${error}`}
                  />
                </ListItem>
              );
            } else if (error) {
              const errorKey = Object.keys(error)[0];
              return (
                <ListItem key={`error-${i + 1}`}>
                  <ListItemText
                    primaryTypographyProps={{
                      color: 'error',
                      variant: errors.length > 1 ? 'body2' : 'h6',
                    }}
                    primary={`${errorKey}: ${error ? error[errorKey] : ''}`}
                  />
                </ListItem>
              );
            }
          })}
        </List>
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
