import { createContext, Dispatch, SetStateAction } from 'react';

type SignUpError = {
  [field: string]: string;
};

export type ErrorArray = Array<SignUpError | string | undefined>;

export interface ErrorContextState {
  errors: ErrorArray;
  setErrors: (() => void) | Dispatch<SetStateAction<ErrorArray>>;
}

const ErrorContext = createContext<ErrorContextState>({
  errors: [],
  setErrors: () => null,
});

export default ErrorContext;
