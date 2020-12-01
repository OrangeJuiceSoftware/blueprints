import React from 'react';
import { useHistory } from 'react-router-dom';

import { fileNewPath, fileViewPath } from 'routes';

import { useFiles, useProject } from 'fire/hooks';

import { Link, Seo } from 'components';
import Layout from 'layouts/default-layout';
import { Button, Card, Tag, Col, Icon, Menu, Table, Row, List, Typography } from 'antd';
import { neutral } from 'colors';

const { Text } = Typography;

const ProjectView = ({ user, match }) => {
  const history = useHistory();
  const [project, loadingProject, errorProject] = useProject(match.params.projectID);
  const [files, loadingFiles, errorFiles] = useFiles([match.params.projectID]);

  if (loadingProject) {
    return <p>loading</p>;
  }

  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <Seo title={project.name}/>

      <Row style={{ backgroundColor: 'white', paddingTop: 16, paddingBottom: 16 }}>
        <Col span={18} offset={3}>
          <Col span={12}><Text strong style={{ fontSize: 16 }}>Title</Text></Col>
          <Col span={4}><Text strong style={{ fontSize: 16 }}>Approved</Text></Col>
          <Col span={6}><Text strong style={{ fontSize: 16 }}>Last Updated</Text></Col>
          <Col span={2}></Col>
        </Col>
      </Row>

      <Row style={{ backgroundColor: 'white' }}>
        <Col span={3}>
          {/* @V2 */}
          {/* <List
            size={'large'}
            dataSource={project && project.labels}
            renderItem={label => (
              <Row style={{ padding: '8px 16px' }}>
                <Tag key={label} style={{ padding: '4px 8px' }}>{label}</Tag>
              </Row>
            )}
          /> */}
        </Col>

        <Col span={18}>
          <List
            loading={false}
            itemLayout="horizontal"
            loadMore={<>load more</>}
            dataSource={files}
            renderItem={file => (
              <Row onClick={() => history.push(fileViewPath(file.id)) } style={{ marginBottom: 4, paddingBottom: 8, paddingTop: 8 }}>
                <Row>
                  <Col span={12}><Text strong style={{ fontSize: 14 }}> {file.title}</Text></Col>
                  <Col span={4}>{file.approvals && file.approvals.length}</Col>
                  <Col span={6}>{file.createdAt.toDate().toLocaleDateString()}</Col>
                  <Col span={2}>
                    <Button onClick={(e) => { e.stopPropagation(); console.log('button click') }} type="secondary" shape="circle">
                      <Icon style={{ fontSize: 24 }} type={'more'}/>
                    </Button>
                  </Col>
                </Row>

                <Row style={{ paddingTop: 12, borderBottom: `1px solid ${neutral[4]}` }}></Row>
              </Row>
            )}
          />
        </Col>
      </Row>

      <Link to={fileNewPath()} style={{ position: 'fixed', bottom: 32, right: 32 }}>
        <Button type="primary" shape="circle" icon="plus" style={{ width: 64, height: 64, fontSize: 42, lineHeight: '42px' }}/>
      </Link>

    </Layout>
  );
};


export default ProjectView;