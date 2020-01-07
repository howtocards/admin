import { request } from './request';

export type UserCard = {
  id: number;
  userName: string;
  displayName: string;
  email: string;
  isBlocked: boolean;
  created: number;
  favorite: number;
};

export type EditUserCardProps = {
  id: number;
  userName: string;
  displayName: string;
  email: string;
};

export const getUsersList = (): Promise<UserCard[]> => request('/users/list');

export const editUser = (userCard: EditUserCardProps): Promise<{}> =>
  request(`/user/edit`, { userCard });

export const blockUser = (id: number): Promise<{}> =>
  request(`/user/block`, { id });
