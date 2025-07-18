import { useEffect, useState } from 'react';
import type { Note } from '../lib/db';

/** Manage notes using IPC */
export default function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
    window.api.notes.list().then(setNotes);
  }, []);
  const create = async (note: Note) => {
    await window.api.notes.create(note);
    setNotes(await window.api.notes.list());
  };
  const update = async (note: Partial<Note> & { id: string }) => {
    await window.api.notes.update(note);
    setNotes(await window.api.notes.list());
  };
  const del = async (id: string) => {
    await window.api.notes.delete(id);
    setNotes(await window.api.notes.list());
  };
  return { notes, create, update, delete: del };
}
