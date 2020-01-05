import {
  createEvent,
  createEffect,
  createStore,
  sample,
  guard,
  forward,
} from 'effector';

import { createForm, createField } from 'lib/forms';

import * as API from 'api/users';

export const pageMounted = createEvent();
export const submitForm = createEvent<React.MouseEvent>();

const getUsers = createEffect<void, API.UserCard[]>();
export const blockUser = createEffect<number, {}>();

getUsers.use(API.getUsersList);
blockUser.use(API.blockUser);

export const $usersLits = createStore<API.UserCard[] | null>(null);

$usersLits.on(getUsers.done, (_, { result }) => result);

forward({ from: pageMounted, to: getUsers });

export const userNameField = createField({
  name: 'userName',
});

export const displayNameField = createField({
  name: 'displayName',
});

export const emailField = createField({
  name: 'emailField',
});

export const editForm = createForm({
  name: 'editorm',
  fields: [userNameField, displayNameField, emailField],
});

const editCard = createEffect<Record<string, string>, {}>();

editCard.use(API.editUserCard as any);

guard({
  source: sample(editForm.$values, submitForm),
  filter: editForm.$isValid,
  target: editCard,
});
