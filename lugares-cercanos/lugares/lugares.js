
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
        cadena += `${punto.lat},${punto.lng}`;
    })
    return `&destinations=${cadena}`;
}

//https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=YOUR_API_KEY
// const consultar = (origen) => {


    
//     let encodeUrl = encodeURI(direccion);

//     let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${ encodeUrl }&key=AIzaSyAf2v1f4UFILM-kPEc35LmSrHXnUsYIIWo`);

//     if (resp.data.status === 'ZERO_RESULTS') {
//         throw new Error(`No hay resultados para la ciudad ${ direccion }`);
//     }

//     let location = resp.data.results[0];
//     let coors = location.geometry.location;
//     //console.log(coors)
//     return {
//         direccion: location.formatted_address,
//         lat: coors.lat,
//         lng: coors.lng
//     }
// }

module.exports = {
    getListado,
    generateOrigins,
    destinations
}