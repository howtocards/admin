import { onlyAnon, onlyUsers } from 'features/session';

import { SimpleRoute } from 'lib/routing';
import { LoginPage } from './login';
import { UsersPage } from './users';
import { CardsPage } from './cards';
import { CardPage } from './cards/card';

type RoutesProps<T> = {
  [key: string]: SimpleRoute<T>;
};

export const ROUTES: RoutesProps<any> = {
  users: {
    path: '/',
    name: 'Users',
    exact: true,
    component: UsersPage,
    guards: [onlyUsers()],
  },
  cards: {
    path: '/cards',
    name: 'Cards',
    exact: true,
    component: CardsPage,
    guards: [onlyUsers()],
  },
  card: {
    path: '/cards/:id',
    exact: true,
    component: CardPage,
    guards: [onlyUsers()],
  },
  login: {
    path: '/',
    exact: true,
    component: LoginPage,
    guards: [onlyAnon()],
  },
};
