import * as React from 'react';
import { Switch, Route } from 'react-router';

import { useSession } from 'features/session';
import { compileRoutes, protectRoutes } from 'lib/routing';
import { ROUTES } from './routes';

export const Pages: React.FC = () => {
  const session = useSession();

  const routes = React.useMemo(() => {
    const compiled = compileRoutes(ROUTES);
    return protectRoutes(compiled, { session });
  }, [session]);

  return (
    <Switch>
      {routes.map(route => (
        <Route key={route.name} {...route} />
      ))}
    </Switch>
  );
};
