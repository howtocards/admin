import * as React from 'react';
import { Form as AntForm } from 'antd';
import { FormConfig } from 'lib/forms';

type FormProps = {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
  config: FormConfig;
  name?: string;
};

export const Form: React.FC<FormProps> = ({
  config,
  name,
  children,
  onSubmit,
}) => {
  const { submit } = config;

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      submit();
      if (onSubmit) {
        onSubmit(event);
      }
    },
    [submit, onSubmit],
  );

  return (
    <AntForm name={name} onSubmit={handleSubmit}>
      {children}
    </AntForm>
  );
};
