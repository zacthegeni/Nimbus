import { app, BrowserWindow, shell, protocol } from 'electron';
import path from 'node:path';

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadURL(`file://${path.join(__dirname, '../render/index.html')}`);
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

protocol.handle('https', request => {
  shell.openExternal(request.url, { activate: true });
  return null as any;
});
