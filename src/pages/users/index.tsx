import * as React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import { useStore } from 'effector-react';

import { addColumnSearch } from 'lib/tables';
import { pageMounted, $usersLits } from './model';

export const UsersPage = () => {
  const userNameRef = React.createRef();
  const displayNameRef = React.createRef();
  const emailRef = React.createRef();

  React.useEffect(() => pageMounted(), []);

  const usersLits = useStore($usersLits);

  const columns = React.useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'User',
        dataIndex: 'userName',
        key: 'userName',
        ...addColumnSearch('userName', userNameRef),
      },
      {
        title: 'Name',
        dataIndex: 'displayName',
        key: 'displayName',
        ...addColumnSearch('displayName', displayNameRef),
      },
      {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
        ...addColumnSearch('email', emailRef),
      },
    ],
    [],
  );
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
