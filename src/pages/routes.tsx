import { onlyAnon } from 'features/session';

import { LoginPage } from './login';

export const ROUTES = {
  login: {
    path: '/',
    exact: true,
    component: LoginPage,
    guards: [onlyAnon()],
  },
};
