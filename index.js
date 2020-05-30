const { app, BrowserWindow, dialog, globalShortcut } = require('electron');
const config = require('./config');

var defaultUrl = config.data.defaultUrl;

var window;
var currentUrlWindow;

function urlWindow(parent){
    if(currentUrlWindow) {
        currentUrlWindow.focus();
        return;
    };
    var win = new BrowserWindow({
        parent, width:600, height:130, resizable:false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile(`${__dirname}/frontend/promptWindow.html`)
    win.removeMenu();
    win.on('ready-to-show', win.show);
    win.on('closed', () => {
        currentUrlWindow = null;
    });
    currentUrlWindow = win;
}

function createWindow(){
    window = new BrowserWindow({
        title:"DevBrowser",
        width:860, height:480,
        show:false, autoHideMenuBar:true,
        darkTheme:true,
        icon:`${__dirname}/img/icon.png`
    });
    async function loadPage(){
        urlWindow(window);
    };

    let ret = globalShortcut.register('Control+Shift+P', () => {
        if(!window.isFocused()) return;
        loadPage();
    });
    if(defaultUrl){
        window.loadURL(defaultUrl).catch(e => {
            window.loadFile(`${__dirname}/frontend/loadFailed.html`);
        })
    }else{
        window.loadFile(`${__dirname}/frontend/welcome.html`);
    }

    window.setDefaultUrl = (url) => {
        config.data.defaultUrl = url;
        config.save();
    }

    window.on('ready-to-show', () => {
        window.show();
    });
}

function main(){
    createWindow();
}

app.on('ready', () => {
    main();
});

app.on('window-all-closed', () => {
    app.quit()
});