import {
  createEvent,
  createEffect,
  createStore,
  sample,
  guard,
  forward,
} from 'effector';

import { getUsersList, UserCard } from 'api/users';

export const pageMounted = createEvent();

const getUsers = createEffect<void, UserCard[]>();

getUsers.use(getUsersList);

export const $usersLits = createStore<UserCard[] | null>(null);

$usersLits.on(getUsers.done, (_, { result }) => result);

forward({ from: pageMounted, to: getUsers });
