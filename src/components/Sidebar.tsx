import { useEffect, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import useNotes from '../hooks/useNotes';

export default function Sidebar() {
  const { notes } = useNotes();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');

  const fuse = useMemo(() => new Fuse(notes, { keys: ['title', 'body'] }), [notes]);
  const results = q ? fuse.search(q).map(r => r.item) : notes;

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-start justify-center p-4">
      <div className="bg-white dark:bg-slate-800 p-2 rounded w-80">
        <input
          autoFocus
          className="w-full border p-1 mb-2 dark:bg-slate-700"
          placeholder="Search"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <ul className="max-h-60 overflow-auto">
          {results.map(n => (
            <li key={n.id} className="p-1 border-b last:border-b-0">
              {n.title || 'Untitled'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
