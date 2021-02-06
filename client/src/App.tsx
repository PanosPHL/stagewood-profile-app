import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthRoute, LoadingScreen } from './components/universal';
import { AuthPageType } from './components/pages/Auth';
import theme from './theme';
import { ErrorContext } from './contexts/';
import { ErrorContextState, ErrorArray } from './contexts/ErrorContext';
import { ErrorModal } from './components/modals';
import './index.css';

const Home = lazy(() => import('./components/pages/Home'));
const Auth = lazy(() => import('./components/pages/Auth'));

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  profilePicture: string;
}

const initialUser: User = {
  id: 0,
  username: '',
  email: '',
  name: '',
  profilePicture: 'string',
};

function App() {
  const [errors, setErrors] = useState<ErrorArray>([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User>(initialUser);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(initialUser);
  }, []);

  const value: ErrorContextState = {
    errors,
    setErrors,
  };

  useEffect(() => {
    if (!open && errors.length) {
      setOpen(true);
    }
  }, [errors.length]);

  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  }, []);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <ErrorContext.Provider value={value}>
          <ErrorModal
            open={open}
            setOpen={setOpen}
            errors={errors}
            setErrors={setErrors}
          />
          <Router>
            <Suspense fallback={<LoadingScreen />}>
              <Switch>
                <Route
                  exact
                  path="/login"
                  render={() => (
                    <Auth pageType={AuthPageType.Login} setUser={setUser} />
                  )}
                />
                <Route
                  exact
                  path="/signup"
                  render={() => (
                    <Auth pageType={AuthPageType.SignUp} setUser={setUser} />
                  )}
                />
                <AuthRoute
                  path="/"
                  render={() => (
                    <Home user={user} handleLogout={handleLogout} />
                  )}
                  userId={user.id}
                />
              </Switch>
            </Suspense>
          </Router>
        </ErrorContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
