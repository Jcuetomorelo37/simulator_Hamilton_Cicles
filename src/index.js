const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { findAllHamiltonianCycles } = require('./hamilton');
const { findAllHamiltonianCyclesDirected } = require('./programacion_dinamica')

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  //mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

if (process.env.NODE_ENV !== "production") {
  require("electron-reloader")(module);
  electron: path.join(__dirname, "../node_modules", ".bin", "electron");
}

ipcMain.handle('find-hamiltonian-cycle', (event, graph) => {
  return findAllHamiltonianCycles(graph);
});

ipcMain.handle('find-hamiltonian-cycle-direct', (event, graph) => {
  return findAllHamiltonianCyclesDirected(graph);
});