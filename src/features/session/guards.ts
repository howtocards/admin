/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Guard } from 'lib/routing';
import { Session } from 'api/session';

export interface UserContext {
  session: Session | null;
}

export function onlyAnon(): Guard<UserContext> {
  return (route, context) => (context?.session ? null : route);
}
export function onlyUsers(): Guard<UserContext> {
  return (route, context) => (context?.session ? route : null);
}
