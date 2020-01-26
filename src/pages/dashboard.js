import React from 'react';
// import { firestore } from 'services/firebase';

// import { useCollection } from 'react-firebase-hooks/firestore';

import { Layout, Seo } from 'components';

import { Card, Col, Row } from 'antd';

const Dashboard = (props) => {
  console.log(props);

  return (
    <Layout>
      <Seo title={'Dashboard'}/>

      <Row type='flex' justify="space-around" style={{ marginTop: 24 }}>
        <Col span={6}>
          <Card title="Default size card">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={10}>
          <Card title="Default size card">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Default size card">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Dashboard;
