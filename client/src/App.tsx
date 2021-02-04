import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthRoute, LoadingScreen } from './components/universal';

const Home = lazy(() => import('./components/pages/Home'));
const Login = lazy(() => import('./components/pages/Login'));
const SignUp = lazy(() => import('./components/pages/SignUp'));

function App() {
  return (
    <Router>
      <Suspense fallback={LoadingScreen}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <AuthRoute path="/" component={Home} userId={null} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
