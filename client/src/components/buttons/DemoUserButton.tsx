import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { LOGIN } from '../../apollo/mutations';
import { AuthFormProps } from '../pages/Auth';

const useStyles = makeStyles(() => ({
  button: {
    width: '100%',
    marginTop: '4%',
    height: '32px',
  },
}));

const DemoUserButton: React.FC<AuthFormProps> = ({ setUser }) => {
  const history = useHistory();
  const [login, { data }] = useMutation(LOGIN);
  const demoLogin = async () => {
    const res = await login({
      variables: {
        usernameOrEmail: 'PanosPHL',
        password: 'password',
      },
    });

    if (res.data) {
      localStorage.setItem('token', res.data.login.token);
      const { __typename, ...user } = res.data.login.user;
      setUser(user);
      history.push('/');
    }
  };

  const { button } = useStyles();

  return (
    <Button
      onClick={() => demoLogin()}
      className={button}
      type="button"
      variant="contained"
      size="small"
    >
      Continue as Demo User
    </Button>
  );
};

export default DemoUserButton;
