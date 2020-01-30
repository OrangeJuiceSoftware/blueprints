import React from 'react';

import { firestore } from 'services/firebase';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';

import { CommentList, Layout, Previewer, Seo } from 'components';
import { Button, Card, Col, PageHeader } from 'antd';

const Documents = ({ match, user }) => {
  const documentRef = firestore.collection('files').doc(match.params.documentID);
  const commentsRef = documentRef.collection('comments');

  const [document, loadingDocument, errorDocument] = useDocumentDataOnce(documentRef);

  if (errorDocument) {
    // this could be permisions or other fails
    return <p>error loading documnet</p>;
  }
  // waiting on react suspense to do this part better
  if(loadingDocument) {
    return <p>loading</p>;
  }

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
        <CommentList commentsRef={commentsRef} user={user}/>
      </Col>

    </Layout>
  );
};

export default Documents;
