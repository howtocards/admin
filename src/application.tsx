import * as React from 'react';
import { Normalize } from 'styled-normalize';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { Switch, Route } from 'react-router';

import 'antd/dist/antd.min.css';
import './styles/common.css';

import { compileRoutes, protectRoutes } from 'lib/routing';
import { GenericTemplate } from 'ui';
import {
  useSessionFetch,
  useSessionWaiting,
  useSession,
  AuthHeader,
} from 'features/session';
import { ROUTES } from 'pages/routes';

export const history = createBrowserHistory();

const navPages = ['users', 'cards'];

const navLinks = navPages.map(page => {
  return {
    path: ROUTES[page].path || page,
    name: ROUTES[page].name || page,
  };
});

export const App: React.FC = () => {
  useSessionFetch();

  const isWaiting = useSessionWaiting();

  const session = useSession();

  const routes = React.useMemo(() => {
    const compiled = compileRoutes(ROUTES);
    return protectRoutes(compiled, { session });
  }, [session]);

  return (
    <Router history={history}>
      <>
        <Normalize />
        <GenericTemplate header={<AuthHeader links={navLinks} />}>
          {isWaiting ? null : (
            <Switch>
              {routes.map(route => (
                <Route key={route.name} {...route} />
              ))}
            </Switch>
          )}
        </GenericTemplate>
      </>
    </Router>
  );
};
