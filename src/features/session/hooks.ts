import * as React from 'react';
import { useStore } from 'effector-react';

import { Session } from 'api/session';
import { $session, fetchSession, $isWaitingFor, killSession } from './model';

export function useSession(): Session | null {
  return useStore($session);
}

export function useSessionWaiting(): boolean {
  return useStore($isWaitingFor);
}

export function useSessionFetch(): void {
  React.useEffect(() => {
    fetchSession();
  }, []);
}

export function useSessionKiller(): () => void {
  return React.useCallback(() => killSession(), []);
}
