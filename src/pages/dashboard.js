import React from 'react';
import keyBy from 'lodash/keyBy';

import { organizationPath, blueprintViewPath, blueprintNewPath } from 'routes';
import { useBlueprints, useOrganizations, useAllActivities } from 'fire/hooks';

import { Layout, Seo, Link } from 'components';
import { Avatar, Button, Card, Col, Row, Typography, Icon } from 'antd';
import { blueprintsRef } from '../fire/schema';

const { Text, Title } = Typography;

const Dashboard = ({ user }) => {
  const [organizations, loadingOrganizations, errorOrganizations] = useOrganizations(user.uid);
  const [blueprints, loading, error] = useBlueprints(organizations && organizations.map(({ id }) => id));

  const [activities, loadingActivities, errorActivities] = useAllActivities(blueprints && blueprints.map(({ id }) => id));

  const organizationsMap = keyBy(organizations, 'id');
  const blueprintsMap = keyBy(blueprints, 'id');

  return (
    <Layout>
      <Seo title={'Dashboard'}/>

      <Row type='flex' justify="space-between">
        <Col span={6} style={{ background: 'white', padding: 24, height: 'calc(100vh - 40px)' }}>

          <Link to={blueprintNewPath()}>
            <Button type="primary" shape="round" icon="plus" size={'large'}>New</Button>
          </Link>

          <Title level={4}>Files</Title>

          {blueprints && blueprints.map(({ id, organizationRef, title }) => (
            <Row key={id}>
              <Link to={blueprintViewPath(id)}>{organizationsMap[organizationRef.id].name} / {title}</Link>
            </Row>
          ))}

          <Title level={4}>Organizations</Title>

          {organizations && organizations.map(({ id, name }) => (
            <Row key={id}>
              <Link to={organizationPath(id)}>{name}</Link>
            </Row>
          ))}
        </Col>

        <Col span={10} style={{ marginTop: 24, height: 'calc(100vh - 40px)', overflow: 'scroll' }}>
          <Title>Recent Activity</Title>

          {activities && activities.map(({ id, type, username, avatarURL, blueprintRef, createdAt }) => (
            <Card key={id} style={{ marginBottom: 24 }}>
              <Card.Meta avatar={<Avatar src={avatarURL}/>} title={type} description={createdAt.toDate().toLocaleDateString()}/>

              <Text>
                {username} approved your <Link to={blueprintViewPath(blueprintRef.id)}>{blueprintsMap[blueprintRef.id].title}</Link>
              </Text>
            </Card>
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
