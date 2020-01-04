import { request } from './request';

export type Session = {};

export const userCurrentGet = (): Promise<void> => request('/user/current-get');

type LoginParams = {
  login: string;
  password: string;
};

export const userLogin = (parameters: LoginParams): Promise<void> =>
  request('/user/signin', parameters);

export const userLogout = (): Promise<void> => request('/user/logout');
