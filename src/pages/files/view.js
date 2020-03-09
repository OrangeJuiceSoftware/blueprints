import React, { useState } from 'react';
import { projectPath } from 'routes';

import { useFile, useProject, useComments, useActivities } from 'fire/hooks';
import { labelFile, unlabelFile, approveFile, createActivity, createComment, replyToComment } from 'fire/actions';

import { CommentList, Layout, Previewer, Seo } from 'components';
import { Button, Card, Col, Icon, Input, PageHeader, Tag, Timeline, Typography, Row } from 'antd';
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

  const handleOnAddLabel = (newLabel) => {
    labelFile(fileID, file.projectRef.id, newLabel);
    setNewLabel('');
    setInputVisible(false);
  };

  const handleOnRemoveLabel = (label) => {
    unlabelFile(fileID, file.projectRef.id, label);
  };

  const newLabelForm = (
    <span key={'newFrom'}>
      {inputVisible && (
        <Input
          type="text"
          size="small"
          style={{ width: 78 }}
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          onBlur={() => handleOnAddLabel(newLabel)}
          onPressEnter={() => handleOnAddLabel(newLabel)}
        />
      )}

      {!inputVisible && (
        <Tag key={'newButton'} onClick={() => setInputVisible(true)} style={{ background: '#fff', borderStyle: 'dashed' }}>
          <Icon type="plus" /> New Tag
        </Tag>
      )}

    </span>
  );

  const labels = file.labels ? file.labels.map((label) => {
    return <Tag key={label} closable onClose={() => handleOnRemoveLabel(label)}>{label}</Tag>;
  }) : [];

  return (
    <Layout>
      <Seo title={file.title}/>

      <PageHeader
        style={{ border: '1px solid rgb(235, 237, 240)' }}
        title={
          <>
            {project && <Link to={projectPath(project.id)}>{project.name}</Link>}
            <Title>{file.title}</Title>
          </>
        }
        tags={[
          ...labels,
          newLabelForm
        ]}
        extra={[
          <Button key={'1'} type="primary" icon="search" onClick={handleOnApproval}>
              Approve
          </Button>
        ]}
      />

      <Col span={16}>
        <Row>
          <Card style={{}}>
            <Previewer markdown={file && file.content}/>
          </Card>
        </Row>

        <Row>
          <CommentList comments={comments} onComment={handleOnComment} onReply={handleOnReply}/>
        </Row>
      </Col>

      <Col span={8}>
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
      </Col>

    </Layout>
  );
};

export default FilesView;
