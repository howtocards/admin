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
  deleteCard,
  achieveCard,
  $cardsLits,
  pageMounted,
  titleField,
  submitForm,
  rerenderCard,
  selectRows,
  $selectedIDs,
} from './model';

export const CardProfile: React.FC<{ data: CardData }> = ({ data }) => {
  return (
    <Card
      title={
        <>
          <Tag>{data.id}</Tag>
          <Divider type="vertical" style={{ marginRight: 14 }} />
          <b>{data.title}</b>
          {data.isAchieved && (
            <>
              <Divider type="vertical" />
              <Tag color="#52c41a">achieved</Tag>
            </>
          )}
        </>
      }
    >
      <Form {...formLayout} style={{ maxWidth: 1112 }}>
        <Field
          name="userName"
          placeholder={data.title || ''}
          icon="user"
          config={titleField}
          label="Заголовок"
        />
        <Form.Item label=" " colon={false}>
          <CardEditor>{data.content}</CardEditor>
        </Form.Item>
        <Divider />
        <Form.Item label=" " colon={false}>
          <Button icon="save" type="primary" onClick={submitForm}>
            Сохранить карточку
          </Button>
          &nbsp; &nbsp;
          <Button
            type="primary"
            icon="container"
            onClick={() => achieveCard(data.id)}
          >
            В архив
          </Button>
          &nbsp; &nbsp;
          <Button
            type="danger"
            icon="delete"
            onClick={() => deleteCard(data.id)}
          >
            Удалить
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
              onClick={() => deleteCard(record.id)}
              type="danger"
              icon="delete"
            />
            &nbsp; &nbsp;
            <Button
              onClick={() => rerenderCard(record.id)}
              type="primary"
              icon="reload"
            />
            &nbsp; &nbsp;
            <Button
              onClick={() => achieveCard(record.id)}
              type={record.isAchieved ? 'dashed' : 'primary'}
              icon="container"
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
      <PageHeader title={'Все карточки'} />
      <Table
        title={() => (
          <TableHeaderContainer>
            <Badge count={selectedIDs?.length}>
              <Button
                type="primary"
                icon="reload"
                onClick={() => selectedIDs && rerenderCard(selectedIDs)}
              >
                Ререндерить
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
            type="idcard"
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
