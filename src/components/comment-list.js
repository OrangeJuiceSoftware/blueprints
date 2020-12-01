import React, { useState } from 'react';

import { Avatar, Button, Card, Col, Comment, Form, Input, List, Row, Skeleton } from 'antd';

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

const Editor = ({ onSubmit, submitting }) => {
  const [formValue, setFormValue] = useState('');

  return (
    <div>
      <Form.Item>
        <Input.TextArea rows={4} onChange={(e) => setFormValue(e.target.value)} value={formValue} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={() => onSubmit(formValue)} type="primary">Comment</Button>
      </Form.Item>
    </div>
  );
};

////////////////////////////////
///// End Local Components /////
////////////////////////////////

const CommentsList = ({ comments, onComment, onReply }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: 16 }}>
      <List
        locale={{
          emptyText: (
            <span>
            </span>
          )
        }}
        className="comment-list"
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={comment => (
          <li>
            <Comment
              // maybe add some emojis
              // actions={[<span key="comment-list-reply-to-0">Reply to</span>]}
              author={comment.authorID}
              avatar={comment.avatarURL}
              content={comment.body}
              datetime={comment.datetime}
            >
              {comment.replies.map((reply) => (
                <Comment
                  key={reply.id}
                  author={reply.authorID}
                  avatar={reply.avatarURL}
                  content={reply.body}
                  datetime={reply.datetime}
                />
              ))}
            </Comment>
            <Editor onSubmit={(body) => onReply(comment.id, body)}/>
          </li>
        )}
      />

      <Editor onSubmit={onComment}/>
    </div>
  );
};

export default CommentsList;