import * as React from 'react';
import { useStore } from 'effector-react';
import { useParams } from 'react-router-dom';

import { PageHeader, Button, Card, Divider, Tag, Form, Row, Col } from 'antd';

import { formLayout } from 'lib/forms';

import { Field } from 'ui/atoms';
import { CardEditor } from 'ui/molecules';

import {
  $card,
  pageMounted,
  titleField,
  submitCardForm,
  previewUrlField,
  contentForSearchField,
  submitMetaForm,
} from './model';

import { deleteCard, archiveCard } from '../model';

export const CardPage = () => {
  const { id } = useParams();
  const numberID = id ? parseInt(id, 10) : -1;

  React.useEffect(() => {
    pageMounted({ id: numberID });
  }, [numberID]);

  const card = useStore($card);

  return (
    <>
      <PageHeader
        title={
          <>
            <Tag style={{ top: -2 }}>{id}</Tag>
            <Divider type="vertical" style={{ marginRight: 18 }} />
            {card?.title}
          </>
        }
      />
      <Row gutter={24}>
        <Col span={12}>
          <Card loading={Boolean(!card)} title="Meta info">
            <Form {...formLayout}>
              <Field
                name="cardTitle"
                placeholder={card?.title ?? ''}
                icon="align-left"
                config={titleField}
                label="Title"
              />
              <Divider />
              <Field
                name="previewUrl"
                placeholder={card?.previewUrl ?? ''}
                config={previewUrlField}
                label="Preview URL"
              />
              <Field
                name="contentForSearch"
                placeholder={card?.contentForSearch ?? ''}
                config={contentForSearchField}
                label="Content for search"
              />
              <Divider />
              <Form.Item label=" " colon={false}>
                <Button type="primary" onClick={submitMetaForm}>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            loading={Boolean(!card)}
            title={
              <>
                Card
                {card?.isArchived && (
                  <>
                    <Divider type="vertical" />
                    <Tag color="#52c41a">archived</Tag>
                  </>
                )}
              </>
            }
          >
            <Form>
              <CardEditor>{card?.content}</CardEditor>
              <Divider />
              <Button icon="save" type="primary" onClick={submitCardForm}>
                Save
              </Button>
              &nbsp; &nbsp;
              <Button
                type="default"
                icon="container"
                onClick={() => archiveCard(numberID)}
              >
                Archive
              </Button>
              &nbsp; &nbsp;
              <Button
                type="danger"
                icon="delete"
                onClick={() => deleteCard(numberID)}
              >
                Delete
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};
