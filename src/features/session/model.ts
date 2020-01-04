import {
  createStore,
  createEffect,
  createEvent,
  guard,
  combine,
  forward,
} from 'effector';
import { Session, userCurrentGet, userLogout } from 'api/session';

export const fetchSession = createEvent<void>();

export const $session = createStore<Session | null>(null);

// initial pending with true
const $isPending = createStore(true);
const loadCurrentUser = createEffect<void, Session, Error>();

export const killSession = createEffect<void, void>();

export const $isWaitingFor = combine(
  $isPending,
  $session,
  (isPending, session) => (session ? false : isPending),
);

loadCurrentUser.use(userCurrentGet);
killSession.use(userLogout);

$isPending
  .on(loadCurrentUser, () => true)
  .on(loadCurrentUser.finally, () => false);

guard({
  source: fetchSession,
  filter: loadCurrentUser.pending.map(is => !is),
  target: loadCurrentUser,
});

forward({
  from: killSession.finally,
  to: fetchSession,
});

$session
  .on(loadCurrentUser.done, (_, { result }) => result)
  .on(loadCurrentUser.fail, () => null);

loadCurrentUser.fail.watch(({ error }) => {
  // eslint-disable-next-line no-console
  console.error('Failed to load session:', error);
});
