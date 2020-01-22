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
  metaTitleField,
  metaDescField,
  submitMetaForm,
} from './model';

import { deleteCard, achieveCard } from '../model';

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
          <Card loading={Boolean(!card)} title="Мета">
            <Form {...formLayout}>
              <Field
                name="userName"
                placeholder={card?.title || ''}
                icon="align-left"
                config={titleField}
                label="Заголовок"
              />
              <Divider />
              <Field
                name="metaTitle"
                placeholder={card?.metaTitle || ''}
                config={metaTitleField}
                label="Title"
              />
              <Field
                name="metaTitle"
                placeholder={card?.metaDescription || ''}
                config={metaDescField}
                label="Description"
              />
              <Divider />
              <Form.Item label=" " colon={false}>
                <Button type="primary" onClick={submitMetaForm}>
                  Сохранить мету
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
                Карточка
                {card?.isAchieved && (
                  <>
                    <Divider type="vertical" />
                    <Tag color="#52c41a">achieved</Tag>
                  </>
                )}
              </>
            }
          >
            <Form>
              <CardEditor>{card?.content}</CardEditor>
              <Divider />
              <Button icon="save" type="primary" onClick={submitCardForm}>
                Сохранить карточку
              </Button>
              &nbsp; &nbsp;
              <Button
                type="primary"
                icon="container"
                onClick={() => achieveCard(numberID)}
              >
                В архив
              </Button>
              &nbsp; &nbsp;
              <Button
                type="danger"
                icon="delete"
                onClick={() => deleteCard(numberID)}
              >
                Удалить
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};
