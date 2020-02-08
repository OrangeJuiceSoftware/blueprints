import React from 'react';
import useMyDocuments from 'firehooks/useMyDocuments';

import { Link, Seo } from 'components';

import Layout from 'layouts/sidebar-layout';
import { Button, Card, Col, Icon, Menu, Row } from 'antd';

const Documents = ({ user }) => {
  // get projects
  // get directories
  const [documents, loading, error] = useMyDocuments(user.uid);

  const generateSidebarItems = () => {
    return (
      <>
        <Link to={'/documents/new'}>
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

  return (
    <Layout sidebarItems={generateSidebarItems()}>
      <Seo title={'Documents'}/>

      <Row gutter={[24, 24]} style={{ margin: 24 }}>
        {documents && documents.map((document) => (
          <Col key={document.id} span={4}>
            {/* can't nest a tags apparently.... */}
            <Card hoverable title={<Link to={`documents/${document.id}/view`}>{document.name}</Link>} actions={[
              <Icon type="copy" key="copy" />,
              <Link key="edit" to={`documents/${document.id}/edit`}>
                <Icon type="edit" />
              </Link>,
              <Icon type="ellipsis" key="ellipsis" />
            ]}>
              <Link to={`documents/${document.id}/view`}>
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

export default Documents;
