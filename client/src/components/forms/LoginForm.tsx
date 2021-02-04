import React, {
  useReducer,
  useCallback,
  ChangeEvent,
  SyntheticEvent,
} from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { TextInput } from './inputs';
import { TextInputType } from './inputs/types';
import { SignUpActionTypes } from './SignUpForm';
import { Action } from './types';

type LoginFormState = {
  usernameOrEmail: string;
  password: string;
};

const initialState: LoginFormState = {
  usernameOrEmail: '',
  password: '',
};

export enum LoginActionTypes {
  SET_USERNAME_OR_EMAIL = 'LoginForm/SET_USERNAME_OR_EMAIL',
  SET_PASSWORD = 'LoginForm/SET_PASSWORD',
}

function loginReducer(state: LoginFormState, { type, payload }: Action) {
  const newState = Object.assign({}, state);
  switch (type) {
    case LoginActionTypes.SET_USERNAME_OR_EMAIL:
      newState.usernameOrEmail = payload;
      return newState;
    case LoginActionTypes.SET_PASSWORD:
      newState.password = payload;
      return newState;
    default:
      return state;
  }
}

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    height: '300px',
  },
  button: {
    backgroundColor: '#EA2026',
  },
});

const LoginForm: React.FC<unknown> = () => {
  const [{ usernameOrEmail, password }, dispatch] = useReducer(
    loginReducer,
    initialState
  );

  const onTextChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      type: LoginActionTypes | SignUpActionTypes
    ) => {
      dispatch({
        type: type,
        payload: e.currentTarget.value,
      });
    },
    []
  );

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const { form, button } = useStyles();

  return (
    <form className={form} onSubmit={onSubmit}>
      <TextInput
        state={usernameOrEmail}
        onChange={onTextChange}
        actionType={LoginActionTypes.SET_USERNAME_OR_EMAIL}
        type={TextInputType.Username}
      />
      <TextInput
        state={password}
        onChange={onTextChange}
        actionType={LoginActionTypes.SET_PASSWORD}
        type={TextInputType.Password}
      />
      <Button
        className={button}
        type="submit"
        variant="contained"
        color="secondary"
        size="small"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
