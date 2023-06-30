import React from 'react';
import { Alert, Space } from 'antd';

const CantFound: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Alert message="Sorry, we did not found anything" type="warning" />
  </Space>
);

export default CantFound;
