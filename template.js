const data = require('./data');
const { ipcMain } = require('electron');

module.exports = {
    geraTrayTemplate(mainWindow){
        let template = [
            {
                'label': 'Cursos'
            },
            {
                type: 'separator'
            }
        ];

        let cursos = data.pegaNomeDosCursos();

        cursos.forEach((curso) => {
            let menuItem = {
                'label': curso,
                type: 'radio',
                click: () => {
                    mainWindow.send('curso-trocado',curso);
                }
                
            }
            template.push(menuItem);
        });

        return template;
    },

    geraMenuAplicacao(app){
        let template =[
            {
                label: app.getName(),
                submenu: [
                    { role: 'quit', accelerator: 'CmdOrCtrl + Q' },
                    { type: 'separator' },
                    {
                        label: "About",
                        click: () => {
                            ipcMain.emit('abrir-janela-sobre');
                        },
                        accelerator: 'CmdOrCtrl + I' 
                        
                    }
                ]
            },
            {
                label: 'Window',
                submenu: [
                    { role: 'minimize', accelerator: 'Alt + M'},
                    { role: 'reload'},
                    { role: 'toggledevtools'},
                    { role: 'close' }
                ]
            }
        ]
        return template;
    }
}