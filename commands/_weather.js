const { getData } = require('../helpers/helpers');
require('dotenv').config();

module.exports = weather = (message) => {
	getData(
		`https://api.openweathermap.org/data/2.5/weather?q=${message.content.split(' ')[1]}&appid=${process.env.API}`
	)
		.then((data) =>
			message.channel.send(`
                \t
                \tLon: ${data.coord.lon} 
                \tLat: ${data.coord.lat}
                \tDescription: ${data.weather[0].description}
                \tTemperature: ${Math.round(data.main.temp - 273.15)} °C
                \tHumidity: ${data.main.humidity} %
                \tPressure: ${data.main.pressure} hPa
                \tWind: ${data.wind.speed} Bf`)
		)
		.catch((err) => message.channel.send('Sorry I could not find this city'));
};
