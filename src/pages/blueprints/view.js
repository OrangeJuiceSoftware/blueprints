import React from 'react';

import { useBlueprint, useComments } from 'fire/hooks';
import { createComment, replyToComment } from 'fire/actions';


import { CommentList, Layout, Previewer, Seo } from 'components';
import { Button, Card, Col, PageHeader } from 'antd';

const BlueprintsView = ({ match, user }) => {
  const blueprintID = match.params.blueprintID;
  const [blueprint, loadingBlueprint, errorBlueprint] = useBlueprint(blueprintID);
  const [comments, loadingComments, errorComments] = useComments(blueprintID);

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

  return (
    <Layout>
      <Seo title={blueprint.title}/>

      <PageHeader
        style={{ border: '1px solid rgb(235, 237, 240)' }}
        title={blueprint.title}
        extra={[
          <Button key={'1'} type="primary" icon="search">
              Preview
          </Button>
        ]}
      />

      <Col span={16} offset={4}>
        <Card style={{}}>
          <Previewer markdown={blueprint && blueprint.content}/>
        </Card>
      </Col>

      <Col span={16} offset={4}>
        <CommentList comments={comments} onComment={handleOnComment} onReply={handleOnReply}/>
      </Col>

    </Layout>
  );
};

export default BlueprintsView;
