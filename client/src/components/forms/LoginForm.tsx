import React, { useReducer, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import { TextInput } from './inputs';
import { TextInputType } from './inputs/types';

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

export enum LoginActionTypes {
  SET_USERNAME = 'LoginForm/SET_USERNAME',
  SET_EMAIL = 'LoginForm/SET_EMAIL',
  SET_NAME = 'LoginForm/SET_NAME',
  SET_PASSWORD = 'LoginForm/SET_PASSWORD',
  SET_PROFILE_PICTURE = 'LoginForm/SET_PROFILE_PICTURE',
}

type Action = {
  type: LoginActionTypes;
  payload: string;
  file?: File;
};

function loginReducer(state: LoginFormState, action: Action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case LoginActionTypes.SET_USERNAME:
      newState.username = action.payload;
      return newState;
    case LoginActionTypes.SET_EMAIL:
      newState.email = action.payload;
      return newState;
    case LoginActionTypes.SET_NAME:
      newState.name = action.payload;
      return newState;
    case LoginActionTypes.SET_PASSWORD:
      newState.password = action.payload;
      return newState;
    case LoginActionTypes.SET_PROFILE_PICTURE:
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
  },
}));

export const LoginForm: React.FC<unknown> = () => {
  const [
    { username, email, name, password, profilePicture },
    dispatch,
  ] = useReducer(loginReducer, initialState);

  const onTextChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      type: LoginActionTypes
    ) => {
      console.log('hit');
      dispatch({
        type: type,
        payload: e.currentTarget.value,
      });
    },
    [username, email, name, password]
  );

  const { form } = useStyles();

  return (
    <form className={form}>
      <TextInput
        state={username}
        onChange={onTextChange}
        type={TextInputType.Username}
        actionType={LoginActionTypes.SET_USERNAME}
      />
      <TextInput
        state={email}
        onChange={onTextChange}
        type={TextInputType.Email}
        actionType={LoginActionTypes.SET_EMAIL}
      />
      <TextInput
        state={name}
        onChange={onTextChange}
        type={TextInputType.Name}
        actionType={LoginActionTypes.SET_NAME}
      />
      <TextInput
        state={password}
        onChange={onTextChange}
        type={TextInputType.Password}
        actionType={LoginActionTypes.SET_PASSWORD}
      />
    </form>
  );
};

export default LoginForm;
