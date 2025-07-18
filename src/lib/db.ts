import Database from 'better-sqlite3';
import { join } from 'node:path';

export interface Note {
  id: string;
  title: string;
  body: string;
  created_at: number;
  updated_at: number;
}

let db: Database | null = null;

/** Initialise database at given path */
export function initDb(dir: string) {
  db = new Database(join(dir, 'notes.db'));
  db.exec(`CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    title TEXT,
    body TEXT,
    created_at INTEGER,
    updated_at INTEGER
  )`);
}

function check() {
  if (!db) throw new Error('DB not initialised');
  return db;
}

export function listNotes(): Note[] {
  return check().prepare('SELECT * FROM notes ORDER BY updated_at DESC').all();
}

export function getNote(id: string): Note | undefined {
  return check().prepare('SELECT * FROM notes WHERE id=?').get(id);
}

export function createNote(n: Note) {
  check().prepare(`INSERT INTO notes (id,title,body,created_at,updated_at)
    VALUES (@id,@title,@body,@created_at,@updated_at)`).run(n);
}

export function updateNote(n: Partial<Note> & { id: string }) {
  const prev = getNote(n.id);
  if (!prev) return;
  const note = { ...prev, ...n, updated_at: Date.now() } as Note;
  check().prepare(`REPLACE INTO notes (id,title,body,created_at,updated_at)
    VALUES (@id,@title,@body,@created_at,@updated_at)`).run(note);
}

export function deleteNote(id: string) {
  check().prepare('DELETE FROM notes WHERE id=?').run(id);
}
