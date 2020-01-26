import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-github';
import { firestore } from 'services/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

import { Layout, Previewer, Seo } from 'components';

import { Col } from 'antd';

const sampleMarkDown = `
# This is a header And
this is a paragraph

\`\`\`mermaid
graph TD
  A[Christmas] -->|Get money| B(Go shopping)
  B --> C{Let me think}
  C -->|One| D[Laptop]
  C -->|Two| E[iPhone]
  C -->|Three| F[fa:fa-car Car]
\`\`\`

\`\`\`mermaid
classDiagram
  Animal <|-- Duck
  Animal <|-- Fish
  Animal <|-- Zebra
  Animal : +int age
  Animal : +String gender
  Animal: +isMammal()
  Animal: +mate()
  class Duck{
    +String beakColor
    +swim()
    +quack()
  }
  class Fish{
    -int sizeInFeet
    -canEat()
  }
  class Zebra{
    +bool is_wild
    +run()
  }			
\`\`\`

\`\`\`mermaid
sequenceDiagram
  Alice->>+John: Hello John, how are you?
  Alice->>+John: John, can you hear me?
  John-->>-Alice: Hi Alice, I can hear you!
  John-->>-Alice: I feel great!
\`\`\`

\`\`\`mermaid
stateDiagram
  [*] --> Still
  Still --> [*]

  Still --> Moving
  Moving --> Still
  Moving --> Crash
  Crash --> [*]
\`\`\`

\`\`\`mermaid
pie 
  title Pets adopted by volunteers
  "Dogs" : 386
  "Cats" : 85
  "Rats" : 15           
\`\`\`

\`\`\`mermaid
gantt
  dateFormat  YYYY-MM-DD
  title Adding GANTT diagram functionality to mermaid

  section A section
  Completed task            :done,    des1, 2014-01-06,2014-01-08
  Active task               :active,  des2, 2014-01-09, 3d
  Future task               :         des3, after des2, 5d
  Future task2              :         des4, after des3, 5d
\`\`\`

\`\`\`
const kill me 
\`\`\`
`;

const Documents = ({ user }) => {
  const [rawMarkdown, setRawMarkdown] = useState(sampleMarkDown);

  return (
    <Layout>
      <Seo title={'Documents'}/>

      <Col span={12}>
        <AceEditor
          // onLoad={this.onLoad}
          fontSize={14}
          highlightActiveLine={true}
          mode={'markdown'}
          name={'blah2'}
          onChange={setRawMarkdown}
          debounceChangePeriod={50}
          placeholder={'Placeholder Text'}
          showGutter={true}
          showPrintMargin={true}
          theme={'github'}
          value={rawMarkdown}
          setOptions={{
            // enableBasicAutocompletion: false,
            // enableLiveAutocompletion: false,
            // enableSnippets: false,
            // showLineNumbers: true,
            // tabSize: 2
          }}/>
      </Col>

      <Col span={12}>
        <Previewer rawMarkdown={rawMarkdown}/>
      </Col>
    </Layout>
  );
};

export default Documents;
