import { useEffect } from 'react';

/**
 * Handle drag and drop for text, urls and files
 * @param onDrop called with dropped url or file path
 */
export default function useDragDrop(onDrop: (data: string) => void) {
  useEffect(() => {
    function handle(e: DragEvent) {
      e.preventDefault();
      const dt = e.dataTransfer;
      if (!dt) return;
      const url = dt.getData('text/uri-list') || dt.getData('text/plain');
      if (url) onDrop(url);
    }
    window.addEventListener('drop', handle);
    window.addEventListener('dragover', e => e.preventDefault());
    return () => {
      window.removeEventListener('drop', handle);
      window.removeEventListener('dragover', e => e.preventDefault());
    };
  }, [onDrop]);
}
