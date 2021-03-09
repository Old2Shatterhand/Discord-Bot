const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const fetch = require('node-fetch');
//const Database = require('@replit/database');
require('dotenv').config();

//const db = new Database();
const client = new Discord.Client();

const check = (res) => {
	if (res.ok) {
		return res;
	} else {
		throw new Error(`Error Message: ${res.statusText}`);
	}
};

const getCases = (country) => {
	return fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${country}`)
		.then(check)
		.then((res) => res.json())
		.then((body) => body.All)
		.catch((err) => console.error(err));
};

const getWeather = (city) => {
	return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API}`)
		.then(check)
		.then((res) => res.json())
		.then((body) => body)
		.catch((err) => console.error(err));
};

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (message) => {
	if (message.author.bot) return;

	if (message.content === '_ping') {
		message.reply('I am here');
	}

	if (message.content.split(' ')[0] === '_play') {
		if (message.member.voice.channel) {
			message.member.voice.channel
				.join()
				.then((connection) => connection.play(ytdl(message.content.split(' ')[1], { quality: 'highest' })));
		}
	}

	if (message.content === '_pause') {
		if (message.member.voice.channel) {
			message.member.voice.channel.leave();
		}
	}

	if (message.content.split(' ')[0] === '_weather') {
		getWeather(message.content.split(' ')[1])
			.then((data) =>
				message.channel.send(`
        \tLon: ${data.coord.lon} 
        \tLat: ${data.coord.lat}
        \tDescription: ${data.weather[0].description}
        \tTemperature: ${Math.round(data.main.temp - 273.15)} °C
        \tHumidity: ${data.main.humidity} %
        \tPressure: ${data.main.pressure} hPa
        \tWind: ${data.wind.speed} Bf`)
			)
			.catch((err) => message.channel.send('Sorry I could not find this city'));
	}

	if (message.content.split(' ')[0] === '_cases') {
		getCases(message.content.split(' ')[1])
			.then((data) =>
				message.channel.send(`
        \tTotal cases: ${data.confirmed}
        \tTotal deaths: ${data.deaths}`)
			)
			.catch((err) => message.channel.send('Sorry I could not find this country'));
	}
});

client.login(process.env.TOKEN);
