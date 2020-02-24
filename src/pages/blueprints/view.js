import React, { useState } from 'react';

import { useBlueprint, useComments, useActivities } from 'fire/hooks';
import { labelBlueprint, unlabelBlueprint, createActivity, createComment, replyToComment } from 'fire/actions';

import { CommentList, Layout, Previewer, Seo } from 'components';
import { Button, Card, Col, Icon, Input, PageHeader, Tag, Timeline, Typography, Row } from 'antd';
const { Text } = Typography;

const BlueprintsView = ({ match, user }) => {
  const blueprintID = match.params.blueprintID;

  const [blueprint, loadingBlueprint, errorBlueprint] = useBlueprint(blueprintID);
  const [comments, loadingComments, errorComments] = useComments(blueprintID);
  const [activities, loadingActivities, errorActivities] = useActivities(blueprintID);

  const [inputVisible, setInputVisible] = useState(false);
  const [newLabel, setNewLabel] = useState('');

  if (errorBlueprint) {
    // this could be permisions or other fails
    return <p>error loading blueprint</p>;
  }
  // waiting on react suspense to do this part better
  if(loadingBlueprint) {
    return <p>loading</p>;
  }

  const handleOnComment = (body) => {
    createComment(blueprintID, {
      authorID: user.uid,
      avatarURL: user.photoURL,
      body
    });
  };

  const handleOnReply = (commentID, body) => {
    replyToComment(blueprintID, commentID, {
      authorID: user.uid,
      avatarURL: user.photoURL,
      body,
      commentID
    });
  };

  const handleOnApproval = () => {
    createActivity(blueprintID, {
      userID: user.uid,
      username: user.displayName,
      avatarURL: user.photoURL,
      type: 'APPROVAL'
    });
  };

  const handleOnAddLabel = (newLabel) => {
    labelBlueprint(blueprintID, blueprint.organizationRef.id, newLabel);
    setNewLabel('');
    setInputVisible(false);
  };

  const handleOnRemoveLabel = (label) => {
    unlabelBlueprint(blueprintID, blueprint.organizationRef.id, label);
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

  const labels = blueprint.labels.map((label) => {
    return <Tag key={label} closable onClose={() => handleOnRemoveLabel(label)}>{label}</Tag>;
  });


  return (
    <Layout>
      <Seo title={blueprint.title}/>

      <PageHeader
        style={{ border: '1px solid rgb(235, 237, 240)' }}
        title={blueprint.title}
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
            <Previewer markdown={blueprint && blueprint.content}/>
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

              at <Text>{createdAt.toDate().toLocaleDateString()}</Text>
            </Timeline.Item>
          ))}
        </Timeline>
      </Col>

    </Layout>
  );
};

export default BlueprintsView;
