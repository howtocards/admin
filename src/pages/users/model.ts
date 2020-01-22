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

const getUsersList = createEffect<void, API.UserCard[]>();
export const blockUser = createEffect<number, {}>();

getUsersList.use(API.getUsersList);
blockUser.use(API.blockUser);

export const $usersLits = createStore<API.UserCard[] | null>(null);

$usersLits.on(getUsersList.done, (_, { result }) => result);

forward({ from: pageMounted, to: getUsersList });

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
  name: 'editForm',
  fields: [userNameField, displayNameField, emailField],
});

const editUser = createEffect<API.UserCard, {}>();

editUser.use(API.editUser);

guard({
  source: sample(editForm.$values, submitForm),
  filter: editForm.$isValid,
  target: editUser,
});
