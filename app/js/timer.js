const { ipcRenderer } = require('electron');
const moment = require('moment');

let timerInterval;
let tempo;



module.exports = {
    start(el){
        timerInterval = setInterval(() => {
            tempo = moment.duration(el.textContent);
            tempo.add(1,'seconds');
            el.textContent = this.segundosParaTempo(tempo.asSeconds());
        },1000);

        return true;
        
    },

    stop(curso){
        clearInterval(timerInterval);
        timerInterval = null;

        let tempoEstudado = this.segundosParaTempo(tempo.asSeconds());
        ipcRenderer.send('curso-parado',curso,tempoEstudado);
        return false;
    },

    segundosParaTempo(segundos){
        return moment().startOf('day').seconds(segundos).format('HH:mm:ss');
    }
}