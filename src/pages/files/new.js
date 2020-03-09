import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { fileEditPath } from 'routes';

import { useFiles, useProjects } from 'fire/hooks';
import { createFileFromTemplate, createFileFromFile } from 'fire/actions';

import { useQuery } from 'hooks';

import { Seo } from 'components';
import Layout from 'layouts/default-layout';
import { Card, Col, Icon, PageHeader, Row } from 'antd';
import groupBy from 'lodash/groupBy';

const templateIDs = [1, 2, 3, 4, 5, 6, 7];

const FilesNew = ({ user }) => {
  const history = useHistory();
  const query = useQuery();

  const [projects, loadingProjects, errorProjects] = useProjects(user.uid);
  const [files, loading, error] = useFiles(projects && projects.map(({ id }) => id));
  const [selectedProject, setSelectedProject] = useState();

  const projectsMap = groupBy(projects, 'id');

  useEffect(() => {
    // hack to get around using exhaustive deps array. projects is an object.... always not equal to last
    if (!loadingProjects) {
      if (query.o) {
        setSelectedProject(projectsMap[query.o]);
      } else {
        setSelectedProject(projects[0]);
      }
    }
  }, [loadingProjects, query.o]);

  console.log(selectedProject);

  const handleTemplateClick = async (templateID) => {
    try {
      const docRef = await createFileFromTemplate({ userID: user.uid, projectID: selectedProject.id, templateID });
      history.push(fileEditPath(docRef.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileClick = async (cloneID) => {
    try {
      const docRef = await createFileFromFile({ userID: user.uid, projectID: selectedProject.id, cloneID });
      history.push(fileEditPath(docRef.id));
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

        {files && files.map((file) => (
          <Col key={file.id} span={4}>

            <p>{file.title}</p>

            <Card hoverable onClick={() => handleFileClick({ cloneID: file.id })}>
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

export default FilesNew;
