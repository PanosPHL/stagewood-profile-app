import { createContext, Dispatch, SetStateAction } from 'react';

type AuthError = {
  [field: string]: string;
};

export type ErrorArray = Array<AuthError | undefined>;

export interface ErrorContextState {
  errors: ErrorArray;
  setErrors: (() => void) | Dispatch<SetStateAction<ErrorArray>>;
}

const ErrorContext = createContext<ErrorContextState>({
  errors: [],
  setErrors: () => null,
});

export default ErrorContext;
