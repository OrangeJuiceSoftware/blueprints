import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { Avatar, Button, Card, Col, Comment, Form, Input, List, Skeleton } from 'antd';

//////////////////////////////////
///// Start Local Components /////
//////////////////////////////////
const LoadingComments = () => (
  <Card>
    <List itemLayout="vertical" size="large" dataSource={[3, 1]} renderItem={item => (
      <List.Item>
        <Skeleton avatar paragraph={{ rows: item }} />
      </List.Item>
    )}/>
  </Card>
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <Input.TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

const NestedComments = ({ commentsRef, commentRef, onCreate }) => {
  const [commentsQuerySnapshot, loadingComments, errorComments] = useCollection(commentsRef.where('parentRef', '==', commentRef));

  if (loadingComments) {
    return <LoadingComments/>;
  }

  const commentsData = commentsQuerySnapshot.docs.map((commentSnapshot) => {
    const commentData = commentSnapshot.data();
    commentData.ref = commentSnapshot.ref;

    return commentData;
  });

  return (<>
    {Boolean(commentsData.length) && commentsData.map((item) => (
      <Comment
        key={item.ref.path}
        actions={[<span key="comment-list-reply-to-0">Reply to</span>]}
        author={item.authorID}
        avatar={item.avatarURL}
        content={item.content}
        datetime={item.datetime}
      >
        <NestedComments commentsRef={commentsRef} commentRef={item.ref}/>
      </Comment>
    ))}
  </>);
};

////////////////////////////////
///// End Local Components /////
////////////////////////////////

const CommentsList = ({ commentsRef, commonCreate }) => {
  const [commentsQuerySnapshot, loadingComments, errorComments] = useCollection(commentsRef.where('parentRef', '==', null));

  // waiting on react suspense to do this part better
  if (errorComments) {
    return <p>there was an error loading comments</p>;
  }

  if(loadingComments) {
    return <LoadingComments/>;
  }

  const commentsData = commentsQuerySnapshot.docs.map((commentSnapshot) => {
    const commentData = commentSnapshot.data();
    commentData.ref = commentSnapshot.ref;

    return commentData;
  });

  const submitComment = () => {

  };

  return (
    <Card>
      <List
        className="comment-list"
        header={'Comments'}
        itemLayout="horizontal"
        dataSource={commentsData}
        renderItem={item => (
          <List.Item>
            <Comment
              actions={[<span key="comment-list-reply-to-0">Reply to</span>]}
              author={item.authorID}
              avatar={item.avatarURL}
              content={item.content}
              datetime={item.datetime}
            >
              <NestedComments commentsRef={commentsRef} commentRef={item.ref}/>
            </Comment>
          </List.Item>
        )}
      />

      <Editor/>
    </Card>
  );
};

export default CommentsList;