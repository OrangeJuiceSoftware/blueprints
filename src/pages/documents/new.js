import React from 'react';
import { useHistory } from 'react-router-dom';
import useMyDocuments from 'firehooks/useMyDocuments';

import { Seo } from 'components';
import Layout from 'layouts/default-layout';
import { Card, Col, Icon, PageHeader, Row } from 'antd';

const templateIDs = [1, 2, 3, 4, 5, 6, 7];

const DocumentsNew = ({ user }) => {
  const history = useHistory();
  const [documents, loading, error, { createDocumentFromTemplate, createDocumentFromFile }] = useMyDocuments(user.uid);

  const handleTemplateClick = async (templateID) => {
    try {
      const docRef = await createDocumentFromTemplate({ templateID });
      history.push(`/documents/${docRef.id}/edit`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileClick = async (cloneID) => {
    try {
      const docRef = await createDocumentFromFile({ cloneID });
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
          <Card hoverable onClick={() => handleTemplateClick({ templateID: 0 })}>
            <Icon type={'plus'}/>
          </Card>
        </Col>

        {templateIDs.map((templateID) => (
          <Col key={templateID} span={4}>

            <p>Template Title</p>

            <Card hoverable onClick={() => handleTemplateClick({ templateID })}>
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

            <Card hoverable onClick={() => handleFileClick({ cloneID: document.id })}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>

          </Col>
        ))}

      </Row>

    </Layout>
  );
};

export default DocumentsNew;
