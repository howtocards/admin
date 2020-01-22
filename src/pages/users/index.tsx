import * as React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import {
  Table,
  Button,
  Icon,
  Card,
  Form,
  Badge,
  PageHeader,
  Tag,
  Divider,
} from 'antd';

import { UserCard } from 'api/users';
import { addColumnSearch } from 'lib/tables';
import { formLayout } from 'lib/forms';

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

const UserProfile: React.FC<{ data: UserCard }> = ({ data }) => {
  return (
    <Card
      title={
        <>
          @{data.userName}
          <Divider type="vertical" />
          <Badge count={data.created}>
            <Tag color="#52c41a">created</Tag>
          </Badge>
          &nbsp; &nbsp;
          <Badge count={data.favorite}>
            <Tag color="#faad14">favorites</Tag>
          </Badge>
        </>
      }
    >
      <Form {...formLayout} style={{ maxWidth: 670 }}>
        <Field
          name="userName"
          placeholder={data.userName || ''}
          icon="user"
          config={userNameField}
          label="User"
        />
        <Field
          name="displayName"
          placeholder={data.displayName || ''}
          icon="user"
          config={displayNameField}
          label="Display name"
        />
        <Field
          name="emailField"
          placeholder={data.email || ''}
          icon="mail"
          config={emailField}
          label="E-Mail"
        />
        <Form.Item label={' '} colon={false}>
          <Button type="primary" onClick={submitForm}>
            Сохранить
          </Button>
        </Form.Item>
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
        render: (text: string) => <Tag>{text}</Tag>,
        width: 80,
      },
      {
        title: 'Username',
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
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        render: (_: string, record: UserCard) => (
          <Button
            onClick={() => blockUser(record.id)}
            type={record.isBlocked ? 'dashed' : 'danger'}
            icon={record.isBlocked ? 'unlock' : 'lock'}
            title={record.isBlocked ? 'Unblock' : 'Block'}
          />
        ),
        width: 60,
      },
    ],
    [userNameRef, displayNameRef, emailRef],
  );

  return (
    <UsersContainer>
      <PageHeader title="Users" />
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
