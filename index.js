const Discord = require('discord.js');

const runner = require('./server.js');

require('dotenv').config();

const client = new Discord.Client();

const commands = require('./handlers/command_handler');
const prefix = '_';

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

// client.on('guildMemberAdd', (member) => {
//     const channel = member.guild.channels.cache.get('816279152809213983');

//     member.guild.channels.find(channel.id).send('Welcome');
// });

client.on('message', message => {
	if (message.author.bot || !message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		commands.get('ping').execute(message);
	}

	if (command === 'play') {
		commands.get('play').execute(message, args);
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
