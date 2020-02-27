import React from 'react';

import { organizationPath } from 'routes';
import { useOrganizations } from 'fire/hooks';

import { Layout, Seo, Link } from 'components';
import { Avatar, Button, Card, Col, Row, Typography, Icon } from 'antd';

const { Text, Title } = Typography;

const Dashboard = ({ user }) => {
  const [organizations, loadingOrganizations, errorOrganizations] = useOrganizations(user.uid);

  return (
    <Layout>
      <Seo title={'Dashboard'}/>

      <Row type='flex' justify="space-between">
        <Col span={12} style={{ padding: 24, height: 'calc(100vh - 40px)' }}>
          {organizations && organizations.map(({ id, name }) => (
            <Row key={id}>
              <Link to={organizationPath(id)}>
                <Card>
                  {name}
                </Card>
              </Link>
            </Row>
          ))}
        </Col>


        <Col span={6} style={{ marginTop: 24 }}>
          <Card extra={<Icon type={'close'}/>}>
            <Card.Meta title={'We are an indie shop!'}/>
            <Text>Pls dontate some pesos</Text>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Dashboard;
