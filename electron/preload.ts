import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  notes: {
    list: () => ipcRenderer.invoke('notes:list'),
    create: (n: unknown) => ipcRenderer.invoke('notes:create', n),
    update: (n: unknown) => ipcRenderer.invoke('notes:update', n),
    delete: (id: string) => ipcRenderer.invoke('notes:delete', id)
  },
  openExternal: (url: string) => ipcRenderer.invoke('openExternal', url)
});
