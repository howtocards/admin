import * as React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import { Table, Button, Icon, Card, Form, Divider, Badge } from 'antd';

import { UserCard } from 'api/users';
import { addColumnSearch } from 'lib/tables';
import { Field } from 'ui/atoms';

import {
  pageMounted,
  submitForm,
  $usersLits,
  userNameField,
  displayNameField,
  emailField,
  blockUser,
} from './model';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const UserProfile: React.FC<{ data: UserCard }> = ({ data }) => {
  return (
    <Card
      title={
        <>
          @{data.userName}
          &nbsp;
          <Badge
            count={4}
            style={{ backgroundColor: '#52c41a' }}
            title="Карточек создано"
          />
          <Badge
            count={12}
            style={{ backgroundColor: '#faad14' }}
            title="Карточек в избранном"
          />
        </>
      }
      extra={
        <Button type="primary" onClick={submitForm}>
          Сохранить
        </Button>
      }
    >
      <Form {...formItemLayout} style={{ width: 570 }}>
        <Field
          name="userName"
          placeholder={data.userName || 'Имя пользователя'}
          icon="user"
          config={userNameField}
          label="Имя пользователя"
        />
        <Field
          name="displayName"
          placeholder={data.displayName || 'Отображаемое имя'}
          icon="user"
          config={displayNameField}
          label="Отображаемое имя"
        />
        <Field
          name="emailField"
          placeholder={data.email || 'E-mail пользователя'}
          icon="mail"
          config={emailField}
          label="Почта"
        />
      </Form>
    </Card>
  );
};

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
        width: 80,
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
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (_: string, record: UserCard) => (
          <Button
            onClick={() => blockUser(record.id)}
            type={record.isBlocked ? 'default' : 'danger'}
            icon={record.isBlocked ? 'unlock' : 'lock'}
          />
        ),
      },
    ],
    [],
  );

  return (
    <UsersContainer>
      <Table
        bordered
        columns={columns}
        dataSource={usersLits || []}
        loading={Boolean(!usersLits)}
        expandedRowRender={record => <UserProfile data={record} />}
        rowKey="id"
        expandIcon={props => (
          <Icon
            type="idcard"
            onClick={e => {
              props.onExpand(props.record, e);
            }}
          />
        )}
      />
    </UsersContainer>
  );
};

const UsersContainer = styled.div``;
