import * as React from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  Table,
  Button,
  Icon,
  Card,
  Divider,
  Tag,
  Form,
  PageHeader,
  Badge,
} from 'antd';

import { CardData } from 'api/cards';

import { addColumnSearch } from 'lib/tables';
import { formLayout } from 'lib/forms';

import { Field } from 'ui/atoms';
import { CardEditor } from 'ui/molecules';

import {
  $cardsLits,
  $selectedIDs,
  archiveCard,
  deleteCard,
  pageMounted,
  rerenderCard,
  selectRows,
  submitForm,
  titleField,
} from './model';

export const CardProfile: React.FC<{ data: CardData }> = ({ data }) => {
  return (
    <Card
      title={
        <>
          <Tag>{data.id}</Tag>
          <Divider type="vertical" style={{ marginRight: 14 }} />
          <b>{data.title}</b>
          {data.isArchived && (
            <>
              <Divider type="vertical" />
              <Tag color="#52c41a">archived</Tag>
            </>
          )}
        </>
      }
    >
      <Form {...formLayout} style={{ maxWidth: 1112 }}>
        <Field
          name="title"
          placeholder={data.title || ''}
          icon="book"
          config={titleField}
          label="Title"
        />
        <Form.Item label=" " colon={false}>
          <CardEditor>{data.content}</CardEditor>
        </Form.Item>
        <Divider />
        <Form.Item label=" " colon={false}>
          <Button icon="save" type="primary" onClick={submitForm}>
            Save
          </Button>
          &nbsp; &nbsp;
          <Button
            type="default"
            icon="container"
            onClick={() => archiveCard(data.id)}
          >
            Archive
          </Button>
          &nbsp; &nbsp;
          <Button
            type="danger"
            icon="delete"
            onClick={() => deleteCard(data.id)}
          >
            Delete
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export const CardsPage = () => {
  const titleRef = React.createRef();
  React.useEffect(() => pageMounted(), []);

  const cardsLits = useStore($cardsLits);
  const selectedIDs = useStore($selectedIDs);

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
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        ...addColumnSearch('title', titleRef),
        render: (text: string, record: CardData) => (
          <Link to={`cards/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (_: string, record: CardData) => (
          <>
            <Button
              onClick={() => rerenderCard(record.id)}
              type="primary"
              icon="reload"
              title="Make preview"
            />
            &nbsp;
            <Button
              onClick={() => archiveCard(record.id)}
              type={record.isArchived ? 'dashed' : 'primary'}
              icon="container"
              title={record.isArchived ? 'Unarchive' : 'Archive'}
            />
            &nbsp;
            <Button
              onClick={() => deleteCard(record.id)}
              type="danger"
              icon="delete"
              title="Delete card"
            />
          </>
        ),
        width: 154,
      },
    ],
    [titleRef],
  );

  return (
    <>
      <PageHeader title="Cards" subTitle="List all available cards" />
      <Table
        title={() => (
          <TableHeaderContainer>
            <Badge count={selectedIDs?.length}>
              <Button
                type="primary"
                icon="reload"
                onClick={() => selectedIDs && rerenderCard(selectedIDs)}
              >
                Make preview
              </Button>
            </Badge>
          </TableHeaderContainer>
        )}
        rowSelection={{
          onChange: (_, selectedRows) =>
            selectRows({
              selectedRows,
            }),
        }}
        bordered
        columns={columns}
        dataSource={cardsLits || []}
        loading={Boolean(!cardsLits)}
        rowKey="id"
        expandedRowRender={record => <CardProfile data={record} />}
        expandIcon={props => (
          <Icon
            type="book"
            onClick={e => {
              props.onExpand(props.record, e);
            }}
          />
        )}
      />
    </>
  );
};

const TableHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;
