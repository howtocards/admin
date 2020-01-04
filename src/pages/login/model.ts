import { createEvent, createEffect, sample, guard, forward } from 'effector';

import { createForm, createField } from 'lib/forms';
import { userLogin } from 'api/session';
import { fetchSession } from 'features/session';

export const pageMounted = createEvent();
const login = createEffect<Record<string, string>, {}>();

export const loginField = createField({
  name: 'login',
});

export const passwordField = createField({
  name: 'password',
});

export type FormShape = {
  login: string;
  password: string;
};

export const loginForm = createForm({
  name: 'loginForm',
  fields: [loginField, passwordField],
});

login.use(parameters =>
  userLogin({ login: parameters.login, password: parameters.password }),
);

guard({
  source: sample(loginForm.$values, loginForm.submit),
  filter: loginForm.$isValid,
  target: login,
});

forward({
  from: login.done,
  to: fetchSession,
});
