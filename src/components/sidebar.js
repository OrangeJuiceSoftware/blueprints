import React from 'react';

import { Layout } from 'antd';
const { Sider } = Layout;

const defaultWidth = 250;

const Sidebar = ({ children, width, style }) => {
  return (
    <Sider theme={'light'} width={width || defaultWidth} style={{
      overflow: 'auto',
      height: 'calc(100vh - 64px)',
      ...style }}>
      {children}
    </Sider>
  );
};

export default Sidebar;