import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { SignUpActionTypes } from '../SignUpForm';

interface FileInputProps {
  file: File | undefined;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: SignUpActionTypes
  ) => void;
  actionType: SignUpActionTypes;
}

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    color: '#555555',
    margin: theme.spacing(0, 'auto'),
  },
  fileText: {
    marginLeft: '14px',
  },
  button: {
    width: '80%',
    minWidth: '240px',
  },
}));

const FileInput: React.FC<FileInputProps> = ({
  file,
  onChange,
  actionType,
}) => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const { inputContainer, fileText, button } = useStyles();
  return (
    <div className={inputContainer}>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e, actionType);
        }}
      />
      <Button
        variant="contained"
        className={button}
        onClick={() => {
          if (fileInput.current) {
            fileInput.current.click();
          }
        }}
        startIcon={<CloudUploadIcon />}
      >
        <Typography variant="body2">Upload Profile Picture</Typography>
      </Button>
      <Typography className={fileText} variant="body2" noWrap={true}>
        {file ? file.name : 'No file selected'}
      </Typography>
    </div>
  );
};

export default FileInput;
