const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports ={
    salvaDados(curso,tempoEstudado){
        let arquivoCurso = `${__dirname}/data/${curso}.json`;
        if(fs.existsSync(arquivoCurso)){
            this.adicionaTempoCurso(arquivoCurso,tempoEstudado);
        }
        else{
            this.criaArquivoDeCurso(arquivoCurso,{})
            .then(() => {
                this.adicionaTempoCurso(arquivoCurso,tempoEstudado);
            }
            );
        }
    },
    criaArquivoDeCurso(nomeArquivo,conteudoArquivo){
        return jsonfile.writeFile(nomeArquivo,conteudoArquivo)
            .then(() => {
                console.log('Arquivo criado');
            }).catch((err) => {
                console.log(err);
            })
    },
    adicionaTempoCurso(arquivoDoCurso, tempoEstudado){
        let dados = {
            ultimoTempoEstudo: new Date().toString(),
            tempo: tempoEstudado
        };

        jsonfile.writeFile(arquivoDoCurso,dados,{spaces: 2})
            .then(() => {
                console.log('Tempo salvo com sucesso');
            })
            .catch((err) => {
                console.log(err);
            });
    },
    pegaDadosCurso(curso){
        let arquivoCurso = `${__dirname}/data/${curso}.json`;
        return jsonfile.readFile(arquivoCurso);
    },
    pegaNomeDosCursos(){
        let arquivos = fs.readdirSync(`${__dirname}/data`);

        let cursos = arquivos.map((arquivo) => {
            return arquivo.substr(0,arquivo.lastIndexOf('.'));
        })
        return cursos;
    }
}