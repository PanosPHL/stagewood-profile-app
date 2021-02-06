import React, {
  useReducer,
  useCallback,
  SyntheticEvent,
  useContext,
} from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { TextInput, FileInput } from './inputs';
import { TextInputType } from './inputs/types';
import { Action } from './types';
import { LoginActionTypes } from './LoginForm';
import { SizeType } from './inputs/TextInput';
import { SIGN_UP } from '../../apollo/mutations';
import { toBase64 } from '../../util';
import { ErrorContext } from '../../contexts';
import { AuthFormProps } from '../pages/Auth';

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

export const SignUpForm: React.FC<AuthFormProps> = ({ setUser }) => {
  const [
    { username, email, name, password, profilePicture },
    dispatch,
  ] = useReducer(signupReducer, initialState);
  const [signUp, { data }] = useMutation(SIGN_UP, {
    onError: (e) => {
      if (e.graphQLErrors.length) {
        const valErrors = e.graphQLErrors[0];
        if (valErrors.extensions && valErrors.extensions.validationErrors) {
          setErrors(valErrors.extensions.validationErrors);
          return;
        }
      }
    },
  });
  const { setErrors } = useContext(ErrorContext);
  const history = useHistory();

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
      dispatch({ type, file, payload: '' });
    },
    []
  );

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let base64;
    try {
      base64 = await toBase64(profilePicture);
    } catch (e) {
      let message = e.message;
      setErrors([{ Picture: message }]);
      return;
    }
    try {
      const res = await signUp({
        variables: {
          input: {
            username,
            email,
            name,
            password,
            profilePicture: base64,
          },
        },
      });

      if (res.data) {
        localStorage.setItem('token', res.data.signup.token);
        const { __typename, ...user } = res.data.signup.user;
        setUser(user);
        history.push('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const { form, button } = useStyles();

  return (
    <form onSubmit={onSubmit} className={form}>
      <TextInput
        state={username}
        onChange={onTextChange}
        type={TextInputType.Username}
        actionType={SignUpActionTypes.SET_USERNAME}
        size={SizeType.Small}
      />
      <TextInput
        state={email}
        onChange={onTextChange}
        type={TextInputType.Email}
        actionType={SignUpActionTypes.SET_EMAIL}
        size={SizeType.Small}
      />
      <TextInput
        state={name}
        onChange={onTextChange}
        type={TextInputType.Name}
        actionType={SignUpActionTypes.SET_NAME}
        size={SizeType.Small}
      />
      <TextInput
        state={password}
        onChange={onTextChange}
        type={TextInputType.Password}
        actionType={SignUpActionTypes.SET_PASSWORD}
        size={SizeType.Small}
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
