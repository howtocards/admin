import * as React from 'react';

import { Descriptions } from 'antd';

export const CardEditor: React.FC = ({ children }) => {
  return (
    <Descriptions bordered title="Содержание">
      <Descriptions.Item>{children}</Descriptions.Item>
    </Descriptions>
  );
};
