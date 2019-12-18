import * as React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'lib/guards';
import { Session } from './model';

type RequiredContext = {
  session: Session | null;
};

/**
 * Pass if user authenticated
 * Else remove route or redirect
 */
export const onlyAuth = ({ redirect }: { redirect?: string } = {}) => (
  route: Route<RequiredContext>,
  context: RequiredContext,
) => {
  if (context.session) {
    return route;
  } else {
    return redirect
      ? { ...route, component: () => <Redirect to={redirect} /> }
      : null;
  }
};

/**
 * Pass if user anonymous
 * Else remove route or redirect
 */
export const onlyAnon = ({ redirect }: { redirect?: string } = {}) => (
  route: Route<RequiredContext>,
  context: RequiredContext,
) => {
  if (context.session) {
    return redirect
      ? { ...route, component: () => <Redirect to={redirect} /> }
      : null;
  } else {
    return route;
  }
};
