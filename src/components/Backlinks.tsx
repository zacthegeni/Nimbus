import useNotes from '../hooks/useNotes';
import { useMemo } from 'react';

interface Props {
  id: string;
}

/** Show backlinks referencing a note via [[id]] */
export default function Backlinks({ id }: Props) {
  const { notes } = useNotes();
  const links = useMemo(() =>
    notes.filter(n => n.body.includes(`[[${id}]]`)), [notes, id]);
  if (!links.length) return null;
  return (
    <div className="mt-4">
      <h3 className="text-sm font-bold">Backlinks</h3>
      <ul className="list-disc pl-4">
        {links.map(n => (
          <li key={n.id}>{n.title || n.id}</li>
        ))}
      </ul>
    </div>
  );
}
