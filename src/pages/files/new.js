import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { fileEditPath } from 'routes';

import { useFiles, useProjects } from 'fire/hooks';
import { createFileFromTemplate, createFileFromFile } from 'fire/actions';

import { useQuery } from 'hooks';

import { Seo } from 'components';
import Layout from 'layouts/default-layout';
import { Card, Col, Icon, PageHeader, Row, Select } from 'antd';
import groupBy from 'lodash/groupBy';

const templateIDs = [1, 2, 3, 4, 5, 6, 7];

const FilesNew = ({ user }) => {
  const history = useHistory();
  const query = useQuery();

  const [projects, loadingProjects, errorProjects] = useProjects(user.uid);
  // const [files, loading, error] = useFiles(projects && projects.map(({ id }) => id));
  const [selectedProjectID, setSelectedProject] = useState();

  const projectsMap = groupBy(projects, 'id');

  useEffect(() => {
    // hack to get around using exhaustive deps array. projects is an object.... always not equal to last
    if (!loadingProjects) {
      if (query.o) {
        setSelectedProject(projectsMap[query.o].id);
      } else {
        setSelectedProject(projects[0].id);
      }
    }
  }, [loadingProjects, query.o]);

  const handleTemplateClick = async (templateID) => {
    try {
      const docRef = await createFileFromTemplate({ userID: user.uid, projectID: selectedProjectID, templateID });
      history.push(fileEditPath(docRef.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileClick = async (cloneID) => {
    try {
      const docRef = await createFileFromFile({ userID: user.uid, projectID: selectedProjectID, cloneID });
      history.push(fileEditPath(docRef.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectProject = (projectID) => {
    setSelectedProject(projectID);
  };

  if (loadingProjects) {
    return <>loading projects</>;
  }

  return (
    <Layout style={{ padding: '0 64px' }}>
      <Seo title={'Create'}/>

      <Row style={{ margin: 24 }}>
        <Select value={selectedProjectID} style={{ width: 120 }} onChange={handleSelectProject}>
          {projects.map((project) => (
            <Select.Option key={project.id} value={project.id}>{project.name}</Select.Option>
          ))}
        </Select>
      </Row>

      <Row gutter={[24, 48]} style={{ margin: 24 }}>
        <PageHeader
          style={{
            margin: '24px 0',
            borderBottom: '1px solid rgb(235, 237, 240)'
          }}
          title="Templates"
          subTitle="Create from a template"
        />

        {templateIDs.map((templateID) => (
          <Col key={templateID} span={4}>

            <p>Template Title</p>

            <Card hoverable onClick={() => handleTemplateClick({ templateID })}>
              <p>this is a template {templateID}</p>
            </Card>

          </Col>
        ))}

        <Col span={4}>
          <p>Blank</p>
          <Card hoverable onClick={() => handleTemplateClick({ templateID: 0 })}>
            <Icon type={'plus'}/>
          </Card>
        </Col>

      </Row>

      {/* @V2 */}
      {/* <Row gutter={[24, 48]} style={{ margin: 24 }}>

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

      </Row> */}

    </Layout>
  );
};

export default FilesNew;
