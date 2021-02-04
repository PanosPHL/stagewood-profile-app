import { LoginActionTypes } from './LoginForm';
import { SignUpActionTypes } from './SignUpForm';

export type Action = {
  type: LoginActionTypes | SignUpActionTypes;
  payload: string;
  file?: File;
};
