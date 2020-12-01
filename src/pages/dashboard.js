import React from 'react';

import { projectPath, projectNewPath } from 'routes';
import { useProjects } from 'fire/hooks';

import { Layout, Seo, Link } from 'components';
import { Avatar, Button, Card, Col, Row, Typography, Icon } from 'antd';
import { magenta, green } from '@ant-design/colors';
import { neutral } from 'colors';

const { Text, Title } = Typography;

const Dashboard = ({ user }) => {
  const [projects, loadingProjects, errorProjects] = useProjects(user.uid);

  return (
    <Layout>
      <Seo title={'Dashboard'}/>

      <Row style={{ marginTop: 24 }}>
        <Col span={12} offset={6}>
          <Card style={{ background: magenta[0], borderColor: magenta[4], borderRadius: 100 }} >
            <Card.Meta title={'We are an indie shop!'}/>
            <Text>Pls dontate some pesos</Text>
          </Card>
        </Col>
      </Row>

      <Row type='flex' justify="space-between">
        <Col span={10} offset={7} style={{ padding: 24 }}>


          <Title style={{ color: neutral[8], textAlign: 'center', marginTop: 32, marginBottom: 32 }}>Your Projects</Title>

          {projects && projects.map(({ id, name }) => (
            <Row key={id} style={{ marginBottom: 16 }}>
              <Link to={projectPath(id)}>
                <Card>
                  <Title level={3}>{name}</Title>
                  <Text>Some description text for this project</Text>
                </Card>
              </Link>
            </Row>
          ))}

          <Row>
            <Link to={projectNewPath()}>
              <Card>
                <Row type={'flex'} justify={'center'}>
                  <Icon type={'plus'} style={{ fontSize: 42, color: green[5] }}/>
                </Row>
                <Row type={'flex'} justify={'center'}>
                  <Text>Create a project</Text>
                </Row>
              </Card>
            </Link>
          </Row>

        </Col>
      </Row>

    </Layout>
  );
};

export default Dashboard;
