import * as React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

import { useSession } from 'features/session';

type Props = {
  header?: React.ReactNode;
};

export const GenericTemplate: React.FC<Props> = ({ children, header }) => {
  const isLogged = !!useSession();

  return (
    <Layout className="layout">
      {isLogged && header ? <Layout.Header>{header}</Layout.Header> : null}
      <Content data-full={!isLogged}>{children}</Content>
    </Layout>
  );
};

const Content = styled(Layout.Content)`
  background-color: #fafafa;

  &[data-full='false'] {
    min-height: calc(100vh - 64px);
    padding: 2rem;
  }
  &[data-full='true'] {
    min-height: 100vh;
    padding: 0 2rem;
  }
`;
