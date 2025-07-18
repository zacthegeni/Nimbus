import React, { useState } from 'react';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import useDragDrop from './hooks/useDragDrop';

export default function App() {
  const [notes, setNotes] = useState<string[]>([]);
  useDragDrop(url => setNotes(n => [...n, url]));
  return (
    <div className="app">
      <Sidebar />
      <NoteList notes={notes} />
      <Editor />
    </div>
  );
}
