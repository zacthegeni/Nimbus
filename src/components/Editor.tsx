import React, { useState } from 'react';
import { marked } from "marked";

/** Live markdown editor with preview */
export default function Editor() {
  const [text, setText] = useState('');
  return (
    <div className="editor">
      <textarea value={text} onChange={e => setText(e.target.value)} />
      <div className="preview" dangerouslySetInnerHTML={{ __html: marked.parse(text) }} />
    </div>
  );
}
