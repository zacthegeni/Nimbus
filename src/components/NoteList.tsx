import React from 'react';

interface Props { notes: string[] }

export default function NoteList({ notes }: Props) {
  return (
    <ul className="note-list">
      {notes.map((n, i) => <li key={i}>{n}</li>)}
    </ul>
  );
}
