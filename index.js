const Discord = require('discord.js');

//const Database = require('@replit/database');
require('dotenv').config();

const play = require('./commands/_play');
const pause = require('./commands/_pause');
const weather = require('./commands/_weather');
const cases = require('./commands/_cases');
const ping = require('./commands/_ping');

//const db = new Database();
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('guildMemberAdd', (member) => {
    const channel = member.guild.channels.cache.get('816279152809213983');
});

client.on('message', (message) => {
    if (message.author.bot) return;

    if (message.content === '_ping') {
        ping(message);
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
