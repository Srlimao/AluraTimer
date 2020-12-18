const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data');

let linkSobre = document.querySelector('#link-sobre');
let btnPlay = document.querySelector('.botao-play');
let tempoSpan = document.querySelector('.tempo');
let curso = document.querySelector('.curso');
let botaoAdicionar = document.querySelector('.botao-adicionar');
let campoAdicionar = document.querySelector('.campo-adicionar');

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

ipcRenderer.on('curso-trocado',(event,nomeCurso) => {
    data.pegaDadosCurso(nomeCurso).then((dados) => {
        tempoSpan.textContent = dados.tempo;
    }
    )
    curso.textContent = nomeCurso;
    
});

botaoAdicionar.addEventListener('click',() => {
    let novocurso = campoAdicionar.value;
    curso.textContent = novocurso;    
    tempoSpan.textContent = "00:00:00";
    campoAdicionar.value = "";

    ipcRenderer.send('curso-adicionado', novocurso);
}
)


