import React from 'react';
import { Alert, Space } from 'antd';

const ErrorNotice: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Alert message="Error" description="Sorry, we have some problem! Please, try it later!" type="error" />
  </Space>
);

export default ErrorNotice;
