import { app, BrowserWindow, ipcMain, shell, globalShortcut, protocol } from 'electron';
import path from 'node:path';
import { initDb, listNotes, createNote, updateNote, deleteNote } from '../src/lib/db.js';

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../render/index.html'));
  } else {
    win.loadURL('http://localhost:5173');
  }
}

app.whenReady().then(() => {
  initDb(app.getPath('userData'));
  createWindow();
  globalShortcut.register('CommandOrControl+Shift+N', () => {
    win?.show();
  });
  protocol.handle('https', request => {
    shell.openExternal(request.url);
    return null as any;
  });
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('notes:list', () => listNotes());
ipcMain.handle('notes:create', (_e, note) => createNote(note));
ipcMain.handle('notes:update', (_e, note) => updateNote(note));
ipcMain.handle('notes:delete', (_e, id) => deleteNote(id));
ipcMain.handle('openExternal', (_e, url) => shell.openExternal(url));
