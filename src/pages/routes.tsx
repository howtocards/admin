import { onlyAnon, onlyUsers } from 'features/session';

import { LoginPage } from './login';
import { UsersPage } from './users';

export const ROUTES = {
  users: {
    path: '/',
    exact: true,
    component: UsersPage,
    guards: [onlyUsers()],
  },
  login: {
    path: '/',
    exact: true,
    component: LoginPage,
    guards: [onlyAnon()],
  },
};
