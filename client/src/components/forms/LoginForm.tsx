import React, {
  useReducer,
  useCallback,
  ChangeEvent,
  SyntheticEvent,
  useContext,
} from 'react';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { TextInput } from './inputs';
import { TextInputType } from './inputs/types';
import { SignUpActionTypes } from './SignUpForm';
import { Action } from './types';
import { SizeType } from './inputs/TextInput';
import { LOGIN } from '../../apollo/mutations';
import { ErrorContext } from '../../contexts';

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
    justifyContent: 'space-evenly',
    height: '320px',
  },
  button: {
    backgroundColor: '#EA2026',
    height: '48px',
  },
});

const LoginForm: React.FC<unknown> = () => {
  const [{ usernameOrEmail, password }, dispatch] = useReducer(
    loginReducer,
    initialState
  );
  const [login, { data }] = useMutation(LOGIN, {
    onError: (e) => {
      if (e.graphQLErrors.length) {
        setErrors(['Invalid Login']);
      }
    },
  });
  const { setErrors } = useContext(ErrorContext);

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

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const res = await login({
      variables: {
        usernameOrEmail,
        password,
      },
    });

    console.log(res);
  };

  const { form, button } = useStyles();

  return (
    <form className={form} onSubmit={onSubmit}>
      <TextInput
        state={usernameOrEmail}
        onChange={onTextChange}
        actionType={LoginActionTypes.SET_USERNAME_OR_EMAIL}
        type={TextInputType.Username}
        size={SizeType.Medium}
      />
      <TextInput
        state={password}
        onChange={onTextChange}
        actionType={LoginActionTypes.SET_PASSWORD}
        type={TextInputType.Password}
        size={SizeType.Medium}
      />
      <Button
        className={button}
        type="submit"
        variant="contained"
        color="secondary"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
