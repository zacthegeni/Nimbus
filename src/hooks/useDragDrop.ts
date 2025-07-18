import { useEffect } from 'react';

/**
 * Hook to capture drag&drop of text, images, files and URLs.
 * Calls onDrop with the dropped string or file path.
 */
export default function useDragDrop(onDrop: (data: string) => void) {
  useEffect(() => {
    const handle = (e: DragEvent) => {
      e.preventDefault();
      const dt = e.dataTransfer;
      if (!dt) return;
      if (dt.files && dt.files.length > 0) {
        for (const f of Array.from(dt.files)) onDrop(f.path);
        return;
      }
      const text = dt.getData('text/uri-list') || dt.getData('text/plain');
      if (text) onDrop(text);
    };
    window.addEventListener('drop', handle);
    window.addEventListener('dragover', e => e.preventDefault());
    return () => {
      window.removeEventListener('drop', handle);
      window.removeEventListener('dragover', e => e.preventDefault());
    };
  }, [onDrop]);
}
