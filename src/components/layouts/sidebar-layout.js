import React from 'react';

import { Layout } from 'antd';
import { Sidebar } from 'components';

const { Content } = Layout;

const SidebarLayout = ({ children, sidebarItems }) => {

  return (
    <Layout hasSider>
      <Sidebar>
        {sidebarItems}
      </Sidebar>

      <Layout style={{ overflow: 'auto', height: 'calc(100vh - 40px)' }}>
        <Content style={{ margin: '0' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarLayout;
