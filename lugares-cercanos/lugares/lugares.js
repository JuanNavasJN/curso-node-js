const axios = require('axios');
const colors = require('colors');

let listado = [];
let origins = '';

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

const generateOrigins = (origen) => {
    return `origins=${origen.lat},${origen.lng}`;
}

const destinations = () => {
    let cadena = '';
    cargarDB();
    listado.forEach(punto =>{
        cadena += `${punto.lat},${punto.lng}|`;
    })
    return `&destinations=${cadena}`;
}

////https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=10.482899,-66.8992489&destinations=10.508586,-66.87313610.49715,-66.84425410.484364,-66.8611210.476663,-66.87596910.481558,-66.89762&key=AIzaSyAf2v1f4UFILM-kPEc35LmSrHXnUsYIIWo

//https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=10.482899,-66.8992489&destinations=10.508586,-66.87313610.49715,-66.84425410.484364,-66.8611210.476663,-66.87596910.481558,-66.89762&key=AIzaSyAf2v1f4UFILM-kPEc35LmSrHXnUsYIIWo
//https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=YOUR_API_KEY

const consultar = async (address) => {

    let encodeUrl = encodeURI(address);
    let url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&${encodeUrl}&key=AIzaSyAf2v1f4UFILM-kPEc35LmSrHXnUsYIIWo`;
    //return url;

    let resp = await axios.get(url);

    if (resp.data.status === 'ZERO_RESULTS') {
        throw new Error(`No hay resultados`);
    }

    let location = resp.data;
    //return location;
    let origen = resp.data.origin_addresses;
    let destinos = resp.data.destination_addresses;
    let distancias = resp.data.rows[0].elements;
    let lugares = [];
    let i = 0;

    destinos.forEach( destino => {
        //console.log(destino)
        lugares[i] = {
            lugar: destino,
            distancias: distancias[i]
        }
        i++;
    })

    let lugares2 = lugares;
    lugares2.sort((a, b) => {
        if(a.distancias.distance.value < b.distancias.distance.value){
            return -1;
        }
        if(a.distancias.distance.value > b.distancias.distance.value){
            return 1;
        }
        return 0;
    })

    return {
        origen,
        destinos: lugares2
    };  
}

const mensaje = (element) => {

    let lugares = '';
    element.destinos.forEach(lugar => {
        lugares += `${lugar.lugar} - distancia: ${ colors.cyan(lugar.distancias.distance.text)}\n`
    })

    return `${colors.yellow('Los lugares mas cercanos a: ')} ${element.origen} son:\n ${lugares}`;
    //return element.destinos
}

module.exports = {
    getListado,
    generateOrigins,
    destinations,
    consultar,
    mensaje
}