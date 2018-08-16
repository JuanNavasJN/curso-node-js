const opt1 = {
    descripcion: {
        demand: true,
        desc: 'Descripcion de la tarea por hacer',
        alias: 'd'
    }
}

const opt2 = {
    descripcion: {
        demand: true,
        desc: 'Descripcion de la tarea por hacer',
        alias: 'd'
    },
    completado: {
        alias: 'c',
        desc: 'Marca como completado o pendiente la tarea',
        default: true
    }
}

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', opt1)
    .command('actualizar', 'Actualiza el estado completado de una tarea', opt2)
    .command('borrar', 'Borrar un elemento por hacer', opt1)
    .help()
    .argv;

module.exports = {
    argv
}