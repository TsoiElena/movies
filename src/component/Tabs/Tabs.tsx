import React from 'react';
import { Space, Tabs } from 'antd';
import type { TabsProps } from 'antd';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Search',
  },
  {
    key: '2',
    label: 'Rated',
  },
];

type TabsMenuProps = {
  setTabs: (e: string) => void;
};

const TabsMenu: React.FC<TabsMenuProps> = ({ setTabs }) => {
  const onChange = (key: string) => {
    if (key === '1') setTabs('Search');
    if (key === '2') setTabs('Rated');
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} align="center">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Space>
  );
};

export default TabsMenu;
