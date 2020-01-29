import React from 'react';

import { Layout } from 'antd';
const { Content } = Layout;

const PageLayout = ({ children }) => {
  return (
    <Layout style={{ overflow: 'auto', height: 'calc(100vh - 40px)' }}>
      <Content style={{ margin: '0' }}>
        {children}
      </Content>
    </Layout>
  );
};

export default PageLayout;
