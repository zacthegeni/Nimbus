import { useState } from 'react';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import Backlinks from './components/Backlinks';
import useDragDrop from './hooks/useDragDrop';
import useNotes from './hooks/useNotes';
import { v4 as uuid } from 'uuid';

export default function App() {
  const { notes, create, update } = useNotes();
  const [current, setCurrent] = useState<string | null>(null);
  const note = notes.find(n => n.id === current);

  useDragDrop(data => {
    const id = uuid();
    create({ id, title: data.slice(0, 30), body: data, created_at: Date.now(), updated_at: Date.now() });
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="w-60 border-r">
        <button
          className="w-full p-2 border-b"
          onClick={() => {
            const id = uuid();
            create({ id, title: 'New Note', body: '', created_at: Date.now(), updated_at: Date.now() });
            setCurrent(id);
          }}
        >New Note</button>
        <NoteList onSelect={setCurrent} />
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {note && (
          <>
            <Editor initial={note.body} onChange={body => update({ id: note.id, body })} />
            <Backlinks id={note.id} />
          </>
        )}
      </div>
    </div>
  );
}
