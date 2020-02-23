import React, { useState } from 'react';

import { useBlueprint, useComments, useActivities } from 'fire/hooks';
import { labelBlueprint, createActivity, createComment, replyToComment } from 'fire/actions';

import { CommentList, Layout, Previewer, Seo } from 'components';
import { Button, Card, Col, Icon, Input, PageHeader, Tag, Timeline, Row } from 'antd';

const BlueprintsView = ({ match, user }) => {
  const blueprintID = match.params.blueprintID;

  const [blueprint, loadingBlueprint, errorBlueprint] = useBlueprint(blueprintID);
  const [comments, loadingComments, errorComments] = useComments(blueprintID);
  const [activities, loadingActivities, errorActivities] = useActivities(blueprintID);

  const [inputVisible, setInputVisible] = useState(false);
  const [newTag, setNewTag] = useState('');

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

  const handleOnSaveTag = (newTag) => {
    labelBlueprint(blueprintID, blueprint.organizationRef.id, newTag);
    setNewTag('');
    setInputVisible(false);
  };


  const newTagForm = (
    <span key={'newFrom'}>
      {inputVisible && (
        <Input
          type="text"
          size="small"
          style={{ width: 78 }}
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onBlur={() => handleOnSaveTag(newTag)}
          onPressEnter={() => handleOnSaveTag(newTag)}
        />
      )}

      {!inputVisible && (
        <Tag key={'newButton'} onClick={() => setInputVisible(true)} style={{ background: '#fff', borderStyle: 'dashed' }}>
          <Icon type="plus" /> New Tag
        </Tag>
      )}

    </span>
  );


  return (
    <Layout>
      <Seo title={blueprint.title}/>

      <PageHeader
        style={{ border: '1px solid rgb(235, 237, 240)' }}
        title={blueprint.title}
        tags={[
          <Tag key={1}>Tag 1</Tag>,
          <Tag key={2}>
            <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
          </Tag>,
          <Tag key={3} closable onClose={console.log()}>
          Tag 2
          </Tag>,
          <Tag key={4} closable onClose={console.log()}>
          Prevent Default
          </Tag>,
          newTagForm
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
          <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item color="red">
            <p>Solve initial network problems 1</p>
            <p>Solve initial network problems 2</p>
            <p>Solve initial network problems 3 2015-09-01</p>
          </Timeline.Item>
          <Timeline.Item>
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
          </Timeline.Item>
          <Timeline.Item color="gray">
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
          </Timeline.Item>
          <Timeline.Item color="gray">
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
          </Timeline.Item>
        </Timeline>
      </Col>

    </Layout>
  );
};

export default BlueprintsView;
