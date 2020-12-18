const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data');

let linkSobre = document.querySelector('#link-sobre');
let btnPlay = document.querySelector('.botao-play');
let tempoSpan = document.querySelector('.tempo');
let curso = document.querySelector('.curso');

window.onload = () => {
    data.pegaDadosCurso(curso.textContent)
    .then((dados) => {
        tempoSpan.textContent = dados.tempo;
    })
}



linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let isPlaying = false;

btnPlay.addEventListener('click', () => {
    imgs = imgs.reverse();
    btnPlay.src = imgs[0];

    isPlaying = isPlaying ? timer.stop(curso.textContent) : timer.start(tempoSpan);
});


