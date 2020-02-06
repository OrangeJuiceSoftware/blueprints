import React from 'react';

import { Layout } from 'antd';
const { Content } = Layout;

const PageLayout = ({ children, style, ...props }) => {
  const mergedStyle = {
    ...style,
    overflow: 'auto',
    height: 'calc(100vh - 40px)'
  };

  return (
    <Layout {...props} style={mergedStyle}>
      <Content style={{ margin: '0' }}>
        {children}
      </Content>
    </Layout>
  );
};

export default PageLayout;
