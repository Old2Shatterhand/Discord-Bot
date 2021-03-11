const Discord = require('discord.js');

//const Database = require('@replit/database');
require('dotenv').config();

const greet = require('./commands/_ping');
const play = require('./commands/_play');
const pause = require('./commands/_pause');
const weather = require('./commands/_weather');
const cases = require('./commands/_cases');
const _ping = require('./commands/_ping');

//const db = new Database();
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (message) => {
	if (message.author.bot) return;

	if (message.content === '_ping') {
		_ping(message);
	}

	if (message.content.split(' ')[0] === '_play') {
		play(message);
	}

	if (message.content === '_pause') {
		pause(message);
	}

	if (message.content.split(' ')[0] === '_weather') {
		weather(message);
	}

	if (message.content.split(' ')[0] === '_cases') {
		cases(message);
	}
});

client.login(process.env.TOKEN);
