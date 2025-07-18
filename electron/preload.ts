import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  drop: (data: unknown) => ipcRenderer.invoke('drop', data)
});
