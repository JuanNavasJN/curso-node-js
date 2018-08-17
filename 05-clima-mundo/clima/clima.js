const axios = require('axios');

const getClima = async(lat, lng) => {

    let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lng }&appid=37098be5dc50bed8356858ceb79357e3&units=metric`);

    return resp.data.main.temp;
}

module.exports = {
    getClima
}