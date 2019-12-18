import * as React from 'react';
// import { useSession } from '../hooks';

export const SessionLoader: React.FC = ({ children }) => {
  // if session is loaded do nothing
  // If no session, send request to get info about session
  return <>{children}</>;
};
