import React, { useState, useEffect } from 'react';
import mermaid from 'mermaid';
import unified from 'unified';

// Unified plugins
import html from 'remark-html';
import markdownParse from 'remark-parse';
import mermaidRmk from '../parser';
// import remark2react from 'remark-react';

mermaid.initialize({
  startOnLoad: true
});

export default ({ markdown = '' }) => {
  const [result, setResult] = useState();

  useEffect(() => {
    const processor = unified()
      .use(markdownParse)
      .use(mermaidRmk)
      .use(html);

    processor.process(markdown, (err, file) => {
      if (err) {
        return console.log(err);
      }

      setResult(file.contents);
    });

  }, [markdown]);

  useEffect(() => {
    try {
      mermaid.init(); //Mermaid API is shit... No way around this unless you have the IDs of the divs...
    } catch (error) {
      console.log(error);
    }
  }, [result]);

  return <div dangerouslySetInnerHTML={{ __html: result }}></div>;
};