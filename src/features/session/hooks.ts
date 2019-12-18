import { useStore } from 'effector-react';
import { $session } from './model';

export function useSession() {
  return useStore($session);
}
