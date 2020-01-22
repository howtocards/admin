import * as React from 'react';
import { useStore } from 'effector-react';
import { Form, Icon, Input } from 'antd';

import { FieldConfig } from 'lib/forms';

interface FieldProps {
  type?: 'text' | 'password' | 'textarea';
  icon?: string;
  isTouched?: boolean;
  name: string;
  placeholder: string;
  label?: string;
  config: FieldConfig;
}

export const Field = ({
  type = 'text',
  icon,
  isTouched,
  name,
  placeholder,
  config,
  label,
}: FieldProps) => {
  const { $value, $error, changed } = config;

  const error = useStore($error);
  const value = useStore($value);

  const isFailed = isTouched && !!error;

  return (
    <Form.Item
      validateStatus={isFailed ? 'error' : ''}
      help={isFailed && error}
      className={`form-item-${name}`}
      label={label}
    >
      <Input
        value={value}
        prefix={<Icon type={icon} />}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={changed}
        size="large"
      />
    </Form.Item>
  );
};
