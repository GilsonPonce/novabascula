const { app, ipcMain, BrowserWindow } = require('electron')
const path = require('path');
const url = require('url');

let window;
let windowtickets;
let windowlogin;

function createWindow() {
    window = new BrowserWindow({
        width: 800,
        minWidth: 800,
        maxWidth: 800,
        height: 600,
        minHeight: 600,
        maxHeight: 600,
        backgroundColor: "#ccc",
        resizable: false,
        maximizable: false,
        autoHideMenuBar: true,
        center: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    window.loadURL(url.format({
        pathname: path.join(__dirname, 'view/app.html'),
        protocol: 'file',
        slashes: true
    }));

    window.on('closed', function () {
        window = null;
    })
}

function windowticketsinpro() {
    windowtickets = new BrowserWindow({
        frame: false,
        width: 800,
        minWidth: 800,
        maxWidth: 800,
        height: 400,
        minHeight: 600,
        maxHeight: 600,
        backgroundColor: "#ccc",
        resizable: false,
        maximizable: false,
        autoHideMenuBar: true,
        center: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    windowtickets.loadURL(url.format({
        pathname: path.join(__dirname, 'view/tcksinprocesar.html'),
        protocol: 'file',
        slashes: true
    }));
}

function createwindowlogin() {
    windowlogin = new BrowserWindow({
        width: 400,
        minWidth: 400,
        maxWidth: 400,
        height: 400,
        minHeight: 400,
        maxHeight: 400,
        backgroundColor: "#ccc",
        resizable: false,
        maximizable: false,
        autoHideMenuBar: true,
        center: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    windowlogin.loadURL(url.format({
        pathname: path.join(__dirname, 'view/login.html'),
        protocol: 'file',
        slashes: true
    }));
}

ipcMain.on('openTicket', () => {
    windowticketsinpro();
    windowtickets.once('ready-to-show', () => {
        windowtickets.show();
    });
});

ipcMain.on('openMain', () => {
    createWindow();
    window.once('ready-to-show', () => {
        window.show();
        windowlogin.close();
    });
});

ipcMain.on('closeTicket', () => { windowtickets.close() });
ipcMain.on('hideMain', () => { window.minimize() });
ipcMain.on('showMain', () => { window.show() });
ipcMain.on('info', (event, data) => {
    window.webContents.send('pasoinfo', data);
});



require('electron-reload')(__dirname)

app.allowRendererProcessReuse = false;

app.whenReady().then(() => {
    createwindowlogin()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createwindowlogin()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})



