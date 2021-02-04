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

const useStyles = makeStyles(() => ({
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    color: '#555555',
  },
  fileText: {
    marginLeft: '14px',
  },
}));

const FileInput: React.FC<FileInputProps> = ({
  file,
  onChange,
  actionType,
}) => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const { inputContainer, fileText } = useStyles();
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
        onClick={() => {
          if (fileInput.current) {
            fileInput.current.click();
          }
        }}
        startIcon={<CloudUploadIcon />}
      >
        <Typography variant="body2">Upload Profile Picture</Typography>
      </Button>
      <Typography className={fileText} variant="body1" noWrap={true}>
        {file ? file.name : 'No file selected'}
      </Typography>
    </div>
  );
};

export default FileInput;