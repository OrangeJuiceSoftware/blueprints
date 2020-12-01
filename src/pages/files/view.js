import React, { useState } from 'react';
import { projectPath, fileEditPath } from 'routes';

import { useFile, useProject, useComments, useActivities } from 'fire/hooks';
import { labelFile, unlabelFile, approveFile, createActivity, createComment, replyToComment } from 'fire/actions';

import { CommentList, Layout, Previewer, Seo } from 'components';
import { Breadcrumb, Button, Card, Col, Icon, Input, PageHeader, Tag, Timeline, Typography, Row } from 'antd';
import { Link } from 'react-router-dom';
const { Text, Title } = Typography;

const FilesView = ({ match, user }) => {
  const fileID = match.params.fileID;

  const [file, loadingFile, errorFile] = useFile(fileID);
  const [project, loadingProject, errorProject] = useProject(file && file.projectRef.id);
  const [comments, loadingComments, errorComments] = useComments(fileID);
  const [activities, loadingActivities, errorActivities] = useActivities(fileID);

  const [inputVisible, setInputVisible] = useState(false);
  const [newLabel, setNewLabel] = useState('');

  if (errorFile) {
    // this could be permisions or other fails
    return <p>error loading file</p>;
  }
  // waiting on react suspense to do this part better
  if(loadingFile) {
    return <p>loading</p>;
  }

  const handleOnComment = (body) => {
    createComment(fileID, {
      authorID: user.uid,
      avatarURL: user.photoURL,
      body
    });
  };

  const handleOnReply = (commentID, body) => {
    replyToComment(fileID, commentID, {
      authorID: user.uid,
      avatarURL: user.photoURL,
      body,
      commentID
    });
  };

  const handleOnApproval = () => {
    // do these in a batch in the action?
    approveFile(fileID, user.uid);
    createActivity(fileID, {
      userID: user.uid,
      username: user.displayName,
      avatarURL: user.photoURL,
      type: 'APPROVAL'
    });
  };

  // @V2
  // const handleOnAddLabel = (newLabel) => {
  //   labelFile(fileID, file.projectRef.id, newLabel);
  //   setNewLabel('');
  //   setInputVisible(false);
  // };

  // const handleOnRemoveLabel = (label) => {
  //   unlabelFile(fileID, file.projectRef.id, label);
  // };

  // const newLabelForm = (
  //   <span key={'newFrom'}>
  //     {inputVisible && (
  //       <Input
  //         type="text"
  //         size="small"
  //         style={{ width: 78 }}
  //         value={newLabel}
  //         onChange={(e) => setNewLabel(e.target.value)}
  //         onBlur={() => handleOnAddLabel(newLabel)}
  //         onPressEnter={() => handleOnAddLabel(newLabel)}
  //       />
  //     )}

  //     {!inputVisible && (
  //       <Tag key={'newButton'} onClick={() => setInputVisible(true)} style={{ background: '#fff', borderStyle: 'dashed' }}>
  //         <Icon type="plus" /> New Tag
  //       </Tag>
  //     )}

  //   </span>
  // );

  // const labels = file.labels ? file.labels.map((label) => {
  //   return <Tag key={label} closable onClose={() => handleOnRemoveLabel(label)}>{label}</Tag>;
  // }) : [];

  return (
    <Layout>
      <Seo title={file.title}/>

      <PageHeader
        style={{ backgroundColor: 'white' }}
        title={
          <Breadcrumb>
            <Breadcrumb.Item>{project && <Link to={projectPath(project.id)}>{project.name}</Link>}</Breadcrumb.Item>
            <Breadcrumb.Item>{file.title}</Breadcrumb.Item>
          </Breadcrumb>
        }
        // tags={[
        //   ...labels,
        //   newLabelForm
        // ]}
        extra={[
          <Link key={'edit'} to={fileEditPath(fileID)} >
            <Button type="primary" icon="search">
              Edit
            </Button>
          </Link>,
          <Button key={'approve'} type="primary" icon="search" onClick={handleOnApproval}>
              Approve
          </Button>
        ]}
      />

      <Row>
        <Col span={16} style={{ padding: 12, height: 'calc(100vh - 104px)', overflow: 'auto' }}>
          <Card>
            <Previewer markdown={file && file.content}/>
          </Card>
        </Col>

        <Col span={8} style={{ padding: 12, height: 'calc(100vh - 104px)', overflow: 'auto' }}>
          <Row>
            <CommentList comments={comments} onComment={handleOnComment} onReply={handleOnReply}/>
          </Row>
        </Col>
      </Row>


      {/* @V2 */}
      {/* <Col span={8}>
        <Timeline>
          {activities && activities.map(({ id, type, createdAt, username }) => (
            <Timeline.Item key={id} color={type === 'APPROVAL' ? 'green': 'gray'}>
              {type === 'APPROVAL' ?
                `${username} approved ` :
                `${username} made changes `
              }

              at <Text>{createdAt && createdAt.toDate().toLocaleDateString()}</Text>
            </Timeline.Item>
          ))}
        </Timeline>
      </Col> */}

    </Layout>
  );
};

export default FilesView;
