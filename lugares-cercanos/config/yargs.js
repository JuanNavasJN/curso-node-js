const opt1 = {
    lugar: {
        desc: 'Buscar lugares cercanos',
        alias: 'l'
    }
}

// const opt2 = {
//     lugar: {
//         desc: 'Buscar lugares cercanos',
//         alias: 'c'
//     }
// }

const argv = require('yargs')
    .command('listar', 'Listar lugares', opt1)
    .command('clima', 'Buscar clima', opt1)
    .command('buscar', 'Buscar lugares cercanos', opt1)
    // .command('borrar', 'Borrar un elemento por hacer', opt1)
    .help()
    .argv;

module.exports = {
    argv
}