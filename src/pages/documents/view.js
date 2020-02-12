import React from 'react';

import useDocument from 'firehooks/useDocument';
import useComments from 'firehooks/useComments';

import { CommentList, Layout, Previewer, Seo } from 'components';
import { Button, Card, Col, PageHeader } from 'antd';

const Documents = ({ match, user }) => {
  const [document, loadingDocument, errorDocument] = useDocument(match.params.documentID);
  const [comments, loadingComments, errorComments, { createComment, replyToComment }] = useComments(match.params.documentID);

  if (errorDocument) {
    // this could be permisions or other fails
    return <p>error loading documnet</p>;
  }
  // waiting on react suspense to do this part better
  if(loadingDocument) {
    return <p>loading</p>;
  }

  const handleOnComment = (body) => {
    createComment({
      authorID: user.uid,
      avatarURL: user.photoURL,
      body
    });
  };

  const handleOnReply = (commentID, body) => {
    replyToComment({
      authorID: user.uid,
      avatarURL: user.photoURL,
      body,
      commentID
    });
  };

  return (
    <Layout>
      <Seo title={'Documents'}/>

      <PageHeader
        style={{ border: '1px solid rgb(235, 237, 240)' }}
        title="Title"
        subTitle="This is a subtitle"
        extra={[
          <Button key={'1'} type="primary" icon="search">
              Preview
          </Button>
        ]}
      />

      <Col span={16} offset={4}>
        <Card style={{}}>
          <Previewer markdown={document && document.markdown}/>
        </Card>
      </Col>

      <Col span={16} offset={4}>
        <CommentList comments={comments} onComment={handleOnComment} onReply={handleOnReply}/>
      </Col>

    </Layout>
  );
};

export default Documents;
