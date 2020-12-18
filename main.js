const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data');
const template = require('./template');

let tray = null;
let trayMenu;
let menuPrincipal;
let mainWindow;

app.on('ready', () => {
    console.log("Aplicação iniciada");
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });

    tray = new Tray(__dirname + './app/img/icon.png');

    trayMenu = Menu.buildFromTemplate(template.geraTrayTemplate(mainWindow));
    tray.setContextMenu(trayMenu);

    menuPrincipal = Menu.buildFromTemplate(template.geraMenuAplicacao(app));

    Menu.setApplicationMenu(menuPrincipal);
    
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

    mainWindow.openDevTools();
});

app.on('window-all-closed',() => {

    app.quit();
});

let aboutWindow = null

ipcMain.on('abrir-janela-sobre', () => {
  if(aboutWindow== null){
    aboutWindow = new BrowserWindow({
        width: 300,
        height: 250,
        alwaysOnTop: true,
        frame: false,

    });

    aboutWindow.on('closed',() => {
        aboutWindow = null;
    }
    )
  }

  aboutWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

ipcMain.on('fechar-janela-sobre', () => {
    aboutWindow.close();
    aboutWindow = null;
});

ipcMain.on('curso-parado',(event,curso,tempoEstudado) => {
    console.log(curso);
    console.log(tempoEstudado);
    data.salvaDados(curso,tempoEstudado);
});

ipcMain.on('curso-adicionado', (event,novocurso) => {
    data.salvaDados(novocurso,'00:00:00');
    trayMenu = Menu.buildFromTemplate(template.geraTrayTemplate(mainWindow));
    tray.setContextMenu(trayMenu);
});

