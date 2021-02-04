import React, { Suspense, lazy } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthRoute, LoadingScreen } from './components/universal';
import { AuthPageType } from './components/pages/Auth';
import theme from './theme';

const Home = lazy(() => import('./components/pages/Home'));
const Auth = lazy(() => import('./components/pages/Auth'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Switch>
            <Route
              exact
              path="/login"
              render={() => <Auth pageType={AuthPageType.Login} />}
            />
            <Route
              exact
              path="/signup"
              render={() => <Auth pageType={AuthPageType.SignUp} />}
            />
            <AuthRoute path="/" component={Home} userId={null} />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
