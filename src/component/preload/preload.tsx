import React from 'react';
import './preload.css';
import { Space, Spin } from 'antd';

const Preload: React.FC = () => (
  <Space direction="vertical" align={'center'} className="space">
    <Space>
      <Spin tip="Loading" size="large">
        <div className="preload" />
      </Spin>
    </Space>
  </Space>
);

export default Preload;
