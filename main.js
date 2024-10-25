const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 200,
  });
  win.webContents.openDevTools();
  win.loadURL('http://localhost:3000/');
};

let tray;

app.whenReady().then(() => {
  createWindow();
  const icon = nativeImage.createFromPath('./logo512.png');
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' },
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip('This is my application');
  tray.setTitle('This is my title');
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});
