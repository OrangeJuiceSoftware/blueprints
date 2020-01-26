const visit = require('unist-util-visit');

function createMermaidDiv(index, contents) {
  return {
    type: 'html',
    value: `<div class="mermaid" id="mmd-${index}">
      ${contents}
    </div>`
  };
}

function visitCodeBlock(ast) {
  return visit(ast, 'code', (node, index, parent) => {
    const { lang, value } = node;

    // If this codeblock is not mermaid, bail
    if (lang !== 'mermaid') {
      return node;
    }

    // Transform into a div
    const newNode = createMermaidDiv(index, value);
    parent.children.splice(index, 1, newNode);
    return newNode;
  });
}

function mermaidRemark() {
  return function transformer(ast, vFile, next) {
    visitCodeBlock(ast, vFile);

    if (typeof next === 'function') {
      return next(null, ast, vFile);
    }

    return ast;
  };
}

module.exports = mermaidRemark;
