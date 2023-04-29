const { app, BrowserWindow, Menu, session, Notification, shell } = require('electron')
const url = require('url')
const path = require('path')

app.setUserTasks([
    {
        program: process.execPath,
        arguments: '--new-window',
        iconPath: process.execPath,
        iconIndex: 0,
        title: 'New Window',
        description: 'Create a new window'
    }
])

let win = null

function clearSiteData() {
    session.defaultSession.clearStorageData({
        storages: ['cookies', 'cache', 'indexdb', 'localstorage']
    });
    win.webContents.reloadIgnoringCache();
}

function createWindow() {
    win = new BrowserWindow({ title: 'Swipe-Billing', width: 1200, height: 700, icon: './icon.png', progressBar: true })
    win.loadURL('https://app.getswipe.in')

    const { Menu } = require('electron');

    const menuTemplate = [
        { role: 'copy' },
        { type: 'separator' },
        { role: 'selectall' },
        { type: 'separator' },
        { role: 'paste' },
        { type: 'separator' },
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        {
            label: 'Reload',
            click: () => {
                win.webContents.reloadIgnoringCache();
            }
        }
    ];

    // Create the context menu
    const contextMenu = Menu.buildFromTemplate(menuTemplate);

    // Set the context menu on the window
    win.webContents.on('context-menu', (e, params) => {
        contextMenu.popup(win, params.x, params.y);
    });

    const appSession = session.defaultSession

    appSession.on('will-download', (event, item, webContents) => {

        app.setAppUserModelId("Swipe Billing"),

            item.on('done', (event, state) => {
                if (state === 'completed') {
                    const notification = new Notification({
                        icon: './icon.png',
                        title: 'Download complete',
                        body: `File ${item.getFilename()} has been downloaded.`
                    })
                    notification.show()
                }
            })
    })

    // create subsequent windows without frame
    app.on('browser-window-created', (event, window) => {
        if (window !== win) {
            window.setMenu(null)
        }
    })
}

const template = [
    {
        label: 'Go back',
        accelerator: 'Alt+Left',
        click: (menuItem, browserWindow) => {
            if (browserWindow.webContents.canGoBack()) {
                browserWindow.webContents.goBack()
            }
        }
    },
    {
        label: 'Refresh',
        click: () => {
            win.webContents.reloadIgnoringCache();
        }
    },

    {
        label: 'Clear Cache',
        click: clearSiteData
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Whatsapp',
                click: async () => {
                    const { shell } = require('electron')
                    await shell.openExternal('https://api.whatsapp.com/send?phone=918121335436&text=Hello%20Swipe! I need help with')
                }
            },

            {
                label: 'E-Mail',
                click: async () => {
                    const { shell } = require('electron');
                    // Define the recipient, subject, and body of the email
                    const recipient = 'team@getswipe.in';
                    const subject = 'I Need a Help With';
                    const body = 'Hello Swipe, \n\n I need a Help With';
                    // Construct the mailto URL
                    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    // Open the default email client with the pre-populated email
                    await shell.openExternal(mailtoUrl)
                }
            }
        ]
    },
]


const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

