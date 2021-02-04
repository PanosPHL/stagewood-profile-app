import React, { useReducer, useCallback, SyntheticEvent } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { TextInput, FileInput } from './inputs';
import { TextInputType } from './inputs/types';
import { Action } from './types';
import { LoginActionTypes } from './LoginForm';

type LoginFormState = {
  username: string;
  email: string;
  name: string;
  password: string;
  profilePicture: File | undefined;
};

const initialState: LoginFormState = {
  username: '',
  email: '',
  name: '',
  password: '',
  profilePicture: undefined,
};

export enum SignUpActionTypes {
  SET_USERNAME = 'SignUpForm/SET_USERNAME',
  SET_EMAIL = 'SignUpForm/SET_EMAIL',
  SET_NAME = 'SignUpForm/SET_NAME',
  SET_PASSWORD = 'SignUpForm/SET_PASSWORD',
  SET_PROFILE_PICTURE = 'SignUpForm/SET_PROFILE_PICTURE',
}

export type SignUpAction = {
  type: SignUpActionTypes;
  payload: string;
  file?: File;
};

function signupReducer(state: LoginFormState, action: Action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SignUpActionTypes.SET_USERNAME:
      newState.username = action.payload;
      return newState;
    case SignUpActionTypes.SET_EMAIL:
      newState.email = action.payload;
      return newState;
    case SignUpActionTypes.SET_NAME:
      newState.name = action.payload;
      return newState;
    case SignUpActionTypes.SET_PASSWORD:
      newState.password = action.payload;
      return newState;
    case SignUpActionTypes.SET_PROFILE_PICTURE:
      newState.profilePicture = action.file;
      return newState;
    default:
      return state;
  }
}

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '320px',
  },
  button: {
    width: '100%',
    height: '32px',
  },
}));

export const SignUpForm: React.FC<unknown> = () => {
  const [
    { username, email, name, password, profilePicture },
    dispatch,
  ] = useReducer(signupReducer, initialState);

  const onTextChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      type: SignUpActionTypes | LoginActionTypes
    ) => {
      dispatch({
        type: type,
        payload: e.currentTarget.value,
      });
    },
    []
  );

  const onFileChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      type: SignUpActionTypes | LoginActionTypes
    ) => {
      const file = e.currentTarget.files ? e.currentTarget.files[0] : undefined;
      console.log('hit');
      console.log(file);
      dispatch({ type, file, payload: '' });
    },
    []
  );

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const { form, button } = useStyles();

  return (
    <form onSubmit={onSubmit} className={form}>
      <TextInput
        state={username}
        onChange={onTextChange}
        type={TextInputType.Username}
        actionType={SignUpActionTypes.SET_USERNAME}
      />
      <TextInput
        state={email}
        onChange={onTextChange}
        type={TextInputType.Email}
        actionType={SignUpActionTypes.SET_EMAIL}
      />
      <TextInput
        state={name}
        onChange={onTextChange}
        type={TextInputType.Name}
        actionType={SignUpActionTypes.SET_NAME}
      />
      <TextInput
        state={password}
        onChange={onTextChange}
        type={TextInputType.Password}
        actionType={SignUpActionTypes.SET_PASSWORD}
      />
      <FileInput
        file={profilePicture}
        onChange={onFileChange}
        actionType={SignUpActionTypes.SET_PROFILE_PICTURE}
      />
      <Button
        className={button}
        type="submit"
        variant="contained"
        color="secondary"
        size="small"
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
