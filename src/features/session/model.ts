import { createStore } from 'effector';

export type Session = {
  adminId: string;
};

export const $session = createStore<Session | null>(null);
