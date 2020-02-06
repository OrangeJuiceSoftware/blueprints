import React, { useState } from 'react';

import { firestore } from 'services/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router-dom';


import { Link, Seo } from 'components';

import Layout from 'layouts/default-layout';
import { Card, Col, Icon, PageHeader, Row } from 'antd';

const templateIDs = [1, 2, 3, 4, 5, 6, 7];

const DocumentsNew = ({ user }) => {
  const history = useHistory();
  const [documents, loading, error] = useCollectionData(firestore.collection('files').where('userID', '==', user.uid), { idField: 'id' });

  const createDocument = async ({ templateID = null, cloneID = null }) => {
    const newDocument = {
      name: null,
      content: null,
      workSpaceRef: 'sdfsdf',
      templateID: null,
      cloneID: null
    };

    if (templateID) {
      newDocument.templateID = templateID;
      newDocument.content = 'built from template';

    } else if (cloneID) {
      newDocument.cloneID = cloneID;
      newDocument.content = 'clones from file';
    }

    try {
      const docRef = await firestore.collection('files').add(newDocument);
      history.push(`/documents/${docRef.id}/edit`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout style={{ padding: '0 64px' }}>
      <Seo title={'Create'}/>

      <Row gutter={[24, 48]} style={{ margin: 24 }}>

        <PageHeader
          style={{
            margin: '24px 0',
            borderBottom: '1px solid rgb(235, 237, 240)'
          }}
          title="Templates"
          subTitle="Create from a template"
        />

        {/* This is the blank placeholder */}
        <Col span={4}>
          <p>Blank</p>
          <Card hoverable onClick={createDocument}>
            <Icon type={'plus'}/>
          </Card>
        </Col>

        {templateIDs.map((templateID) => (
          <Col key={templateID} span={4}>

            <p>Template Title</p>

            <Card hoverable onClick={() => createDocument({ templateID })}>
              <p>this is a template {templateID}</p>
            </Card>

          </Col>
        ))}

      </Row>

      <Row gutter={[24, 48]} style={{ margin: 24 }}>

        <PageHeader
          style={{
            margin: '24px 0',
            borderBottom: '1px solid rgb(235, 237, 240)'
          }}
          title="Your Files"
          subTitle="Clone from an existing file"
        />

        {documents && documents.map((document) => (
          <Col key={document.id} span={4}>

            <p>{document.name}</p>

            <Card hoverable>
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

export default DocumentsNew;
