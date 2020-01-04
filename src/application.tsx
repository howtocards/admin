import * as React from 'react';
import { Normalize } from 'styled-normalize';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

import 'antd/dist/antd.min.css';
import './styles/common.css';

import {
  useSessionFetch,
  useSessionWaiting,
  AuthHeader,
} from 'features/session';

import { Pages } from 'pages';
import { GenericTemplate } from 'ui';

export const history = createBrowserHistory();

export const App: React.FC = () => {
  useSessionFetch();
  const isWaiting = useSessionWaiting();

  return (
    <Router history={history}>
      <>
        <Normalize />
        <GenericTemplate header={<AuthHeader links={[]} />}>
          {isWaiting ? null : <Pages />}
        </GenericTemplate>
      </>
    </Router>
  );
};
