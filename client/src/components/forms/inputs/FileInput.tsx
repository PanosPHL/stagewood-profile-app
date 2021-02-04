import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { SignUpActionTypes } from '../SignUpForm';

interface FileInputProps {
  file: File | undefined;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: SignUpActionTypes
  ) => void;
  actionType: SignUpActionTypes;
}

const FileInput: React.FC<FileInputProps> = ({
  file,
  onChange,
  actionType,
}) => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
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
        onClick={() => {
          if (fileInput.current) {
            fileInput.current.click();
          }
        }}
      >
        Click Me
      </Button>
      <Typography variant="body2">
        {file ? file.name : 'No file selected'}
      </Typography>
    </div>
  );
};

export default FileInput;
