import React from 'react';
import { useBlueprints, useOrganization } from 'fire/hooks';

import { blueprintNewPath, blueprintViewPath } from 'routes';

import { Link, Seo } from 'components';

import Layout from 'layouts/sidebar-layout';
import { Button, Card, Col, Icon, Menu, Row } from 'antd';

const OrganizationView = ({ user, match }) => {
  const [organization, loadingOrganization, errorOrganization] = useOrganization(match.params.organizationID);
  const [blueprints, loading, error] = useBlueprints([match.params.organizationID]);

  const generateSidebarItems = () => {
    return (
      <>
        <Link to={blueprintNewPath()}>
          <Button type="primary" shape="round" icon="plus" size={'large'} style={{ margin: 16 }}>
            New
          </Button>
        </Link>

        <Menu style={{ borderRight: 'none' }} defaultSelectedKeys={['1']} mode={'inline'}>
          <Menu.Item key={1}>
            <Icon type={'team'}/>
            <span>hiohioshsoif</span>
          </Menu.Item>
        </Menu>
      </>
    );
  };

  if (loadingOrganization) {
    return <p>loading</p>;
  }

  return (
    <Layout sidebarItems={generateSidebarItems()}>
      <Seo title={organization.name}/>

      <Row gutter={[24, 24]} style={{ margin: 24 }}>
        {blueprints && blueprints.map((blueprint) => (
          <Col key={blueprint.id} span={4}>
            {/* can't nest a tags apparently.... */}
            <Card hoverable title={<Link to={blueprintViewPath(blueprint.id)}>{blueprint.title}</Link>} actions={[
              <Icon type="copy" key="copy" />,
              <Link key="edit" to={`/b/${blueprint.id}/edit`}>
                <Icon type="edit" />
              </Link>,
              <Icon type="ellipsis" key="ellipsis" />
            ]}>
              <Link to={blueprintViewPath(blueprint.id)}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Link>
            </Card>

          </Col>
        ))}
      </Row>

    </Layout>
  );
};

export default OrganizationView;
