import { describe, it, expect, vi } from 'vitest';
import useDragDrop from '../src/hooks/useDragDrop';

describe('useDragDrop', () => {
  it('calls onDrop on drop', () => {
    const fn = vi.fn();
    useDragDrop(fn);
    const event = new DragEvent('drop', { dataTransfer: new DataTransfer() });
    event.dataTransfer?.setData('text/plain', 'test');
    window.dispatchEvent(event);
    expect(fn).toHaveBeenCalledWith('test');
  });
});
