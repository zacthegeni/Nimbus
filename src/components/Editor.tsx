import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';

interface Props {
  initial?: string;
  onChange?: (value: string) => void;
}

/** Markdown editor with live preview */
export default function Editor({ initial = '', onChange }: Props) {
  const [value, setValue] = useState(initial);
  const handle = (val?: string) => {
    const v = val || '';
    setValue(v);
    onChange?.(v);
  };
  return <MDEditor height={400} value={value} onChange={handle} />;
}
