import { request } from './request';

export type UserCard = {
  id: number;
  userName: string;
  displayName: string;
  email: string;
};

export const getUsersList = (): Promise<UserCard[]> => request('/users');
