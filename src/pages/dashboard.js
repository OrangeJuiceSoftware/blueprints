import React from 'react';

import { organizationPath, organizationNewPath } from 'routes';
import { useOrganizations } from 'fire/hooks';

import { Layout, Seo, Link } from 'components';
import { Avatar, Button, Card, Col, Row, Typography, Icon } from 'antd';
import { magenta } from '@ant-design/colors';

const { Text, Title } = Typography;

const Dashboard = ({ user }) => {
  const [organizations, loadingOrganizations, errorOrganizations] = useOrganizations(user.uid);

  return (
    <Layout>
      <Seo title={'Dashboard'}/>

      <Row type='flex' justify="space-between">
        <Col span={10} offset={7} style={{ padding: 24, height: 'calc(100vh - 40px)' }}>

          <Row>
            <Card style={{ background: magenta[0], borderColor: magenta[4] }} >
              <Card.Meta title={'We are an indie shop!'}/>
              <Text>Pls dontate some pesos</Text>
            </Card>
          </Row>

          {organizations && organizations.map(({ id, name }) => (
            <Row key={id}>
              <Link to={organizationPath(id)}>
                <Card>
                  {name}
                </Card>
              </Link>
            </Row>
          ))}

          <Row>
            <Link to={organizationNewPath()}>
              <Card>
                Create new
              </Card>
            </Link>
          </Row>

        </Col>
      </Row>

    </Layout>
  );
};

export default Dashboard;
