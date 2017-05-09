// main.js

const electron = require('electron');
const app = electron.app

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let isQuitting = false;

const isAlreadyRunning = app.makeSingleInstance(() => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore();
		}
		mainWindow.show();
	}
});

if (isAlreadyRunning) {
	app.quit();
}

function createMainWindow () {

  // Create the browser window.
  const win = new electron.BrowserWindow({
    width: 800,
    height: 600,
		// titleBarStyle: 'hidden-inset'
  });

  // and load the index.html of the app.
  win.loadURL('https://fonts.google.com')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  win.on('close', e => {
  		if (!isQuitting) {
  			e.preventDefault();

  			if (process.platform === 'darwin') {
  				app.hide();
  			} else {
  				win.hide();
  			}
  		}
  	});

  return win
}

app.on('ready', () => {
	mainWindow = createMainWindow();

	const {webContents} = mainWindow;

	webContents.on('dom-ready', () => {
		mainWindow.show();
	});

	webContents.on('new-window', (e, url) => {
		e.preventDefault();
		electron.shell.openExternal(url);
	});
});

app.on('activate', function () {
  mainWindow.show();
})

app.on('before-quit', () => {
	isQuitting = true;
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
