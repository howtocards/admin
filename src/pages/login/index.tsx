import * as React from 'react';
import styled from 'styled-components';

import {
  Form as AntForm,
  Icon,
  Button,
  Alert,
  Divider,
  Typography,
} from 'antd';

import { Field, Form } from 'ui/atoms';
import { pageMounted, loginForm, loginField, passwordField } from './model';

export const LoginPage = () => {
  React.useEffect(() => pageMounted(), []);
  const loginDenied = '';

  return (
    <LoginContainer>
      <Block>
        <Title>
          <Icon type="lock" />
          <Typography.Title level={2}>Авторизация</Typography.Title>
        </Title>
        <Form name="loginForm" config={loginForm}>
          <Field
            name="login"
            placeholder="Admin login"
            icon="user"
            config={loginField}
          />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            icon="lock"
            config={passwordField}
          />
          <AntForm.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
            >
              Login
            </Button>
            {loginDenied && (
              <>
                <Divider />
                <Alert message={loginDenied} type="error" showIcon />
              </>
            )}
          </AntForm.Item>
        </Form>
      </Block>
    </LoginContainer>
  );
};

const LoginContainer = styled.section`
  display: flex;
  min-height: 100vh;

  .ant-btn-lg {
    width: 100%;
  }

  .anticon {
    opacity: 0.4;
  }

  .ant-form-explain {
    font-size: 1.2rem;
    margin-left: 1rem;
    bottom: -4px;
    position: relative;
  }
`;

const Block = styled.div`
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  padding: 36px 36px 6px 36px;
  max-width: 360px;
  width: 100%;
  box-shadow: 0 14.5px 5.2px -10px rgba(0, 0, 0, 0.038),
    0 23.9px 16.6px -10px rgba(0, 0, 0, 0.057),
    0 64px 118px -10px rgba(0, 0, 0, 0.08);
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 12px;

  .anticon {
    display: block;
    font-size: 2rem;
    margin-bottom: 6px;
  }
`;
