const data = require('./data');

module.exports = {
    geraTrayTemplate(){
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
                type: 'radio'
            }

            template.push(menuItem);
        });

        return template;
    }
}