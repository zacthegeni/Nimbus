import useNotes from '../hooks/useNotes';

interface Props {
  onSelect: (id: string) => void;
}

export default function NoteList({ onSelect }: Props) {
  const { notes } = useNotes();
  return (
    <ul className="overflow-y-auto">
      {notes.map(n => (
        <li
          key={n.id}
          className="p-2 border-b cursor-pointer hover:bg-slate-100"
          onClick={() => onSelect(n.id)}
        >
          {n.title || 'Untitled'}
        </li>
      ))}
    </ul>
  );
}
