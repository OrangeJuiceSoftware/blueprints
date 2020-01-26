import React from 'react';

import { Header } from 'components';
import { Layout } from 'antd';

const App = ({ user, children }) => {

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header user={user}/>
      {children}
    </Layout>
  );
};

export default App;
