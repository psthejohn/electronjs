const { app, BrowserWindow } = require('electron')

const path = require('path')


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
          }
    })

    win.loadFile('index.html')
}
app.whenReady().then(() => {
    createWindow()
    // **** Reading activate event on app module ****
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// **** For MacOS applications does not close in background, we close them on window closure ****
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
