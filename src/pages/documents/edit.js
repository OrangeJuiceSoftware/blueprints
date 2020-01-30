import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-github';

import { firestore } from 'services/firebase';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';

import { Layout, Previewer, Seo } from 'components';
import { Button, Col, PageHeader, Modal } from 'antd';

const Documents = ({ match, user }) => {
  const documentRef = firestore.collection('files').doc(match.params.documentID);

  const [document, loading, error] = useDocumentDataOnce(documentRef);

  const [showPreview, setShowPreview] = useState(false);
  const [localMarkdown, setLocalMarkdown] = useState();


  const openPreview = () => {
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  const updateDocument = async (newMarkdown) => {
    try {
      setLocalMarkdown(newMarkdown);
      await documentRef.update({
        markdown: newMarkdown
      });
    } catch (error) {
      console.log(error);
    }
  };


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
          <Button key={'1'} type="primary" icon="search" onClick={openPreview}>
              Preview
          </Button>
        ]}
      />

      <Col span={16}>
        <AceEditor
          style={{ width: '100%', height: 'calc(100vh - 40px)' }}
          fontSize={14}
          highlightActiveLine={true}
          mode={'markdown'}
          onChange={updateDocument}
          debounceChangePeriod={750}
          showPrintMargin={false}
          theme={'github'}
          value={localMarkdown}
          onLoad={() => {
            // no crazzzy about this. Can't decide if the editor should fire up the preview or the component render should
            setLocalMarkdown(document.markdown);
          }}
          setOptions={{
            // tabSize: 2
          }}/>
      </Col>

      <Col span={8}>
        this will be the markdown cheat sheet
      </Col>

      <Modal
        title="Preview"
        width={'66.6%'}
        visible={showPreview}
        onOk={closePreview}
        onCancel={closePreview}>

        {/* dont want this running unless it is visible */}
        {showPreview && <Previewer markdown={localMarkdown}/>}
      </Modal>


    </Layout>
  );
};

export default Documents;
