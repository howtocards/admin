import * as React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import { useStore } from 'effector-react';

import { pageMounted, $usersLits } from './model';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'User',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: 'Name',
    dataIndex: 'displayName',
    key: 'displayName',
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
  },
];

export const UsersPage = () => {
  React.useEffect(() => pageMounted(), []);
  const usersLits = useStore($usersLits);

  return (
    <UsersContainer>
      <Table
        columns={columns}
        dataSource={usersLits || []}
        loading={Boolean(!usersLits)}
        expandedRowRender={record => <div>edit user {record.id}</div>}
      />
    </UsersContainer>
  );
};

const UsersContainer = styled.div``;
