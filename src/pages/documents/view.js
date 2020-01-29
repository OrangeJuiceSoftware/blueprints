import React from 'react';

import { firestore } from 'services/firebase';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';

import { Layout, Previewer, Seo } from 'components';
import { Button, Col, PageHeader } from 'antd';

const Documents = ({ match, user }) => {
  const documentRef = firestore.collection('files').doc(match.params.documentID);

  const [document, loading, error] = useDocumentDataOnce(documentRef);

  // waiting on react suspense to do this part better
  if(loading) {
    return <p>loading</p>;
  }

  return (
    <Layout>
      <Seo title={'Documents'}/>

      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)'
        }}
        title="Title"
        subTitle="This is a subtitle"
        extra={[
          <Button key={'1'} type="primary" icon="search">
              Preview
          </Button>
        ]}
      />

      <Col span={16}>
        <Previewer markdown={document && document.markdown}/>
      </Col>


    </Layout>
  );
};

export default Documents;
