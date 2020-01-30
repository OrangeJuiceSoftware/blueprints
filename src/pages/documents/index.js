import React from 'react';

import { firestore } from 'services/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Seo } from 'components';

import Layout from 'layouts/sidebar-layout';
import { Card, Col, Icon, Menu, Row } from 'antd';

import { Link } from 'react-router-dom';

const generateSidebarItems = () => {
  return (
    <Menu style={{ borderRight: 'none' }} defaultSelectedKeys={[1]} mode={'inline'}>
      <Menu.Item key={1}>
        <Icon type={'team'}/>
        <span>hiohioshsoif</span>
      </Menu.Item>
    </Menu>
  );
};

const Documents = ({ user }) => {
  // get workspaces
  // get directories
  const [documents, loading, error] = useCollectionData(firestore.collection('files').where('userID', '==', user.uid), { idField: 'id' });

  console.log(documents);

  return (
    <Layout sidebarItems={generateSidebarItems()}>
      <Seo title={'Documents'}/>

      <Row gutter={[24, 24]} style={{ margin: 24 }}>
        {documents && documents.map((document) => (
          <Col key={document.id} span={6}>
            {/* can't nest a tags apparently.... */}
            <Card title={<Link to={`documents/${document.id}/view`}>{document.name}</Link>} actions={[
              <Icon type="setting" key="setting" />,
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
