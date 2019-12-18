import * as React from 'react';
import { renderRoutes } from 'react-router-config';

import { compileGuards, Route } from 'lib/guards';
import { useSession, Session, onlyAuth, onlyAnon } from 'features/session';

import { ErrorNotFound } from './errors/not-found';
import { HomePage } from './home';
import { LoginPage } from './login';

type RouteContext = {
  session: Session | null;
};

const routes: Route<RouteContext>[] = [
  {
    path: '/',
    component: HomePage,
    guards: [onlyAuth({ redirect: '/login' })],
  },
  {
    path: '/login',
    component: LoginPage,
    guards: [onlyAnon({ redirect: '/' })],
  },
  {
    component: ErrorNotFound,
  },
];

export const Pages = () => {
  const session = useSession();

  const result = React.useMemo(
    () => renderRoutes(compileGuards(routes, { session })),
    [session],
  );

  return <>{result}</>;
};
