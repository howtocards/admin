import * as React from 'react';
import { SessionLoader } from 'features/session';
import { Pages } from 'pages';

export const App: React.FC = () => {
  return (
    <SessionLoader>
      <Pages />
    </SessionLoader>
  );
};
