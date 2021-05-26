const Discord = require('discord.js');
require('dotenv').config();

const commands = require('./handlers/command_handler');
const runner = require('./server.js');

const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', message => {
	if (message.author.bot || !message.content.startsWith(process.env.PREFIX))
		return;

	const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		commands.get('ping').execute(message);
	}

	if (command === 'play') {
		commands.get('play').execute(message, args);
	}

	if (command === 'stop') {
		commands.get('stop').execute();
	}

	if (command === 'skip') {
		commands.get('skip').execute(message);
	}

	if (command === 'leave') {
		commands.get('leave').execute(message);
	}

	if (command === 'weather') {
		commands.get('weather').execute(message, args);
	}

	if (command === 'cases') {
		commands.get('cases').execute(message, args);
	}
});

runner();

client.login(process.env.TOKEN);
