
let listado = [];

const cargarDB = () => {

    try {
        listado = require('./listado.json');
    } catch (error) {
        listado = [];
    }
}

const getListado = () => {
    cargarDB();
    return listado;
}

module.exports = {
    getListado
}