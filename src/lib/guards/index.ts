import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

type Guard<C> = (route: Route<C>, context: C) => Route<C> | null;

export type Route<C> = {
  path?: string;
  exact?: boolean;
  component: React.ComponentType<RouteComponentProps>;
  guards?: Guard<C>[];
};

type ReactRoute = {
  path?: string;
  exact: boolean;
  component: React.ComponentType<RouteComponentProps>;
};

export const compileGuards = <C>(
  config: Route<C>[],
  context: C,
): ReactRoute[] => {
  return config.reduce((all, route) => {
    const appliedRoute = applyGuards(route, context);
    if (isRoute(appliedRoute)) {
      all.push(toReactRoute(appliedRoute));
    }
    return all;
  }, [] as ReactRoute[]);
};

function applyGuards<C>(route: Route<C>, context: C): Route<C> | null {
  if (route.guards) {
    let currentRoute: Route<C> | null = route;
    for (const guard of route.guards) {
      if (!currentRoute) return null;
      currentRoute = guard(currentRoute, context);
    }
    return currentRoute;
  }
  return route;
}

function isRoute<C>(route: Route<C> | null): route is Route<C> {
  return Boolean(route);
}

function toReactRoute<C>(route: Route<C>): ReactRoute {
  return {
    path: route.path,
    exact: typeof route.exact === 'boolean' ? route.exact : true,
    component: route.component,
  };
}
