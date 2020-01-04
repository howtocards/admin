import * as React from 'react';
import { Normalize } from 'styled-normalize';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

import 'antd/dist/antd.min.css';
import './styles/common.css';

import {
  useSessionFetch,
  useSessionWaiting,
  AuthHeader,
} from 'features/session';

import { GenericTemplate } from 'ui';

import { Switch, Route } from 'react-router';

import { useSession } from 'features/session';
import { compileRoutes, protectRoutes } from 'lib/routing';

import { ROUTES } from 'pages/routes';

export const history = createBrowserHistory();

export const App: React.FC = () => {
  useSessionFetch();
  const isWaiting = useSessionWaiting();

  const session = useSession();

  const routes = React.useMemo(() => {
    const compiled = compileRoutes(ROUTES);
    return protectRoutes(compiled, { session });
  }, [session]);

  const headerLinks = React.useMemo(() => {
    return routes.map(({ path, name }: any) => ({
      path,
      name,
    }));
  }, [routes]);

  return (
    <Router history={history}>
      <>
        <Normalize />
        <GenericTemplate header={<AuthHeader links={headerLinks} />}>
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
