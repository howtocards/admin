import { request } from './request';

export type UserCard = {
  id: number;
  userName: string;
  displayName: string;
  email: string;
  isBlocked: boolean;
};

export type EditUserCardProps = {
  id: number;
  userName: string;
  displayName: string;
  email: string;
};

export const getUsersList = (): Promise<UserCard[]> => request('/users/list');

export const editUserCard = (userCard: EditUserCardProps): Promise<{}> =>
  request(`/user/update/id`, { userCard });

export const blockUser = (id: number): Promise<{}> =>
  request(`/user/block/id`, { id });
