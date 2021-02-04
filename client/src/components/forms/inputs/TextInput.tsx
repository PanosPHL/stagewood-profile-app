import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { LoginActionTypes } from '../LoginForm';

export enum TextInputType {
  Username = 'username',
  Email = 'email',
  Name = 'name',
  Password = 'password',
}

interface TextInputProps {
  state: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: LoginActionTypes
  ) => void;
  actionType: LoginActionTypes;
  type: TextInputType;
}

const getLabel = (type: string) => {
  return type[0].toUpperCase() + type.slice(1);
};

const TextInput: React.FC<TextInputProps> = ({
  state,
  onChange,
  type,
  actionType,
}) => {
  let inputType: string = '';

  if (type === TextInputType.Password || type === TextInputType.Email) {
    inputType = type;
  } else {
    inputType = 'text';
  }

  return (
    <TextField
      value={state}
      onChange={(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => onChange(e, actionType)}
      type={inputType}
      label={getLabel(type)}
      variant="outlined"
    />
  );
};

TextInput.propTypes = {
  state: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.values(TextInputType)).isRequired,
};

export default TextInput;
