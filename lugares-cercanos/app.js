//Para ejecutar: node app -d "lugar"

const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

// const argv = require('yargs').options({
//     direccion: {
//         alias: 'd',
//         desc: 'Direccion de la ciudad pa obtener el clima',
//         demand: true
//     }
// }).argv;

let getInfo = async(direccion) => {

    try {
        let coors = await lugar.getLugarLatLng(direccion);
        let temp = await clima.getClima(coors.lat, coors.lng);

        return `El clima en ${ coors.direccion } es de ${ temp }`;

    } catch (error) {
        return `No se pudo determinar el clima en ${ direccion }`;
    }

}
let getCoor = async(direccion) => {

    try {
        let coors = await lugar.getLugarLatLng(direccion);

        return `Coordenadas de: ${ coors.direccion }, lat: ${ coors.lat }, lng: ${ coors.lng }`;

    } catch (error) {
        return `No se pudo determinar las coordenadas de ${ direccion }`;
    }

}

// getInfo(argv.direccion)
//     .then(mensaje => console.log(mensaje))
//     .catch(e => console.log(e));

//--------------------------------------------------------------
const colors = require('colors');
const argv = require('./config/yargs').argv;
const lugares = require('./lugares/lugares');

let comando = argv._[0];

switch (comando) {

    case 'listar':
        let listado = lugares.getListado();
        //console.log(listado)
        for (let lugar of listado) {
            console.log('===========Lugar: ========='.cyan);
            console.log('Dir: ', lugar.dir);
            console.log('Lat: ', lugar.lat);
            console.log('Lng:', lugar.lng);
            console.log('=============================='.cyan);
        }
        break;
    case 'clima':
        console.log(argv.lugar);
        getInfo(argv.lugar)
             .then(mensaje => console.log(mensaje))
             .catch(e => console.log(e));
        break;
    case 'buscar':
        //console.log(argv.lugar);
        getCoor(argv.lugar)
             .then(mensaje => console.log(mensaje))
             .catch(e => console.log(e));
        break;

    default:
        console.log('Comando no es reconocido');
}