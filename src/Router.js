import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import App from './_app';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'services/firebase';

import routes from './routes';

const Router = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    console.log('there was an error retrieving the user from firebase');
    // maybe sign out
    return;
  }

  return (
    <BrowserRouter>
      <App user={user}>
        <Switch>
          {routes.map((route) => (
            <Route
              exact
              key={route.path}
              path={route.path}
              render={props => (
                <route.component {...props} user={user} />
              )}
            />
          ))}
        </Switch>
      </App>
    </BrowserRouter>
  );
};

export default Router;
