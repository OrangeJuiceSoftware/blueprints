import React from 'react';

import { organizationPath, blueprintViewPath, blueprintNewPath } from 'routes';
import { useBlueprints, useOrganizations } from 'fire/hooks';

import { Layout, Seo, Link } from 'components';
import { Button, Card, Col, Row } from 'antd';

const Dashboard = ({ user }) => {
  const [organizations, loadingOrganizations, errorOrganizations] = useOrganizations(user.uid);
  const [blueprints, loading, error] = useBlueprints(organizations && organizations.map(({ id }) => id));

  return (
    <Layout>
      <Seo title={'Dashboard'}/>

      <Row type='flex' justify="space-around" style={{ marginTop: 24 }}>
        <Col span={6}>
          <Link to={blueprintNewPath()}>
            <Button type="primary" shape="round" icon="plus" size={'large'} style={{ margin: 16 }}>
            New
            </Button>
          </Link>

          {organizations && organizations.map(({ id, name }) => (
            <Row key={id}>
              <Link to={organizationPath(id)} >{name}</Link>
            </Row>
          ))}

          {blueprints && blueprints.map(({ id, title }) => (
            <Row key={id}>
              <Link to={blueprintViewPath(id)} >{title}</Link>
            </Row>
          ))}
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
